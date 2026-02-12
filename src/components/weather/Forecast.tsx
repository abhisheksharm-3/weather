import type { ForecastResponse, ForecastItem } from "@/types/weather";
import { getWeatherIconUrl, formatTime, getTempUnit } from "@/api/weather";
import { Droplets, Wind, Thermometer } from "lucide-react";

interface ForecastProps {
  data: ForecastResponse;
  units: "metric" | "imperial";
}

function groupByDay(list: ForecastItem[]): Record<string, ForecastItem[]> {
  return list.reduce(
    (acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, ForecastItem[]>,
  );
}

function getDailySummary(items: ForecastItem[]) {
  const temps = items.map((item) => item.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  const conditionCounts = items.reduce(
    (acc, item) => {
      const condition = item.weather[0].main;
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mostCommonCondition = Object.entries(conditionCounts).sort(
    (a, b) => b[1] - a[1],
  )[0][0];

  const dayItem = items.find(
    (item) =>
      item.weather[0].main === mostCommonCondition && item.sys.pod === "d",
  );
  const icon = dayItem?.weather[0].icon || items[0].weather[0].icon;

  const avgPop = items.reduce((sum, item) => sum + item.pop, 0) / items.length;

  return {
    minTemp,
    maxTemp,
    icon,
    condition: mostCommonCondition,
    pop: avgPop,
  };
}

export function Forecast({ data, units }: ForecastProps) {
  const tempUnit = getTempUnit(units);
  const speedUnit = units === "metric" ? "m/s" : "mph";
  const groupedForecast = groupByDay(data.list);
  const days = Object.keys(groupedForecast);

  // Calculate global min/max for temperature bar visualization
  const allSummaries = days.map((d) => getDailySummary(groupedForecast[d]));
  const globalMin = Math.min(...allSummaries.map((s) => s.minTemp));
  const globalMax = Math.max(...allSummaries.map((s) => s.maxTemp));
  const tempRange = globalMax - globalMin;

  return (
    <div className="space-y-10">
      {/* 5-Day Overview */}
      <section className="space-y-4">
        <h2 className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium">
          5-Day Forecast
        </h2>

        <div className="space-y-1">
          {days.map((date, index) => {
            const items = groupedForecast[date];
            const summary = getDailySummary(items);
            const dateObj = new Date(date);
            const isToday = index === 0;

            // Calculate bar position and width
            const barStart = ((summary.minTemp - globalMin) / tempRange) * 100;
            const barWidth =
              ((summary.maxTemp - summary.minTemp) / tempRange) * 100;

            return (
              <div
                key={date}
                className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[120px_80px_1fr_60px] items-center gap-3 py-3 border-b border-[hsl(var(--border))] last:border-0"
              >
                {/* Day */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-sm font-medium">
                    {isToday
                      ? "Today"
                      : dateObj.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                  </span>
                  <span className="text-xs text-[hsl(var(--muted-foreground))] sm:hidden">
                    {dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Icon & Precipitation - Center on mobile */}
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={getWeatherIconUrl(summary.icon, "2x")}
                    alt={summary.condition}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  />
                  <div className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
                    <Droplets className="h-3 w-3" strokeWidth={1.5} />
                    <span>{Math.round(summary.pop * 100)}%</span>
                  </div>
                </div>

                {/* Temperature Range */}
                <div className="flex items-center gap-2 sm:gap-3 justify-end sm:justify-start">
                  <span className="text-sm font-medium w-8 text-right">
                    {Math.round(summary.minTemp)}°
                  </span>

                  {/* Temperature Bar - Hidden on very small screens */}
                  <div className="hidden sm:block w-20 lg:w-32 h-1.5 bg-[hsl(var(--muted))] relative">
                    <div
                      className="absolute h-full bg-gradient-to-r from-[hsl(var(--muted-foreground))] to-[hsl(var(--foreground))]"
                      style={{
                        left: `${barStart}%`,
                        width: `${Math.max(barWidth, 8)}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm font-medium w-8">
                    {Math.round(summary.maxTemp)}°
                  </span>
                </div>

                {/* Condition - Desktop only */}
                <span className="hidden sm:block text-xs text-[hsl(var(--muted-foreground))] text-right truncate">
                  {summary.condition}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hourly Forecast */}
      <section className="space-y-4">
        <h2 className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium">
          Hourly Forecast
        </h2>

        <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 hide-scrollbar touch-scroll">
          <div
            className="flex gap-1"
            style={{ width: "max-content", minWidth: "100%" }}
          >
            {data.list.slice(0, 12).map((item, index) => {
              const isNow = index === 0;
              return (
                <div
                  key={item.dt}
                  className={`flex flex-col items-center py-4 px-3 sm:px-4 min-w-[60px] sm:min-w-[72px] ${
                    isNow
                      ? "bg-[hsl(var(--muted))]"
                      : "hover:bg-[hsl(var(--muted))]/50"
                  } transition-colors`}
                >
                  <span
                    className={`text-xs ${isNow ? "font-medium" : "text-[hsl(var(--muted-foreground))]"}`}
                  >
                    {isNow
                      ? "Now"
                      : formatTime(item.dt, 0, {
                          hour: "numeric",
                          minute: undefined,
                        })}
                  </span>

                  <img
                    src={getWeatherIconUrl(item.weather[0].icon, "2x")}
                    alt={item.weather[0].description}
                    className="h-8 w-8 my-2"
                  />

                  <span className="text-sm font-medium">
                    {Math.round(item.main.temp)}°
                  </span>

                  {item.pop > 0 && (
                    <div className="flex items-center gap-0.5 mt-1.5 text-[10px] text-[hsl(var(--muted-foreground))]">
                      <Droplets className="h-2.5 w-2.5" strokeWidth={1.5} />
                      <span>{Math.round(item.pop * 100)}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Forecast */}
      <section className="space-y-4">
        <h2 className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-medium">
          Detailed Forecast
        </h2>

        <div className="space-y-6">
          {days.slice(0, 3).map((date) => {
            const items = groupedForecast[date];
            const dateObj = new Date(date);

            return (
              <div key={date} className="space-y-3">
                <h3 className="text-sm font-medium pb-2 border-b border-[hsl(var(--border))]">
                  {dateObj.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>

                {/* Mobile: Vertical Stack / Desktop: Grid */}
                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
                  {items.map((item) => (
                    <div
                      key={item.dt}
                      className="flex items-center justify-between sm:flex-col sm:items-start p-3 sm:p-4 border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/30 transition-colors"
                    >
                      {/* Time & Icon */}
                      <div className="flex items-center gap-3 sm:w-full sm:justify-between sm:mb-3">
                        <span className="text-sm font-medium min-w-[56px]">
                          {formatTime(item.dt, 0)}
                        </span>
                        <img
                          src={getWeatherIconUrl(item.weather[0].icon, "2x")}
                          alt={item.weather[0].description}
                          className="h-8 w-8"
                        />
                      </div>

                      {/* Temperature */}
                      <div className="flex items-baseline gap-1 sm:mb-2">
                        <span className="text-2xl sm:text-3xl font-light">
                          {Math.round(item.main.temp)}
                        </span>
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">
                          {tempUnit}
                        </span>
                      </div>

                      {/* Details - Desktop */}
                      <div className="hidden sm:block space-y-1.5 w-full">
                        <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize truncate">
                          {item.weather[0].description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[hsl(var(--muted-foreground))]">
                          <span className="flex items-center gap-1">
                            <Thermometer
                              className="h-3 w-3"
                              strokeWidth={1.5}
                            />
                            {Math.round(item.main.feels_like)}°
                          </span>
                          <span className="flex items-center gap-1">
                            <Droplets className="h-3 w-3" strokeWidth={1.5} />
                            {item.main.humidity}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Wind className="h-3 w-3" strokeWidth={1.5} />
                            {Math.round(item.wind.speed)} {speedUnit}
                          </span>
                        </div>
                      </div>

                      {/* Details - Mobile (compact) */}
                      <div className="flex sm:hidden items-center gap-3 text-[11px] text-[hsl(var(--muted-foreground))]">
                        <span className="flex items-center gap-1">
                          <Droplets className="h-3 w-3" strokeWidth={1.5} />
                          {Math.round(item.pop * 100)}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Wind className="h-3 w-3" strokeWidth={1.5} />
                          {Math.round(item.wind.speed)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
