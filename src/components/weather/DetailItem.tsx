interface DetailItemPropsType {
    icon?: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
}

/** Displays a labeled weather detail with an optional icon and sub-value. */
export function DetailItem({ icon, label, value, subValue }: DetailItemPropsType) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                {icon}
                <span className="text-xs uppercase tracking-wide">{label}</span>
            </div>
            <div className="font-medium">
                {value}
                {subValue && (
                    <span className="text-[hsl(var(--muted-foreground))] ml-1 font-normal">
                        {subValue}
                    </span>
                )}
            </div>
        </div>
    );
}
