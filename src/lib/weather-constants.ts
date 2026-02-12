import type { UnitsType } from "@/types/weather-types";

type AqiInfoType = { label: string; color: string };

const WIND_DIRECTIONS = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
] as const;

const AQI_LABELS: Record<number, AqiInfoType> = {
    1: { label: "Good", color: "text-green-500" },
    2: { label: "Fair", color: "text-yellow-500" },
    3: { label: "Moderate", color: "text-orange-500" },
    4: { label: "Poor", color: "text-red-500" },
    5: { label: "Very Poor", color: "text-purple-500" },
};

/** Returns a compass direction string for the given wind degree. */
export function getWindDirection(deg: number): string {
    const index = Math.round(deg / 22.5) % 16;
    return WIND_DIRECTIONS[index];
}

/** Returns the AQI label and Tailwind color class for the given AQI value (1–5). */
export function getAQILabel(aqi: number): AqiInfoType {
    return AQI_LABELS[aqi] ?? { label: "Unknown", color: "text-gray-500" };
}

/** Returns the temperature unit symbol for the given unit system. */
export function getTempUnit(units: UnitsType): string {
    return units === "metric" ? "°C" : "°F";
}

/** Returns the wind speed unit string for the given unit system. */
export function getSpeedUnit(units: UnitsType): string {
    return units === "metric" ? "m/s" : "mph";
}
