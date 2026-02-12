import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UnitsType = "metric" | "imperial";

export type ThemeType = "light" | "dark";

interface LocationType {
  lat: number;
  lon: number;
  name: string;
}

interface WeatherStateType {
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

function getInitialTheme(): ThemeType {
  const stored = localStorage.getItem("theme") as ThemeType | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeType): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

export const useWeatherStore = create<WeatherStateType>()(
  persist(
    (set, get) => ({
      location: null,
      isLoadingLocation: false,
      locationError: null,
      units: "metric",
      theme: getInitialTheme(),

      setLocation: (lat, lon, name) => {
        set({ location: { lat, lon, name }, locationError: null });
      },

      clearLocation: () => {
        set({ location: null });
      },

      setIsLoadingLocation: (isLoading) => {
        set({ isLoadingLocation: isLoading });
      },

      setLocationError: (error) => {
        set({ locationError: error });
      },

      setUnits: (units) => {
        set({ units });
      },

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next });
      },

      requestCurrentLocation: () => {
        const { setLocation, setIsLoadingLocation, setLocationError } = get();

        if (!navigator.geolocation) {
          setLocationError("Geolocation is not supported by your browser");
          return;
        }

        setIsLoadingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(
              position.coords.latitude,
              position.coords.longitude,
              "Current Location",
            );
            setIsLoadingLocation(false);
          },
          (err) => {
            setIsLoadingLocation(false);
            if (err.code === err.PERMISSION_DENIED) {
              setLocationError("Location access denied. Enable it in browser settings.");
            } else if (err.code === err.POSITION_UNAVAILABLE) {
              setLocationError("Location unavailable. Search for a city instead.");
            } else {
              setLocationError("Unable to get location. Search for a city.");
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      },
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        units: state.units,
      }),
    },
  ),
);
