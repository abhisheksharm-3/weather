import { useState, useDeferredValue, useCallback, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGeocode } from "@/hooks/useWeather";
import type { SearchBarPropsType } from "@/types/component-types";
import type { GeocodingResultType } from "@/types/weather-types";

export function SearchBar({
    onLocationSelect,
    onUseCurrentLocation,
    isLoadingLocation,
}: SearchBarPropsType) {
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { data: suggestions, isLoading } = useGeocode(
        deferredQuery,
        isSuggestionsVisible,
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsSuggestionsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback(
        (result: GeocodingResultType) => {
            const locationName = result.state
                ? `${result.name}, ${result.state}, ${result.country}`
                : `${result.name}, ${result.country}`;
            onLocationSelect(result.lat, result.lon, locationName);
            setQuery("");
            setIsSuggestionsVisible(false);
        },
        [onLocationSelect],
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsSuggestionsVisible(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && suggestions && suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
        if (e.key === "Escape") {
            setIsSuggestionsVisible(false);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                        type="text"
                        placeholder="Search city..."
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => query.length > 2 && setIsSuggestionsVisible(true)}
                        className="pl-10"
                    />
                    {isLoading && (
                        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[hsl(var(--muted-foreground))]" />
                    )}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onUseCurrentLocation}
                    disabled={isLoadingLocation}
                    title="Use current location"
                >
                    {isLoadingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <MapPin className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {isSuggestionsVisible && suggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-[hsl(var(--border))] bg-[hsl(var(--popover))] shadow-lg">
                    {suggestions.map((result, index) => (
                        <button
                            type="button"
                            key={`${result.lat}-${result.lon}-${index}`}
                            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-[hsl(var(--accent))] transition-colors"
                            onClick={() => handleSelect(result)}
                        >
                            <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                            <span>
                                {result.name}
                                {result.state && `, ${result.state}`}
                                {`, ${result.country}`}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {isSuggestionsVisible &&
                deferredQuery.length > 2 &&
                suggestions &&
                suggestions.length === 0 &&
                !isLoading && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-4 text-center text-sm text-[hsl(var(--muted-foreground))] shadow-lg">
                        No locations found
                    </div>
                )}
        </div>
    );
}
