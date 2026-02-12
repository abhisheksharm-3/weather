import type { AirPollutionResponseType, AirQualityComponentsType } from "@/types/weather-types";
import { getAQILabel } from "@/lib/weather-constants";

interface AirPollutionPropsType {
  data: AirPollutionResponseType;
}

interface PollutantInfoType {
  name: string;
  key: keyof AirQualityComponentsType;
  unit: string;
  description: string;
  thresholds: { good: number; moderate: number; unhealthy: number };
}

interface PollutantLevelType {
  level: string;
  color: string;
  barColor: string;
}

const POLLUTANTS: PollutantInfoType[] = [
  {
    name: "CO",
    key: "co",
    unit: "μg/m³",
    description: "Carbon Monoxide",
    thresholds: { good: 4400, moderate: 9400, unhealthy: 12400 },
  },
  {
    name: "NO₂",
    key: "no2",
    unit: "μg/m³",
    description: "Nitrogen Dioxide",
    thresholds: { good: 40, moderate: 70, unhealthy: 150 },
  },
  {
    name: "O₃",
    key: "o3",
    unit: "μg/m³",
    description: "Ozone",
    thresholds: { good: 60, moderate: 100, unhealthy: 140 },
  },
  {
    name: "SO₂",
    key: "so2",
    unit: "μg/m³",
    description: "Sulfur Dioxide",
    thresholds: { good: 20, moderate: 80, unhealthy: 250 },
  },
  {
    name: "PM2.5",
    key: "pm2_5",
    unit: "μg/m³",
    description: "Fine Particles",
    thresholds: { good: 10, moderate: 25, unhealthy: 50 },
  },
  {
    name: "PM10",
    key: "pm10",
    unit: "μg/m³",
    description: "Coarse Particles",
    thresholds: { good: 20, moderate: 50, unhealthy: 100 },
  },
];

const HEALTH_ADVISORIES: Record<number, string> = {
  1: "Air quality is satisfactory. Perfect for outdoor activities.",
  2: "Air quality is acceptable. Unusually sensitive individuals should consider limiting prolonged outdoor exertion.",
  3: "Sensitive groups may experience health effects. Consider reducing prolonged outdoor exertion.",
  4: "Health alert: everyone may begin to experience health effects. Avoid prolonged outdoor exertion.",
  5: "Health warning: entire population is likely to be affected. Avoid all outdoor activities.",
};

function getPollutantLevel(
  value: number,
  thresholds: PollutantInfoType["thresholds"],
): PollutantLevelType {
  if (value <= thresholds.good) {
    return { level: "Good", color: "text-green-500", barColor: "bg-green-500" };
  }
  if (value <= thresholds.moderate) {
    return { level: "Moderate", color: "text-yellow-500", barColor: "bg-yellow-500" };
  }
  if (value <= thresholds.unhealthy) {
    return { level: "Unhealthy", color: "text-orange-500", barColor: "bg-orange-500" };
  }
  return { level: "Very Unhealthy", color: "text-red-500", barColor: "bg-red-500" };
}

export function AirPollution({ data }: AirPollutionPropsType) {
  const pollution = data.list[0];
  const aqi = pollution.main.aqi;
  const aqiInfo = getAQILabel(aqi);
  const components = pollution.components;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium">
          Air Quality
        </h2>
        <span className={`text-sm font-medium ${aqiInfo.color}`}>
          {aqiInfo.label}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex h-1.5 overflow-hidden">
          <div className="flex-1 bg-green-500" />
          <div className="flex-1 bg-yellow-500" />
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-purple-500" />
        </div>
        <div className="relative h-0">
          <div
            className="absolute -top-5 w-2 h-2 bg-[hsl(var(--foreground))] transform -translate-x-1/2"
            style={{ left: `${((aqi - 1) / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
          <span>Good</span>
          <span>Fair</span>
          <span>Moderate</span>
          <span>Poor</span>
          <span>Very Poor</span>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--border))]" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {POLLUTANTS.map((pollutant) => {
          const value = components[pollutant.key];
          const { barColor } = getPollutantLevel(value, pollutant.thresholds);
          const percentage = Math.min(
            (value / pollutant.thresholds.unhealthy) * 100,
            100,
          );

          return (
            <div key={pollutant.key} className="space-y-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium">{pollutant.name}</span>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  {pollutant.unit}
                </span>
              </div>
              <div className="text-lg font-light">{value.toFixed(1)}</div>
              <div className="h-1 bg-[hsl(var(--muted))]">
                <div
                  className={`h-full ${barColor} transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))] hidden sm:block">
                {pollutant.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
          {HEALTH_ADVISORIES[aqi]}
        </p>
      </div>
    </div>
  );
}
