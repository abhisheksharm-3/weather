export function Footer() {
  return (
    <footer className="mt-auto border-t border-[hsl(var(--border))]">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
        <span>
          Data from{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[hsl(var(--foreground))] transition-colors"
          >
            OpenWeather
          </a>
        </span>
        <span className="hidden sm:inline">
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
