import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/store/weatherStore";

export function ThemeToggle() {
    const { theme, toggleTheme } = useWeatherStore();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    );
}
