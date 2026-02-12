import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WelcomeScreenPropsType } from "@/types/component-types";

export function WelcomeScreen({
  onUseCurrentLocation,
  locationError,
}: WelcomeScreenPropsType) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="p-4 border border-[hsl(var(--border))]">
            <MapPin className="h-8 w-8 text-[hsl(var(--muted-foreground))]" strokeWidth={1} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight">Weather</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs">
            Search for a city or use your current location to get started
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={onUseCurrentLocation}
        className="gap-2"
      >
        <Navigation className="h-4 w-4" strokeWidth={1.5} />
        Use current location
      </Button>

      {locationError && (
        <p className="text-sm text-[hsl(var(--destructive))] max-w-xs">
          {locationError}
        </p>
      )}
    </div>
  );
}
