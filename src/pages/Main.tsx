import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Play, Calendar, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import NewsCarousel from "@/components/NewsCarousel";
import TopBar from "@/components/TopBar";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();

  const categories = [
    { path: "/songbook", icon: BookOpen, label: t.songbook, color: "bg-secondary" },
    { path: "/classics", icon: Play, label: t.classics, color: "bg-secondary" },
    { path: "/events", icon: Calendar, label: t.events, color: "bg-secondary" },
    { path: "/connect", icon: Users, label: t.connect, color: "bg-secondary" },
  ];

  return (
    <div className="page-container">
      <TopBar title={t.hanken_hub} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t.main_description}
        </p>
      </motion.div>

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

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <NewsCarousel />
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Main;
