import { MapPin } from "lucide-react";
import { useWeatherStore } from "@/store/weatherStore";
import { Button } from "@/components/ui/button";

export function WelcomeScreen() {
  const { locationError, requestCurrentLocation, isLoadingLocation } =
    useWeatherStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight">Weather</h1>
          <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
            Real-time weather data, forecasts, and air quality information for
            any location worldwide.
          </p>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            onClick={requestCurrentLocation}
            disabled={isLoadingLocation}
            className="gap-2"
          >
            <MapPin className="h-4 w-4" />
            Use Current Location
          </Button>
        </div>

        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Or search for a city using the search bar above
        </p>

        {locationError && (
          <div className="mt-6 p-4 border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {locationError}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
