"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) return null; // 👈 tránh hydration mismatch

  return (
    <button
      onClick={toggle}
      className="
        px-3 py-1 h-[30px] rounded-md text-sm my-auto
        bg-gray-200 dark:bg-zinc-700
        text-black dark:text-white
      "
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
