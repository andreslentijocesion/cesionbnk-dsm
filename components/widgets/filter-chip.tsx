import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  value: string;
  onRemove?: () => void;
}

export function FilterChip({ label, value, onRemove }: FilterChipProps) {
  return (
    <Badge variant="secondary" className="gap-2 pr-1">
      <span className="text-xs">
        {label}: {value}
      </span>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0 hover:bg-transparent"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Badge>
  );
}
