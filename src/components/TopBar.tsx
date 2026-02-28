import { useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, Globe } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

const TopBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLang(lang === "en" ? "sv" : "en")}
          className="flex h-9 items-center gap-1 rounded-xl bg-secondary px-2.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
          aria-label="Toggle language"
        >
          <Globe className="h-3.5 w-3.5" />
          {lang === "en" ? "SV" : "EN"}
        </button>
        <button
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
