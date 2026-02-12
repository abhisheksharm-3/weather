import type { ReactNode } from "react";
import type {
    UnitsType,
    CurrentWeatherResponseType,
    ForecastResponseType,
    AirPollutionResponseType,
    AirQualityComponentsType,
} from "./weather-types";

export interface LayoutPropsType {
    children: ReactNode;
}

export interface SearchBarPropsType {
    onLocationSelect: (lat: number, lon: number, name: string) => void;
    onUseCurrentLocation: () => void;
    isLoadingLocation?: boolean;
}

export interface UnitTogglePropsType {
    units: UnitsType;
    onToggle: (units: UnitsType) => void;
}

export interface CurrentWeatherPropsType {
    data: CurrentWeatherResponseType;
    units: UnitsType;
    locationName?: string;
}

export interface ForecastPropsType {
    data: ForecastResponseType;
    units: UnitsType;
}

export interface DailySummaryType {
    minTemp: number;
    maxTemp: number;
    icon: string;
    condition: string;
    pop: number;
}

export interface AirPollutionPropsType {
    data: AirPollutionResponseType;
}

export interface PollutantInfoType {
    name: string;
    key: keyof AirQualityComponentsType;
    unit: string;
    description: string;
    thresholds: { good: number; moderate: number; unhealthy: number };
}

export interface PollutantLevelType {
    level: string;
    color: string;
    barColor: string;
}

export interface DetailItemPropsType {
    icon?: ReactNode;
    label: string;
    value: string;
    subValue?: string;
}

export interface WelcomeScreenPropsType {
    onUseCurrentLocation: () => void;
    locationError: string | null;
}

export interface ErrorScreenPropsType {
    message: string;
    onRetry: () => void;
}
