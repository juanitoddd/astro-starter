import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      setIsDark(root.classList.contains("dark"));
    };

    sync();
    setMounted(true);

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const handleChange = useCallback(() => {
    if (typeof window !== "undefined" && window.toggleTheme) {
      window.toggleTheme();
    }
  }, []);

  // Prevent layout shift / hydration mismatch before mount
  if (!mounted) {
    return (
      <div className="flex items-center gap-2" aria-hidden="true">
        <Sun className="h-4 w-4 text-muted-foreground opacity-50" />
        <Switch isSelected={false} />
        <Moon className="h-4 w-4 text-muted-foreground opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Theme">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        isSelected={isDark}
        onChange={handleChange}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
