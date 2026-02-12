import { useQuery } from "@tanstack/react-query";
import { geocodeCity, getAllWeatherData } from "@/api/weather";
import type { GeocodingResult, WeatherData } from "@/types/weather";

// Hook for geocoding city names
export function useGeocode(city: string, enabled: boolean = true) {
  return useQuery<GeocodingResult[], Error>({
    queryKey: ["geocode", city],
    queryFn: () => geocodeCity(city),
    enabled: enabled && city.length > 2,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Hook for fetching all weather data
export function useWeather(
  lat: number | null,
  lon: number | null,
  units: "metric" | "imperial" = "metric",
) {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", lat, lon, units],
    queryFn: () => getAllWeatherData(lat!, lon!, units),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
