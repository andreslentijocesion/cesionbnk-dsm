import { SearchBar } from "./search-bar";
import { FilterChip } from "./filter-chip";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Filter, Download } from "lucide-react";

export function FilterBar() {
  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar placeholder="Search by client or invoice number..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Active Filters Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Active filters:</span>
        <FilterChip label="Status" value="Approved" onRemove={() => {}} />
        <FilterChip label="Date" value="January 2024" onRemove={() => {}} />
        <FilterChip label="Amount" value="$1M - $5M" onRemove={() => {}} />
        <Button variant="ghost" size="sm" className="text-xs">
          Clear all
        </Button>
      </div>
    </div>
  );
}
