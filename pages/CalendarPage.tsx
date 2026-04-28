import { ComponentShowcase } from "../components/ui/component-showcase";
import { Calendar } from "../components/ui/calendar";
import { useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [multiple, setMultiple] = useState<Date[] | undefined>([new Date(), addDays(new Date(), 2), addDays(new Date(), 4)]);

  return (
    <ComponentShowcase
      title="Calendar"
      description="A date field component that allows users to enter and edit date."
      category="Forms"
      atomicLevel="Molecule"
      preview={
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-fit rounded-md border shadow"
        />
      }
      code={`import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-fit rounded-md border shadow"
    />
  )
}`}
      props={[
        {
          name: "mode",
          type: '"single" | "multiple" | "range" | "default"',
          default: '"default"',
          description: " The selection mode of the calendar.",
        },
        {
          name: "selected",
          type: "Date | Date[] | { from: Date; to: Date } | undefined",
          default: "-",
          description: "The selected date(s).",
        },
        {
          name: "onSelect",
          type: "function",
          default: "-",
          description: "Callback when a date is selected.",
        },
        {
          name: "showOutsideDays",
          type: "boolean",
          default: "true",
          description: "Show days from previous/next months.",
        },
        {
          name: "disabled",
          type: "Matcher | Matcher[]",
          default: "-",
          description: "Disable specific dates.",
        }
      ]}
      examples={[
        {
          title: "Range Selection",
          description: "Select a range of dates.",
          preview: (
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              className="w-fit rounded-md border shadow"
            />
          ),
          code: `import { Calendar } from "@/components/ui/calendar"
import { addDays } from "date-fns"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export function CalendarRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      className="w-fit rounded-md border"
    />
  )
}`
        },
        {
          title: "Multiple Selection",
          description: "Select multiple individual dates.",
          preview: (
            <Calendar
              mode="multiple"
              selected={multiple}
              onSelect={setMultiple}
              className="w-fit rounded-md border shadow"
            />
          ),
          code: `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarMultipleDemo() {
  const [dates, setDates] = useState([new Date()])

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      className="w-fit rounded-md border"
    />
  )
}`
        },
        {
          title: "Disabled Dates",
          description: "Disable specific dates or ranges.",
          preview: (
            <Calendar
              mode="single"
              disabled={(date) => date < new Date()}
              className="w-fit rounded-md border shadow"
            />
          ),
          code: `<Calendar
  mode="single"
  disabled={(date) => date < new Date()}
  className="w-fit rounded-md border"
/>`
        }
      ]}
    />
  );
}