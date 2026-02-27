import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("hanken-theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("hanken-theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  return { theme, toggle };
}
