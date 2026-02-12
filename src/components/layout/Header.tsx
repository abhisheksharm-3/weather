import { CloudSun } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { UnitToggle } from "@/components/controls/UnitToggle";
import { useWeatherStore } from "@/store/weatherStore";

export function Header() {
  const {
    setLocation,
    requestCurrentLocation,
    isLoadingLocation,
    units,
    setUnits,
  } = useWeatherStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-sm safe-top">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <CloudSun className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-sm font-medium tracking-wide hidden sm:inline">
            WEATHER
          </span>
        </div>

        <div className="flex-1 max-w-md">
          <SearchBar
            onLocationSelect={setLocation}
            onUseCurrentLocation={requestCurrentLocation}
            isLoadingLocation={isLoadingLocation}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <UnitToggle units={units} onToggle={setUnits} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
