import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-10 pb-8">
      {/* Current Weather Skeleton */}
      <section className="space-y-8">
        {/* Location & Date */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Main Temperature */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-16 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-20 w-20" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>

        {/* Temperature Range */}
        <Skeleton className="h-4 w-32" />

        {/* Divider */}
        <div className="border-t border-[hsl(var(--border))]" />

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>
      </section>

      {/* 5-Day Forecast Skeleton */}
      <section className="space-y-4">
        <Skeleton className="h-3 w-24" />

        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[120px_80px_1fr_60px] items-center gap-3 py-3 border-b border-[hsl(var(--border))] last:border-0"
            >
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-8" />
              <div className="flex items-center gap-3 justify-end sm:justify-start">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="hidden sm:block h-1.5 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="hidden sm:block h-3 w-12" />
            </div>
          ))}
        </div>
      </section>

      {/* Hourly Forecast Skeleton */}
      <section className="space-y-4">
        <Skeleton className="h-3 w-28" />

        <div className="flex gap-1 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-4 px-3 sm:px-4 min-w-[60px] sm:min-w-[72px] gap-2"
            >
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-6" />
            </div>
          ))}
        </div>
      </section>

      {/* Air Quality Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        <Skeleton className="h-1.5 w-full" />

        <div className="border-t border-[hsl(var(--border))]" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-1 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
