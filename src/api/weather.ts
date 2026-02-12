import axios from "axios";
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  AirPollutionResponse,
  GeocodingResult,
  WeatherData,
} from "@/types/weather";

const BASE_URL = "https://api.openweathermap.org";

// Get API key from environment variable
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OpenWeather API key is not set. Please set VITE_OPENWEATHER_API_KEY in your .env file."
    );
  }
  return apiKey;
};

// Geocoding API - Convert city name to coordinates
export async function geocodeCity(city: string): Promise<GeocodingResult[]> {
  const response = await axios.get<GeocodingResult[]>(
    `${BASE_URL}/geo/1.0/direct`,
    {
      params: {
        q: city,
        limit: 5,
        appid: getApiKey(),
      },
    }
  );
  return response.data;
}

// Current Weather API
export async function getCurrentWeather(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<CurrentWeatherResponse> {
  const response = await axios.get<CurrentWeatherResponse>(
    `${BASE_URL}/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        units,
        appid: getApiKey(),
      },
    }
  );
  return response.data;
}

// 5 Day / 3 Hour Forecast API
export async function getForecast(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<ForecastResponse> {
  const response = await axios.get<ForecastResponse>(
    `${BASE_URL}/data/2.5/forecast`,
    {
      params: {
        lat,
        lon,
        units,
        appid: getApiKey(),
      },
    }
  );
  return response.data;
}

// Air Pollution API
export async function getAirPollution(
  lat: number,
  lon: number
): Promise<AirPollutionResponse> {
  const response = await axios.get<AirPollutionResponse>(
    `${BASE_URL}/data/2.5/air_pollution`,
    {
      params: {
        lat,
        lon,
        appid: getApiKey(),
      },
    }
  );
  return response.data;
}

// Fetch all weather data for a location
export async function getAllWeatherData(
  lat: number,
  lon: number,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherData> {
  const [current, forecast, airPollution] = await Promise.all([
    getCurrentWeather(lat, lon, units),
    getForecast(lat, lon, units),
    getAirPollution(lat, lon),
  ]);

  return {
    current,
    forecast,
    airPollution,
  };
}

// Get weather icon URL
export function getWeatherIconUrl(iconCode: string, size: "1x" | "2x" | "4x" = "2x"): string {
  const sizeMap = {
    "1x": "",
    "2x": "@2x",
    "4x": "@4x",
  };
  return `https://openweathermap.org/img/wn/${iconCode}${sizeMap[size]}.png`;
}

// Format unix timestamp to readable time
export function formatTime(
  timestamp: number,
  timezoneOffset: number,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  });
}

// Format unix timestamp to readable date
export function formatDate(
  timestamp: number,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...options,
  });
}

// Get wind direction from degrees
export function getWindDirection(deg: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

// Get AQI label
export function getAQILabel(aqi: number): { label: string; color: string } {
  const labels: Record<number, { label: string; color: string }> = {
    1: { label: "Good", color: "text-green-500" },
    2: { label: "Fair", color: "text-yellow-500" },
    3: { label: "Moderate", color: "text-orange-500" },
    4: { label: "Poor", color: "text-red-500" },
    5: { label: "Very Poor", color: "text-purple-500" },
  };
  return labels[aqi] || { label: "Unknown", color: "text-gray-500" };
}

// Convert visibility from meters to km or miles
export function formatVisibility(meters: number, units: "metric" | "imperial"): string {
  if (units === "metric") {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${(meters / 1609.34).toFixed(1)} mi`;
}

// Get temperature unit symbol
export function getTempUnit(units: "metric" | "imperial"): string {
  return units === "metric" ? "°C" : "°F";
}

// Get speed unit
export function getSpeedUnit(units: "metric" | "imperial"): string {
  return units === "metric" ? "m/s" : "mph";
}
