import { Paintbrush, Check } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useTheme, DESIGN_THEMES, ThemeConfig } from "../providers/ThemeProvider";
import { cn } from "./utils";

function ThemeCard({ config, isActive, onSelect }: {
  config: ThemeConfig;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full text-left rounded-lg border p-3 transition-all",
        "hover:border-primary/50 hover:shadow-elevation-2",
        isActive
          ? "border-primary bg-primary/5 shadow-elevation-1"
          : "border-border bg-card"
      )}
    >
      {/* Mini preview */}
      <div
        className="mb-2.5 h-10 w-full rounded-md overflow-hidden flex gap-1 p-1"
        style={{ backgroundColor: config.background }}
      >
        {/* Simulated sidebar */}
        <div
          className="h-full w-5 rounded flex-shrink-0 opacity-80"
          style={{ backgroundColor: config.background === "#ffffff" || config.background === "#f2f2f7" || config.background === "#f9f9fb" || config.background === "#f6f9fc" ? "#f4f4f5" : "#18181b" }}
        />
        {/* Simulated content */}
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div
            className="h-1.5 rounded-full w-3/4"
            style={{ backgroundColor: config.primary }}
          />
          <div
            className="h-1 rounded-full w-1/2 opacity-40"
            style={{ backgroundColor: config.primary }}
          />
        </div>
        {/* Accent dot */}
        <div
          className="h-3 w-3 rounded-full self-start mt-0.5 flex-shrink-0"
          style={{ backgroundColor: config.accent }}
        />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{config.label}</p>
          <p className="text-2xs text-muted-foreground leading-tight mt-0.5 line-clamp-2">
            {config.description}
          </p>
        </div>
        {isActive && (
          <div className="flex-shrink-0 h-4 w-4 rounded-full bg-primary flex items-center justify-center mt-0.5">
            <Check className="h-2.5 w-2.5 text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  );
}

export function ThemeSwitcher() {
  const { designTheme, setDesignTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Change design theme"
        >
          <Paintbrush className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[340px] p-3"
        sideOffset={8}
      >
        <div className="mb-3">
          <p className="text-xs font-semibold text-foreground">Design Theme</p>
          <p className="text-2xs text-muted-foreground mt-0.5">
            Cambia la identidad visual del sistema sin tocar componentes
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DESIGN_THEMES.map((t) => (
            <ThemeCard
              key={t.id}
              config={t}
              isActive={designTheme === t.id}
              onSelect={() => setDesignTheme(t.id)}
            />
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-2xs text-muted-foreground text-center">
            Los temas sobrescriben tokens CSS — la estructura de componentes no cambia
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
