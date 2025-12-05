import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    let applied = theme;

    if (theme === "system") {
      applied = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(applied);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
