const BASE_URL = "https://api.openweathermap.org";

/**
 * Returns the OpenWeather API key from environment variables.
 * @throws {Error} If the API key is not configured.
 */
function getApiKey(): string {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new Error(
            "OpenWeather API key is not set. Please set VITE_OPENWEATHER_API_KEY in your .env file.",
        );
    }
    return apiKey;
}

/**
 * Performs a GET request to the OpenWeather API with automatic API key injection.
 * @param path - API endpoint path (e.g. `/data/2.5/weather`).
 * @param params - Query parameters to include in the request.
 * @returns Parsed JSON response body.
 * @throws {Error} On non-OK HTTP responses or network failures.
 */
export async function apiGet<T>(
    path: string,
    params: Record<string, string | number> = {},
): Promise<T> {
    const url = new URL(path, BASE_URL);
    url.searchParams.set("appid", getApiKey());

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, String(value));
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}
