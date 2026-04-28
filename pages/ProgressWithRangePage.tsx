import { ComponentShowcase } from "../components/ui/component-showcase";
import { ProgressWithRange } from "../components/ui/progress-with-range";

export function ProgressWithRangePage() {
  return (
    <ComponentShowcase
      title="Progress With Range"
      description="A progress bar with start/end range labels underneath. Ideal for date ranges, vigencia periods, or any bounded timeline."
      category="Feedback"
      atomicLevel="Atom"

      // Main Preview
      preview={
        <div className="w-full max-w-sm">
          <ProgressWithRange value={65} from="27 Nov 2025" to="27 Dic 2025" />
        </div>
      }

      // Main Code
      code={`import { ProgressWithRange } from "@/components/ui/progress-with-range"

export function Demo() {
  return <ProgressWithRange value={65} from="27 Nov 2025" to="27 Dic 2025" />
}`}

      // Props Documentation
      props={[
        {
          name: "value",
          type: "number",
          description: "Current progress value (0–100).",
        },
        {
          name: "from",
          type: "string",
          description: "Label for the start of the range (e.g. a date).",
        },
        {
          name: "to",
          type: "string",
          description: "Label for the end of the range (e.g. a date).",
        },
        {
          name: "barClassName",
          type: "string",
          description: "Optional CSS class to override the progress bar height/style (default: 'h-2').",
        },
        {
          name: "indicatorClassName",
          type: "string",
          description: "Optional CSS class for the progress indicator fill.",
        },
        {
          name: "className",
          type: "string",
          description: "Optional CSS class for the outer wrapper div.",
        },
      ]}

      // Examples
      examples={[
        {
          title: "Date Range (Vigencia)",
          description: "Typical usage for invoice validity periods in financial operations.",
          preview: (
            <div className="space-y-6 w-full max-w-sm">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Active (65%)</span>
                <ProgressWithRange value={65} from="01 Ene 2026" to="01 Mar 2026" />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Starting (10%)</span>
                <ProgressWithRange value={10} from="15 Feb 2026" to="15 Jun 2026" />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Near Expiry (92%)</span>
                <ProgressWithRange value={92} from="10 Nov 2025" to="10 Feb 2026" />
              </div>
            </div>
          ),
          code: `<ProgressWithRange value={65} from="01 Ene 2026" to="01 Mar 2026" />
<ProgressWithRange value={10} from="15 Feb 2026" to="15 Jun 2026" />
<ProgressWithRange value={92} from="10 Nov 2025" to="10 Feb 2026" />`
        },
        {
          title: "Custom Bar Styles",
          description: "Override the bar height and indicator color for different visual contexts.",
          preview: (
            <div className="space-y-6 w-full max-w-sm">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Taller bar (h-3)</span>
                <ProgressWithRange
                  value={50}
                  from="Phase 1"
                  to="Phase 3"
                  barClassName="h-3"
                />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Warning indicator</span>
                <ProgressWithRange
                  value={85}
                  from="Q1 2026"
                  to="Q4 2026"
                  indicatorClassName="bg-orange-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Critical indicator</span>
                <ProgressWithRange
                  value={95}
                  from="Sprint 1"
                  to="Sprint 10"
                  indicatorClassName="bg-red-500"
                />
              </div>
            </div>
          ),
          code: `<ProgressWithRange
  value={50} from="Phase 1" to="Phase 3"
  barClassName="h-3"
/>
<ProgressWithRange
  value={85} from="Q1 2026" to="Q4 2026"
  indicatorClassName="bg-orange-500"
/>
<ProgressWithRange
  value={95} from="Sprint 1" to="Sprint 10"
  indicatorClassName="bg-red-500"
/>`
        },
        {
          title: "Non-Date Ranges",
          description: "Works with any start/end text, not just dates.",
          preview: (
            <div className="space-y-6 w-full max-w-sm">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Numeric range</span>
                <ProgressWithRange value={40} from="$0" to="$100,000" />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Step progress</span>
                <ProgressWithRange value={60} from="Step 1" to="Step 5" />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Version range</span>
                <ProgressWithRange value={75} from="v1.0" to="v2.0" />
              </div>
            </div>
          ),
          code: `<ProgressWithRange value={40} from="$0" to="$100,000" />
<ProgressWithRange value={60} from="Step 1" to="Step 5" />
<ProgressWithRange value={75} from="v1.0" to="v2.0" />`
        },
      ]}
    />
  );
}