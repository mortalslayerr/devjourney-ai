import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-secondary hover:bg-accent transition-all duration-300"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun size={14} className="text-foreground" />
      ) : (
        <Moon size={14} className="text-foreground" />
      )}
    </button>
  );
};
