import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Search...", onSearch }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="search"
        placeholder={placeholder}
        className="flex-1"
      />
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
