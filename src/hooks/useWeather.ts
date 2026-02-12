import { useQuery } from "@tanstack/react-query";
import { geocodeCity, getAllWeatherData } from "@/api/weather-api";
import type { GeocodingResultType, WeatherDataType, UnitsType } from "@/types/weather-types";

/** Geocodes a city name with debounced React Query caching. Only fires when `city` has 3+ characters. */
export function useGeocode(city: string, isEnabled = true) {
  return useQuery<GeocodingResultType[], Error>({
    queryKey: ["geocode", city],
    queryFn: () => geocodeCity(city),
    enabled: isEnabled && city.length > 2,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

/** Fetches all weather data for the given coordinates. Disabled when lat/lon are null. */
export function useWeather(
  lat: number | null,
  lon: number | null,
  units: UnitsType = "metric",
) {
  return useQuery<WeatherDataType, Error>({
    queryKey: ["weather", lat, lon, units],
    queryFn: () => getAllWeatherData(lat!, lon!, units),
    enabled: lat !== null && lon !== null,
  });
}
