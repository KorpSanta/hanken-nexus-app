import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Music } from "lucide-react";
import SearchBar, { useSearch } from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";
import { songs } from "@/data/songs";

const Songbook = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filtered = useSearch(songs, query, ["title", "number"]);

  return (
    <div className="page-container pb-36">
      <button onClick={() => navigate("/main")} className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Home
      </button>
      <TopBar title="Songbook" />

      <div className="space-y-1">
        {filtered.map((song, i) => (
          <motion.button
            key={song.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.3) }}
            onClick={() => navigate(`/songbook/${song.id}`)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-secondary"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
              {song.number}
            </div>
            <span className="text-sm font-medium">{song.title}</span>
            <Music className="ml-auto h-4 w-4 text-muted-foreground/40" />
          </motion.button>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">No songs found</p>
        )}
      </div>

      {/* Search bar at bottom */}
      <div className="fixed bottom-14 left-0 right-0 z-10 bg-background/90 backdrop-blur-lg px-4 py-2 border-t border-border/50" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="mx-auto max-w-[480px]">
          <SearchBar placeholder="Search by title or number…" value={query} onChange={setQuery} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Songbook;
