import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="search"
        placeholder={placeholder}
        className="flex-1"
      />
      <Button size="icon">
        <Search className="size-4" />
      </Button>
    </div>
  );
}
