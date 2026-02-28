import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, Play, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { path: "/main", icon: Home, label: t.nav_home },
    { path: "/songbook", icon: BookOpen, label: t.nav_songs },
    { path: "/classics", icon: Play, label: t.nav_classics },
    { path: "/events", icon: Calendar, label: t.nav_events },
    { path: "/connect", icon: Users, label: t.nav_connect },
  ];

  return (
    <nav className="bottom-nav">
      <div className="mx-auto flex max-w-[480px] items-center justify-around px-2 py-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
