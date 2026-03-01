const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const NEWS_URL = 'https://www.hanken.fi/en/search/news?keywords=';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Step 1: Scraping Hanken news listing page...');

    // Use Firecrawl for the listing page (needs JS rendering)
    const listingResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: NEWS_URL,
        formats: ['links'],
        waitFor: 3000,
      }),
    });

    const listingData = await listingResponse.json();
    if (!listingResponse.ok) {
      throw new Error(`Failed to scrape listing: ${JSON.stringify(listingData)}`);
    }

    const links: string[] = listingData.data?.links || listingData.links || [];

    // Filter to English news article links only
    const newsLinks = links.filter(link =>
      link.includes('/en/news/') &&
      !link.includes('search/news') &&
      !link.includes('#')
    );

    // Deduplicate and take first 6
    const uniqueLinks: string[] = [];
    const seen = new Set<string>();
    for (const link of newsLinks) {
      if (!seen.has(link)) {
        seen.add(link);
        uniqueLinks.push(link);
      }
      if (uniqueLinks.length >= 6) break;
    }

    console.log(`Found ${uniqueLinks.length} news links`);

    if (uniqueLinks.length === 0) {
      throw new Error('No news article links found');
    }

    // Step 2: Fetch each article page for title, image, and category
    const enrichedArticles = [];

    for (let i = 0; i < uniqueLinks.length; i++) {
      const url = uniqueLinks[i];
      console.log(`Fetching article ${i + 1}: ${url}`);

      try {
        const response = await fetch(url, {
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HankeitBot/1.0)' },
        });
        const html = await response.text();

        // Extract title from og:title
        let title = '';
        const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
        if (ogTitleMatch) {
          title = ogTitleMatch[1];
        } else {
          const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
          title = titleMatch ? titleMatch[1].replace(/\s*\|.*$/, '').trim() : url.split('/').pop()!.replace(/-/g, ' ');
        }

        // Extract image: og:image:url (Hanken uses this instead of og:image)
        let imageUrl = '';
        const ogImageUrlMatch = html.match(/<meta\s+property="og:image:url"\s+content="([^"]+)"/i)
          || html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
        if (ogImageUrlMatch) {
          imageUrl = ogImageUrlMatch[1];
        } else {
          // Fallback: rel="image_src"
          const imageSrcMatch = html.match(/<link\s+rel="image_src"\s+href="([^"]+)"/i);
          if (imageSrcMatch) {
            imageUrl = imageSrcMatch[1];
          } else {
            // Fallback: first hero_image style image
            const heroImgMatch = html.match(/src="(\/sites\/default\/files\/styles\/hero_image[^"]+)"/i);
            if (heroImgMatch) {
              imageUrl = 'https://www.hanken.fi' + heroImgMatch[1];
            }
          }
        }

        // Extract category from news type field
        let category = 'News';
        const catMatch = html.match(/field--name-field-news-type[\s\S]*?<a[^>]*>([^<]+)<\/a>/i);
        if (catMatch) {
          category = catMatch[1].trim();
        }

        // Decode HTML entities in the image URL
        if (imageUrl) {
          imageUrl = imageUrl.replace(/&amp;/g, '&');
        }

        console.log(`  ✓ "${title}" | img: ${imageUrl ? 'yes' : 'no'} | ${category}`);

        enrichedArticles.push({
          title,
          article_url: url,
          image_url: imageUrl || null,
          category,
          position: i,
        });
      } catch (err) {
        console.error(`  ✗ Error: ${err}`);
        enrichedArticles.push({
          title: url.split('/').pop()!.replace(/-/g, ' '),
          article_url: url,
          image_url: null,
          category: 'News',
          position: i,
        });
      }
    }

    // Step 3: Update the database
    console.log('Updating database...');

    await supabase.from('news_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const { error: insertError } = await supabase.from('news_articles').insert(enrichedArticles);
    if (insertError) throw new Error(`Insert failed: ${insertError.message}`);

    console.log(`Done! Updated ${enrichedArticles.length} articles`);

    return new Response(
      JSON.stringify({ success: true, count: enrichedArticles.length, articles: enrichedArticles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
