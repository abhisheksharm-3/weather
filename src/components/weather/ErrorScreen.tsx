import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  error: Error | null;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 border border-[hsl(var(--border))]">
            <AlertCircle
              className="h-8 w-8 text-[hsl(var(--muted-foreground))]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-light tracking-tight">
            Unable to Load Weather
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {error?.message ||
              "Something went wrong while fetching weather data."}
          </p>
        </div>

        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
