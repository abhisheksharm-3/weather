import { useWeatherStore } from "@/store/weatherStore";
import { useWeather } from "@/hooks/useWeather";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { AirPollution } from "./AirPollution";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { WelcomeScreen } from "./WelcomeScreen";
import { ErrorScreen } from "./ErrorScreen";

export function WeatherDashboard() {
  const {
    location,
    isLoadingLocation,
    locationError,
    units,
    requestCurrentLocation,
  } = useWeatherStore();

  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
    refetch,
  } = useWeather(location?.lat ?? null, location?.lon ?? null, units);

  if (isLoadingLocation || isLoadingWeather) {
    return <LoadingSkeleton />;
  }

  if (!location) {
    return (
      <WelcomeScreen
        onUseCurrentLocation={requestCurrentLocation}
        locationError={locationError}
      />
    );
  }

  if (weatherError) {
    return (
      <ErrorScreen
        message={weatherError.message}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <CurrentWeather
        data={weatherData.current}
        units={units}
        locationName={location.name}
      />
      <Forecast data={weatherData.forecast} units={units} />
      <AirPollution data={weatherData.airPollution} />
    </div>
  );
}
