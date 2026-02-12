import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Location {
  lat: number;
  lon: number;
  name: string;
}

type Units = "metric" | "imperial";

interface WeatherState {
  // Location
  location: Location | null;
  isLoadingLocation: boolean;
  locationError: string | null;

  // Units
  units: Units;

  // Actions
  setLocation: (lat: number, lon: number, name: string) => void;
  clearLocation: () => void;
  setIsLoadingLocation: (loading: boolean) => void;
  setLocationError: (error: string | null) => void;
  setUnits: (units: Units) => void;
  requestCurrentLocation: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      location: null,
      isLoadingLocation: false,
      locationError: null,
      units: "metric",

      // Actions
      setLocation: (lat, lon, name) => {
        set({
          location: { lat, lon, name },
          locationError: null,
        });
      },

      clearLocation: () => {
        set({ location: null });
      },

      setIsLoadingLocation: (loading) => {
        set({ isLoadingLocation: loading });
      },

      setLocationError: (error) => {
        set({ locationError: error });
      },

      setUnits: (units) => {
        set({ units });
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
              "Current Location"
            );
            setIsLoadingLocation(false);
          },
          (err) => {
            setIsLoadingLocation(false);
            if (err.code === err.PERMISSION_DENIED) {
              setLocationError(
                "Location access denied. Enable it in browser settings."
              );
            } else if (err.code === err.POSITION_UNAVAILABLE) {
              setLocationError(
                "Location unavailable. Search for a city instead."
              );
            } else {
              setLocationError("Unable to get location. Search for a city.");
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      },
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        units: state.units,
      }),
    }
  )
);
