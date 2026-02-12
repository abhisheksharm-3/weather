import { apiGet } from "./api-client";
import type {
    CurrentWeatherResponseType,
    ForecastResponseType,
    AirPollutionResponseType,
    GeocodingResultType,
    WeatherDataType,
    UnitsType,
} from "@/types/weather-types";

/** Geocodes a city name to coordinates via the OpenWeather Geocoding API. */
export async function geocodeCity(city: string): Promise<GeocodingResultType[]> {
    return apiGet<GeocodingResultType[]>("/geo/1.0/direct", {
        q: city.trim(),
        limit: 5,
    });
}

/** Fetches current weather for the given coordinates. */
export async function getCurrentWeather(
    lat: number,
    lon: number,
    units: UnitsType = "metric",
): Promise<CurrentWeatherResponseType> {
    return apiGet<CurrentWeatherResponseType>("/data/2.5/weather", { lat, lon, units });
}

/** Fetches a 5-day / 3-hour forecast for the given coordinates. */
export async function getForecast(
    lat: number,
    lon: number,
    units: UnitsType = "metric",
): Promise<ForecastResponseType> {
    return apiGet<ForecastResponseType>("/data/2.5/forecast", { lat, lon, units });
}

/** Fetches air pollution data for the given coordinates. */
export async function getAirPollution(
    lat: number,
    lon: number,
): Promise<AirPollutionResponseType> {
    return apiGet<AirPollutionResponseType>("/data/2.5/air_pollution", { lat, lon });
}

/** Fetches current weather, forecast, and air pollution data in parallel. */
export async function getAllWeatherData(
    lat: number,
    lon: number,
    units: UnitsType = "metric",
): Promise<WeatherDataType> {
    const [current, forecast, airPollution] = await Promise.all([
        getCurrentWeather(lat, lon, units),
        getForecast(lat, lon, units),
        getAirPollution(lat, lon),
    ]);

    return { current, forecast, airPollution };
}
