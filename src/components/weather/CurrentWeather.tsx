import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from "lucide-react";
import type { CurrentWeatherPropsType } from "@/types/component-types";
import { getWeatherIconUrl, formatTime, formatVisibility } from "@/lib/weather-formatters";
import { getWindDirection, getTempUnit, getSpeedUnit } from "@/lib/weather-constants";
import { DetailItem } from "./DetailItem";

export function CurrentWeather({
  data,
  units,
  locationName,
}: CurrentWeatherPropsType) {
  const tempUnit = getTempUnit(units);
  const speedUnit = getSpeedUnit(units);
  const weather = data.weather[0];

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-lg font-medium tracking-tight">
          {locationName || `${data.name}, ${data.sys.country}`}
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {new Date(data.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-7xl font-extralight tracking-tighter">
            {Math.round(data.main.temp)}
            <span className="text-4xl text-[hsl(var(--muted-foreground))]">
              {tempUnit}
            </span>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] capitalize">
            {weather.description}
          </p>
        </div>

        <div className="text-right space-y-2">
          <img
            src={getWeatherIconUrl(weather.icon, "4x")}
            alt={weather.description}
            className="h-20 w-20 ml-auto opacity-80"
          />
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Feels like {Math.round(data.main.feels_like)}
            {tempUnit}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span>
          H: {Math.round(data.main.temp_max)}
          {tempUnit}
        </span>
        <span className="text-[hsl(var(--muted-foreground))]">·</span>
        <span>
          L: {Math.round(data.main.temp_min)}
          {tempUnit}
        </span>
      </div>

      <div className="border-t border-[hsl(var(--border))]" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <DetailItem
          icon={<Droplets className="h-4 w-4" strokeWidth={1.5} />}
          label="Humidity"
          value={`${data.main.humidity}%`}
        />
        <DetailItem
          icon={<Wind className="h-4 w-4" strokeWidth={1.5} />}
          label="Wind"
          value={`${data.wind.speed} ${speedUnit}`}
          subValue={getWindDirection(data.wind.deg)}
        />
        <DetailItem
          icon={<Gauge className="h-4 w-4" strokeWidth={1.5} />}
          label="Pressure"
          value={`${data.main.pressure}`}
          subValue="hPa"
        />
        <DetailItem
          icon={<Eye className="h-4 w-4" strokeWidth={1.5} />}
          label="Visibility"
          value={formatVisibility(data.visibility, units)}
        />
        <DetailItem
          icon={<Sunrise className="h-4 w-4" strokeWidth={1.5} />}
          label="Sunrise"
          value={formatTime(data.sys.sunrise, data.timezone)}
        />
        <DetailItem
          icon={<Sunset className="h-4 w-4" strokeWidth={1.5} />}
          label="Sunset"
          value={formatTime(data.sys.sunset, data.timezone)}
        />
      </div>

      {(data.clouds || data.rain || data.snow || data.wind.gust) && (
        <>
          <div className="border-t border-[hsl(var(--border))]" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <DetailItem label="Cloudiness" value={`${data.clouds.all}%`} />
            {data.wind.gust && (
              <DetailItem
                label="Wind Gust"
                value={`${data.wind.gust} ${speedUnit}`}
              />
            )}
            {data.rain?.["1h"] && (
              <DetailItem label="Rain (1h)" value={`${data.rain["1h"]} mm`} />
            )}
            {data.snow?.["1h"] && (
              <DetailItem label="Snow (1h)" value={`${data.snow["1h"]} mm`} />
            )}
            {data.main.sea_level && (
              <DetailItem
                label="Sea Level"
                value={`${data.main.sea_level} hPa`}
              />
            )}
            {data.main.grnd_level && (
              <DetailItem
                label="Ground Level"
                value={`${data.main.grnd_level} hPa`}
              />
            )}
          </div>
        </>
      )}

      <div className="text-xs text-[hsl(var(--muted-foreground))]">
        {data.coord.lat.toFixed(4)}°N, {data.coord.lon.toFixed(4)}°E
      </div>
    </div>
  );
}
