import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";

const PAUSE_DURATION = 4000;

interface NewsArticle {
  id: string;
  title: string;
  image_url: string | null;
  article_url: string;
  category: string | null;
  position: number;
}

// Fallback data when DB is empty
const fallbackNews: NewsArticle[] = [
  { id: "1", title: "Career Fair 2026 – Register Now!", image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop", article_url: "https://www.hanken.fi/en/search/news?keywords=", category: "Event", position: 0 },
  { id: "2", title: "New Professor of Digital Economics Joins Hanken", image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=340&fit=crop", article_url: "https://www.hanken.fi/en/search/news?keywords=", category: "Campus", position: 1 },
  { id: "3", title: "Internship Opportunities at Goldman Sachs", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop", article_url: "https://www.hanken.fi/en/search/news?keywords=", category: "Jobs", position: 2 },
];

const NewsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackNews);
  const { t } = useLanguage();

  // Fetch from database
  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('position', { ascending: true })
        .limit(6);

      if (!error && data && data.length > 0) {
        setArticles(data as NewsArticle[]);
      }
    };
    fetchNews();
  }, []);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused || articles.length === 0) return;
    const timer = setTimeout(() => {
      const next = (current + 1) % articles.length;
      goTo(next, 1);
    }, PAUSE_DURATION);
    return () => clearTimeout(timer);
  }, [current, isPaused, goTo, articles.length]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        goTo((current + 1) % articles.length, 1);
      } else {
        goTo((current - 1 + articles.length) % articles.length, -1);
      }
    }
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (articles.length === 0) return null;

  const item = articles[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const handleClick = () => {
    if (item.article_url) {
      window.open(item.article_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="section-title">{t.whats_new}</h2>
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={item.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Hanken News</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {item.category && (
                <span className="inline-block rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground mb-1.5">
                  {item.category}
                </span>
              )}
              <p className="text-sm font-semibold text-primary-foreground leading-tight">
                {item.title}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="absolute bottom-2 right-3 flex gap-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i, i > current ? 1 : -1);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-4 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
