export interface NewsItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const news: NewsItem[] = [
  { id: "1", title: "Career Fair 2026 – Register Now!", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop", category: "Event" },
  { id: "2", title: "New Professor of Digital Economics Joins Hanken", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=340&fit=crop", category: "Campus" },
  { id: "3", title: "Internship Opportunities at Goldman Sachs", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop", category: "Jobs" },
  { id: "4", title: "Spring Semester Welcome Week Schedule", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=340&fit=crop", category: "Campus" },
  { id: "5", title: "Workshop: AI Tools for Business Students", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=340&fit=crop", category: "Workshop" },
  { id: "6", title: "Exchange Applications Open for Autumn 2026", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=340&fit=crop", category: "Academic" },
];
