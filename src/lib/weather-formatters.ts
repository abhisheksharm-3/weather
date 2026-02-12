import type { UnitsType, IconSizeType } from "@/types/weather-types";

const ICON_SIZE_SUFFIX: Record<IconSizeType, string> = {
    "1x": "",
    "2x": "@2x",
    "4x": "@4x",
};

/** Returns the OpenWeather icon URL for the given icon code and size. */
export function getWeatherIconUrl(iconCode: string, size: IconSizeType = "2x"): string {
    return `https://openweathermap.org/img/wn/${iconCode}${ICON_SIZE_SUFFIX[size]}.png`;
}

/**
 * Formats a unix timestamp to a localized time string, adjusted by timezone offset.
 * @param timestamp - Unix timestamp in seconds.
 * @param timezoneOffset - Timezone offset in seconds from UTC.
 * @param options - Optional `Intl.DateTimeFormatOptions` overrides.
 */
export function formatTime(
    timestamp: number,
    timezoneOffset: number,
    options?: Intl.DateTimeFormatOptions,
): string {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        ...options,
    });
}

/**
 * Formats a unix timestamp to a localized date string.
 * @param timestamp - Unix timestamp in seconds.
 * @param options - Optional `Intl.DateTimeFormatOptions` overrides.
 */
export function formatDate(
    timestamp: number,
    options?: Intl.DateTimeFormatOptions,
): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        ...options,
    });
}

/** Formats visibility distance from meters to km (metric) or miles (imperial). */
export function formatVisibility(meters: number, units: UnitsType): string {
    if (units === "metric") {
        return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${(meters / 1609.34).toFixed(1)} mi`;
}
