import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Play, Calendar, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import NewsCarousel from "@/components/NewsCarousel";

const categories = [
  { path: "/songbook", icon: BookOpen, label: "Songbook", color: "bg-secondary" },
  { path: "/classics", icon: Play, label: "Classics", color: "bg-secondary" },
  { path: "/events", icon: Calendar, label: "Events", color: "bg-secondary" },
  { path: "/connect", icon: Users, label: "Connect", color: "bg-secondary" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Hanken Hub</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your all-in-one hub for students, alumni, and faculty of Hanken — songs, events, videos, and a community that stays connected.
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 mb-8">
        {categories.map(({ path, icon: Icon, label, color }) => (
          <motion.button
            key={path}
            variants={item}
            onClick={() => navigate(path)}
            className="category-card"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* News */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <NewsCarousel />
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Main;
