import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import { Calendar } from "../ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/Popover";
import { Badge } from "../ui/Badge";
import { Separator } from "../ui/Separator";
import { ScrollArea } from "../ui/ScrollArea";
import { Filter, Calendar as CalendarIcon, X } from "lucide-react";

const statusOptions = [
  { id: "pending", label: "Pending" },
  { id: "review", label: "In Review" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "paid", label: "Paid" },
];

const clientTypes = [
  { id: "corporate", label: "Large Enterprise" },
  { id: "sme", label: "SME" },
  { id: "startup", label: "Startup" },
];

export function AdvancedFilterPanel() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState(0);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStatusToggle = (statusId: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusId)
        ? prev.filter((id) => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handleClearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedStatuses([]);
    setActiveFilters(0);
  };

  const handleApplyFilters = () => {
    // Count active filters
    let count = 0;
    if (startDate) count++;
    if (endDate) count++;
    if (selectedStatuses.length > 0) count++;
    setActiveFilters(count);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 size-4" />
          Advanced Filters
          {activeFilters > 0 && (
            <Badge
              variant="outline"
              className="ml-2 size-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {activeFilters}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your search with specific criteria
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-12rem)] px-6 mt-6">
          <div className="space-y-6 pr-4">
            {/* Date Range */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Date Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="start-date"
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {formatDate(startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-date"
                          variant="outline"
                          className="w-full justify-start text-left"
                        >
                          <CalendarIcon className="mr-2 size-4" />
                          {formatDate(endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amount Range */}
            <div className="space-y-4">
              <h4 className="font-medium">Amount Range</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-amount">Minimum</Label>
                  <Input
                    id="min-amount"
                    placeholder="$0"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-amount">Maximum</Label>
                  <Input
                    id="max-amount"
                    placeholder="No limit"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Status Filter */}
            <div className="space-y-4">
              <h4 className="font-medium">Invoice Status</h4>
              <div className="space-y-3">
                {statusOptions.map((status) => (
                  <div
                    key={status.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={status.id}
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => handleStatusToggle(status.id)}
                    />
                    <Label
                      htmlFor={status.id}
                      className="flex-1 cursor-pointer"
                    >
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Client Type */}
            <div className="space-y-4">
              <h4 className="font-medium">Client Type</h4>
              <div className="space-y-3">
                {clientTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox id={type.id} />
                    <Label
                      htmlFor={type.id}
                      className="flex-1 cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Risk Level */}
            <div className="space-y-4">
              <h4 className="font-medium">Risk Level</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Analyst */}
            <div className="space-y-4">
              <h4 className="font-medium">Assigned Analyst</h4>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select analyst" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="juan">Juan Perez</SelectItem>
                  <SelectItem value="maria">Maria Gonzalez</SelectItem>
                  <SelectItem value="carlos">Carlos Rodriguez</SelectItem>
                  <SelectItem value="ana">Ana Martinez</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-6 px-6">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClearFilters}
            >
              <X className="mr-2 size-4" />
              Clear
            </Button>
            <SheetClose asChild>
              <Button className="flex-1" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}