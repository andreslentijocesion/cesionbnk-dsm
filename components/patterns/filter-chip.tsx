import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  value: string;
  onRemove?: () => void;
}

export function FilterChip({ label, value, onRemove }: FilterChipProps) {
  return (
    <Badge variant="secondary-soft-outline" className="gap-2 pr-1">
      <span className="text-xs">
        {label}: {value}
      </span>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="size-4 p-0 hover:bg-transparent"
          onClick={onRemove}
        >
          <X className="size-3" />
        </Button>
      )}
    </Badge>
  );
}
