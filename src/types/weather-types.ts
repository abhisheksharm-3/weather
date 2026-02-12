export type UnitsType = "metric" | "imperial";

export interface WeatherConditionType {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherDataType {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface WindType {
    speed: number;
    deg: number;
    gust?: number;
}

export interface CloudsType {
    all: number;
}

export interface RainType {
    "1h"?: number;
    "3h"?: number;
}

export interface SnowType {
    "1h"?: number;
    "3h"?: number;
}

export interface SysType {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface CoordType {
    lon: number;
    lat: number;
}

export interface CurrentWeatherResponseType {
    coord: CoordType;
    weather: WeatherConditionType[];
    base: string;
    main: MainWeatherDataType;
    visibility: number;
    wind: WindType;
    clouds: CloudsType;
    rain?: RainType;
    snow?: SnowType;
    dt: number;
    sys: SysType;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItemType {
    dt: number;
    main: MainWeatherDataType;
    weather: WeatherConditionType[];
    clouds: CloudsType;
    wind: WindType;
    visibility: number;
    pop: number;
    rain?: RainType;
    snow?: SnowType;
    sys: {
        pod: string;
    };
    dt_txt: string;
}

export interface CityType {
    id: number;
    name: string;
    coord: CoordType;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface ForecastResponseType {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItemType[];
    city: CityType;
}

export interface AirQualityComponentsType {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
}

export interface AirPollutionItemType {
    main: {
        aqi: number;
    };
    components: AirQualityComponentsType;
    dt: number;
}

export interface AirPollutionResponseType {
    coord: CoordType;
    list: AirPollutionItemType[];
}

export interface GeocodingResultType {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface WeatherDataType {
    current: CurrentWeatherResponseType;
    forecast: ForecastResponseType;
    airPollution: AirPollutionResponseType;
}
