import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { songs } from "@/data/songs";
import BottomNav from "@/components/BottomNav";

const SongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const song = songs.find((s) => s.id === Number(id));

  if (!song) return <div className="page-container"><p>Song not found.</p></div>;

  return (
    <div className="page-container">
      <button onClick={() => navigate("/songbook")} className="mb-4 flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Songbook
      </button>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 text-xs font-semibold text-accent">Song #{song.number}</div>
        <h1 className="text-2xl font-bold tracking-tight">{song.title}</h1>
        <pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/80">
          {song.lyrics}
        </pre>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default SongDetail;
