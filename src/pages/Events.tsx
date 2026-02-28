import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar, { useSearch } from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { events, type HankenEvent } from "@/data/events";
import { format, parseISO } from "date-fns";
import { useLanguage } from "@/hooks/useLanguage";

const categoryLabel: Record<HankenEvent["category"], string> = {
  school: "Hanken",
  shs: "SHS",
  club: "Club",
};

const Events = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<HankenEvent["category"] | "all">("all");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const byCategory = filter === "all" ? events : events.filter((e) => e.category === filter);
  const filtered = useSearch(byCategory, query, ["title", "organizer", "location"]);
  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="page-container pb-36">
      <button onClick={() => navigate("/main")} className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {t.home}
      </button>
      <TopBar title={t.events} />

      <div className="mb-4 flex gap-2">
        {(["all", "school", "shs", "club"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {cat === "all" ? t.all : categoryLabel[cat]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent mb-1">
                  {categoryLabel[event.category]}
                </span>
                <h3 className="text-sm font-semibold">{event.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{event.description}</p>
              </div>
              <div className="ml-3 flex flex-col items-end text-right">
                <span className="text-lg font-bold text-primary">{format(parseISO(event.date), "dd")}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{format(parseISO(event.date), "MMM")}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.time}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
            </div>
          </motion.div>
        ))}
        {sorted.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">{t.no_events}</p>
        )}
      </div>

      <div className="fixed bottom-14 left-0 right-0 z-10 bg-background/90 backdrop-blur-lg px-4 py-2 border-t border-border/50" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="mx-auto max-w-[480px]">
          <SearchBar placeholder={t.search_events} value={query} onChange={setQuery} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Events;
