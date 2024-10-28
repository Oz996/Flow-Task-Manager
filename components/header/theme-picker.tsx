"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const iconSize = 20;

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  }

  return (
    <div className="flex items-center gap-3 py-5">
      <Label htmlFor="theme" className="sr-only">
        Airplane Mode
      </Label>

      <Sun size={iconSize} />
      <Switch
        id="theme"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Theme toggle switch"
      />
      <Moon size={iconSize} />
    </div>
  );
}
