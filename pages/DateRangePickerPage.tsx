import { ComponentShowcase } from "../components/ui/component-showcase";
import { DateRangePicker } from "../components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const code = `import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function DateRangePickerDemo() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      placeholder="Select dates"
    />
  );
}`;

export function DateRangePickerPage() {
  const [range1, setRange1] = useState<DateRange | undefined>();
  const [range2, setRange2] = useState<DateRange | undefined>({
    from: new Date(2024, 11, 1),
    to: new Date(2024, 11, 15),
  });
  const [range3, setRange3] = useState<DateRange | undefined>();

  return (
    <ComponentShowcase
      title="Date Range Picker"
      description="Date range selector with a 2-month visual calendar, customizable format, and responsive popover. Ideal for report filters and temporal searches."
      category="Forms"
      atomicLevel="Molecule"
      preview={
        <div className="w-full max-w-sm space-y-2">
          <label className="text-foreground font-medium">Select a date range</label>
          <DateRangePicker
            dateRange={range1}
            onDateRangeChange={setRange1}
          />
          {range1?.from && (
            <p className="text-muted-foreground text-sm">
              {range1.to
                ? `Range: ${format(range1.from, "dd/MM/yyyy")} - ${format(range1.to, "dd/MM/yyyy")}`
                : `Start: ${format(range1.from, "dd/MM/yyyy")}`}
            </p>
          )}
        </div>
      }
      code={code}
      props={[
        { name: "dateRange", type: "DateRange | undefined", default: "undefined", description: "Selected date range" },
        { name: "onDateRangeChange", type: "(range) => void", description: "Callback when the range changes", required: true },
        { name: "placeholder", type: "string", default: '"Select a range..."', description: "Text when no selection exists" },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the component" },
        { name: "className", type: "string", description: "Additional CSS classes" },
      ]}
      examples={[
        {
          title: "With Default Value",
          description: "Date Range Picker with a preselected range.",
          preview: (
            <div className="w-full max-w-sm">
              <DateRangePicker
                dateRange={range2}
                onDateRangeChange={setRange2}
              />
            </div>
          ),
          code: `<DateRangePicker
  dateRange={{ from: new Date(2024, 11, 1), to: new Date(2024, 11, 15) }}
  onDateRangeChange={setRange}
/>`,
        },
        {
          title: "Custom Placeholder",
          description: "With custom placeholder text.",
          preview: (
            <div className="w-full max-w-sm">
              <DateRangePicker
                dateRange={range3}
                onDateRangeChange={setRange3}
                placeholder="Choose the report period"
              />
            </div>
          ),
          code: `<DateRangePicker
  dateRange={range}
  onDateRangeChange={setRange}
  placeholder="Choose the report period"
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state of the component.",
          preview: (
            <div className="w-full max-w-sm">
              <DateRangePicker
                dateRange={{ from: new Date(2024, 11, 1), to: new Date(2024, 11, 31) }}
                onDateRangeChange={() => {}}
                disabled
              />
            </div>
          ),
          code: `<DateRangePicker
  dateRange={fixedRange}
  onDateRangeChange={() => {}}
  disabled
/>`,
        },
      ]}
    />
  );
}