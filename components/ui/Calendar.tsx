"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./Button";

/**
 * Calendar — react-day-picker v9 compatible
 *
 * Uses the v9 classNames API with DSM semantic tokens.
 * All internal rdp default styles are overridden.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <div data-slot="calendar">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          /* ── Structure ── */
          root: "rdp-root",
          months: "flex flex-col sm:flex-row gap-2 relative",
          month: "flex flex-col gap-4",
          month_caption: "flex justify-center pt-1 relative items-center w-full",
          caption_label: "text-sm font-medium",

          /* ── Navigation ── */
          nav: "flex items-center gap-1",
          button_previous: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 top-1 z-10",
          ),
          button_next: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 top-1 z-10",
          ),

          /* ── Grid ── */
          month_grid: "w-full border-collapse",
          weekdays: "flex",
          weekday: "text-muted-foreground rounded-md w-8 font-normal text-2xs text-center",
          week: "flex w-full mt-2",
          day: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            props.mode === "range"
              ? "[&:has(>.rdp-range_end)]:rounded-r-md [&:has(>.rdp-range_start)]:rounded-l-md [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-accent",
          ),
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "size-8 p-0 font-normal aria-selected:opacity-100",
          ),

          /* ── States ── */
          selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
          today: "bg-accent text-accent-foreground rounded-md",
          outside: "text-muted-foreground aria-selected:text-muted-foreground",
          disabled: "text-muted-foreground opacity-50",
          hidden: "invisible",

          /* ── Range ── */
          range_start:
            "rdp-range_start aria-selected:bg-primary aria-selected:text-primary-foreground rounded-l-md",
          range_end:
            "rdp-range_end aria-selected:bg-primary aria-selected:text-primary-foreground rounded-r-md",
          range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",

          ...classNames,
        }}
        formatters={{
          formatWeekdayName: (weekday) =>
            weekday.toLocaleDateString("es-CO", { weekday: "short" }).replace(".", "").slice(0, 2),
        }}
        components={{
          Chevron: ({ orientation }) => {
            if (orientation === "left") {
              return <ChevronLeftIcon className="size-4" />;
            }
            return <ChevronRightIcon className="size-4" />;
          },
        }}
        {...props}
      />
      {/* Override rdp v9 default styles that cause Material Design look */}
      <style>{`
        .rdp-root {
          --rdp-accent-color: var(--primary);
          --rdp-accent-background-color: var(--accent);
          --rdp-day_button-border-radius: var(--radius);
          --rdp-day_button-width: 2rem;
          --rdp-day_button-height: 2rem;
          --rdp-selected-border: 0;
          --rdp-outside-opacity: 0.5;
          --rdp-range_start-color: var(--primary-foreground);
          --rdp-range_start-background: var(--primary);
          --rdp-range_end-color: var(--primary-foreground);
          --rdp-range_end-background: var(--primary);
          --rdp-range_middle-color: var(--accent-foreground);
          --rdp-range_middle-background: var(--accent);
        }
        /* Remove rdp v9 default focus ring and replace with DSM ring */
        .rdp-root .rdp-day_button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ring);
          border-radius: var(--radius);
        }
        /* Remove rdp default underlines and borders */
        .rdp-root .rdp-today:not(.rdp-selected) .rdp-day_button {
          color: var(--accent-foreground);
          font-weight: 500;
        }
        .rdp-root .rdp-selected .rdp-day_button {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
        .rdp-root .rdp-selected .rdp-day_button:hover {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
      `}</style>
    </div>
  );
}

export { Calendar };
