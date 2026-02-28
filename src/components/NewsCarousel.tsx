import { useState, useEffect, useCallback } from "react";
import { news } from "@/data/news";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const PAUSE_DURATION = 4000; // ms to display each card

const NewsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      const next = (current + 1) % news.length;
      goTo(next, 1);
    }, PAUSE_DURATION);
    return () => clearTimeout(timer);
  }, [current, isPaused, goTo]);

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
        goTo((current + 1) % news.length, 1);
      } else {
        goTo((current - 1 + news.length) % news.length, -1);
      }
    }
    setTouchStart(null);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const item = news[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="space-y-3">
      <h2 className="section-title">{t.whats_new}</h2>
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block rounded-full bg-accent/90 px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground mb-1.5">
                {item.category}
              </span>
              <p className="text-sm font-semibold text-primary-foreground leading-tight">
                {item.title}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="absolute bottom-2 right-3 flex gap-1.5">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
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
