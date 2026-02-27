import { useRef, useEffect, useState } from "react";
import { news } from "@/data/news";
import { motion } from "framer-motion";

const NewsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isDragging || isHovered) return;

    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 2, behavior: "auto" });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isDragging, isHovered]);

  return (
    <div className="space-y-3">
      <h2 className="section-title">What's new on campus?</h2>
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setTimeout(() => setIsDragging(false), 2000)}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {news.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[280px] cursor-pointer"
          >
            <div className="glass-card-hover overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="inline-block rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground mb-1">
                    {item.category}
                  </span>
                  <p className="text-sm font-semibold text-primary-foreground leading-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;
