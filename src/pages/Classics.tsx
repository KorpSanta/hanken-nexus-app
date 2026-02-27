import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar, { useSearch } from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { classics } from "@/data/classics";

const Classics = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filtered = useSearch(classics, query, ["title"]);

  return (
    <div className="page-container pb-36">
      <button onClick={() => navigate("/main")} className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Home
      </button>
      <TopBar title="Classics" />

      <div className="space-y-3">
        {filtered.map((video, i) => (
          <motion.a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover block overflow-hidden"
          >
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/90 backdrop-blur-sm">
                  <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-primary" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-semibold">{video.title}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.a>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">No classics found</p>
        )}
      </div>

      <div className="fixed bottom-14 left-0 right-0 z-10 bg-background/90 backdrop-blur-lg px-4 py-2 border-t border-border/50" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="mx-auto max-w-[480px]">
          <SearchBar placeholder="Search classics…" value={query} onChange={setQuery} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Classics;
