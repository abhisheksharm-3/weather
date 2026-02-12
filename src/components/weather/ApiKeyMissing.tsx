import { Key, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApiKeyMissing() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--background))]">
      <div className="max-w-lg w-full space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex p-4 border border-[hsl(var(--border))]">
            <Key className="h-8 w-8 text-[hsl(var(--muted-foreground))]" strokeWidth={1} />
          </div>
          <h1 className="text-xl font-medium tracking-tight">API Key Required</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            An OpenWeather API key is needed to fetch weather data
          </p>
        </div>

        <div className="space-y-4 p-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                1
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">Create a free account</p>
                <a
                  href="https://home.openweathermap.org/users/sign_up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  openweathermap.org
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                2
              </span>
              <p className="text-sm pt-0.5">
                Navigate to{" "}
                <a
                  href="https://home.openweathermap.org/api_keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  API Keys
                </a>{" "}
                and copy your key
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                3
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">
                  Create a <code className="text-xs">.env</code> file in the project root
                </p>
                <code className="block mt-2 p-3 text-xs bg-[hsl(var(--muted))] font-mono">
                  VITE_OPENWEATHER_API_KEY=your_key
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                4
              </span>
              <p className="text-sm pt-0.5">Restart the dev server</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            I've added my key
          </Button>
        </div>
      </div>
    </div>
  );
}
