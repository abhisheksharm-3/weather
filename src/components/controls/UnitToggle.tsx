import { Button } from "@/components/ui/button";
import type { UnitsType } from "@/types/weather-types";

interface UnitTogglePropsType {
    units: UnitsType;
    onToggle: (units: UnitsType) => void;
}

export function UnitToggle({ units, onToggle }: UnitTogglePropsType) {
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
