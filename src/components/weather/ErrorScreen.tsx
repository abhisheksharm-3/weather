import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ErrorScreenPropsType } from "@/types/component-types";

export function ErrorScreen({ message, onRetry }: ErrorScreenPropsType) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="p-4 border border-[hsl(var(--border))]">
        <AlertTriangle className="h-8 w-8 text-[hsl(var(--destructive))]" strokeWidth={1} />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Something went wrong</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-sm">
          {message}
        </p>
      </div>

      <Button variant="outline" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
        Try again
      </Button>
    </div>
  );
}
