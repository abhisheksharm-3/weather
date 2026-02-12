import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { WeatherDashboard } from "@/components/weather/WeatherDashboard";
import { ApiKeyMissing } from "@/components/weather/ApiKeyMissing";
import { useWeatherStore } from "@/store/weatherStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppContent() {
  const { requestCurrentLocation, location } = useWeatherStore();
  const hasRequestedLocation = useRef<boolean | null>(null);

  // Request geolocation on mount
  if (hasRequestedLocation.current === null && !location) {
    hasRequestedLocation.current = true;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (apiKey && typeof navigator !== "undefined" && navigator.geolocation) {
      useWeatherStore.getState().setIsLoadingLocation(true);
      requestCurrentLocation();
    }
  }

  // Check for API key
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!apiKey) {
    return <ApiKeyMissing />;
  }

  return (
    <Layout>
      <WeatherDashboard />
    </Layout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
