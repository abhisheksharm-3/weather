import { Button } from "@/components/ui/button";

interface UnitToggleProps {
  units: "metric" | "imperial";
  onToggle: (units: "metric" | "imperial") => void;
}

export function UnitToggle({ units, onToggle }: UnitToggleProps) {
  return (
    <div className="flex border border-[hsl(var(--border))]">
      <Button
        variant={units === "metric" ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle("metric")}
        className="px-3"
      >
        °C
      </Button>
      <Button
        variant={units === "imperial" ? "default" : "ghost"}
        size="sm"
        onClick={() => onToggle("imperial")}
        className="px-3"
      >
        °F
      </Button>
    </div>
  );
}
