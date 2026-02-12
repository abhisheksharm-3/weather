import type { UnitsType, ThemeType } from "./weather-types";

export interface LocationType {
    lat: number;
    lon: number;
    name: string;
}

export interface WeatherStateType {
    location: LocationType | null;
    isLoadingLocation: boolean;
    locationError: string | null;
    units: UnitsType;
    theme: ThemeType;
    setLocation: (lat: number, lon: number, name: string) => void;
    clearLocation: () => void;
    setIsLoadingLocation: (isLoading: boolean) => void;
    setLocationError: (error: string | null) => void;
    setUnits: (units: UnitsType) => void;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
    requestCurrentLocation: () => void;
}
