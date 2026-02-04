"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl" />;
  }

  return (
    <button
      onClick={toggle}
      className="p-2.5 rounded-xl transition-all cursor-pointer
                 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5
                 text-zinc-600 hover:text-zinc-900 hover:bg-black/5"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
