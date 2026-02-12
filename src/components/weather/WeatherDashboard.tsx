import { useWeatherStore } from "@/store/weatherStore";
import { useWeather } from "@/hooks/useWeather";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { AirPollution } from "./AirPollution";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { WelcomeScreen } from "./WelcomeScreen";
import { ErrorScreen } from "./ErrorScreen";

export function WeatherDashboard() {
  const { location, units, isLoadingLocation } = useWeatherStore();

  const {
    data: weatherData,
    isLoading,
    error,
    refetch,
  } = useWeather(location?.lat ?? null, location?.lon ?? null, units);

  // Initial loading state (requesting geolocation)
  if (isLoadingLocation && !location) {
    return <LoadingSkeleton />;
  }

  // No location selected yet
  if (!location) {
    return <WelcomeScreen />;
  }

  // Loading weather data
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  // No data
  if (!weatherData) {
    return null;
  }

  return (
    <div className="space-y-10 pb-8">
      {/* Current Weather */}
      <section>
        <CurrentWeather
          data={weatherData.current}
          units={units}
          locationName={location.name}
        />
      </section>

      {/* Forecast */}
      <section>
        <Forecast data={weatherData.forecast} units={units} />
      </section>

      {/* Air Quality */}
      <section>
        <AirPollution data={weatherData.airPollution} />
      </section>

      {/* Raw Data Toggle (Development) */}
      {import.meta.env.DEV && (
        <details className="border border-[hsl(var(--border))]">
          <summary className="px-4 py-3 cursor-pointer text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50 transition-colors">
            Raw API Data
          </summary>
          <div className="p-4 border-t border-[hsl(var(--border))] space-y-4 max-h-96 overflow-auto">
            <div>
              <h4 className="text-xs font-medium mb-2">Current Weather</h4>
              <pre className="text-[10px] bg-[hsl(var(--muted))] p-3 overflow-x-auto">
                {JSON.stringify(weatherData.current, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-xs font-medium mb-2">Forecast</h4>
              <pre className="text-[10px] bg-[hsl(var(--muted))] p-3 overflow-x-auto">
                {JSON.stringify(weatherData.forecast, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-xs font-medium mb-2">Air Pollution</h4>
              <pre className="text-[10px] bg-[hsl(var(--muted))] p-3 overflow-x-auto">
                {JSON.stringify(weatherData.airPollution, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      )}
    </div>
  );
}
