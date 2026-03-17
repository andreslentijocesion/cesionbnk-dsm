/**
 * ColorSwatch Component
 *
 * BUSINESS PATTERN: Componente reutilizable para mostrar muestras de color
 *
 * NO MODIFICAR sin consultar: /components/widgets/WIDGETS_ARCHITECTURE.md
 * Parte del sistema modular de Brand Guidelines
 */

import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "../ui/utils";

interface ColorSwatchProps {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  isPrimary?: boolean;
  copiedColor: string | null;
  onCopy: (text: string, id: string) => void;
}

export function ColorSwatch({
  id,
  name,
  hex,
  rgb,
  usage,
  isPrimary = false,
  copiedColor,
  onCopy,
}: ColorSwatchProps) {
  return (
    <div className="space-y-4">
      {/* Color Display */}
      <div
        className={cn(
          "h-32 rounded-lg shadow-sm border border-border flex items-center justify-center",
          isPrimary ? "bg-primary" : "bg-secondary"
        )}
      >
        <span
          className={cn(
            "font-semibold text-lg",
            isPrimary ? "text-primary-foreground" : "text-secondary-foreground"
          )}
        >
          {name}
        </span>
      </div>

      {/* Color Info */}
      <div className="space-y-3">
        <ColorValue
          label="HEX"
          value={hex}
          onCopy={() => onCopy(hex, `${id}-hex`)}
          isCopied={copiedColor === `${id}-hex`}
        />

        <ColorValue
          label="RGB"
          value={rgb}
          onCopy={() => onCopy(rgb, `${id}-rgb`)}
          isCopied={copiedColor === `${id}-rgb`}
        />

        <div className="p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground mb-1">Usage</p>
          <p className="text-sm">{usage}</p>
        </div>
      </div>
    </div>
  );
}

interface ColorValueProps {
  label: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
}

function ColorValue({ label, value, onCopy, isCopied }: ColorValueProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onCopy}
        className="h-8 w-8"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-primary" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
