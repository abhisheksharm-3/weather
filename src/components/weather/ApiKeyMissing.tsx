import { Key } from "lucide-react";

export function ApiKeyMissing() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--background))]">
      <div className="max-w-lg w-full space-y-8">
        <div className="flex justify-center">
          <div className="p-4 border border-[hsl(var(--border))]">
            <Key
              className="h-8 w-8 text-[hsl(var(--muted-foreground))]"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-light tracking-tight">
            API Key Required
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Configure your OpenWeather API key to use this app.
          </p>
        </div>

        <div className="space-y-4 p-6 border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                1
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">Get a free API key</p>
                <a
                  href="https://openweathermap.org/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[hsl(var(--muted-foreground))] underline underline-offset-2 hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  openweathermap.org/api
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                2
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">Create a .env file in the project root</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                3
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">Add your API key</p>
                <code className="block mt-2 p-3 text-xs bg-[hsl(var(--muted))] font-mono">
                  VITE_OPENWEATHER_API_KEY=your_key
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
                4
              </span>
              <div className="space-y-1 pt-0.5">
                <p className="text-sm">Restart the development server</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
