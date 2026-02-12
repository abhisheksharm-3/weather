import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { WeatherDashboard } from "@/components/weather/WeatherDashboard";
import { ApiKeyMissing } from "@/components/weather/ApiKeyMissing";
import { useWeatherStore } from "@/store/weatherStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { location, requestCurrentLocation } = useWeatherStore();

  useEffect(() => {
    if (!location) {
      requestCurrentLocation();
    }
  }, []);

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
