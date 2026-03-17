import React, { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { Button } from "../components/ui/button";
import { 
  Spinner, 
  PageLoader, 
  CardSkeleton, 
  TableSkeleton, 
  ButtonLoader, 
  DotLoader 
} from "../components/ui/loading-states";

const code = `import { Spinner, ButtonLoader, DotLoader, CardSkeleton, TableSkeleton } from "@/components/ui/loading-states";

export function LoadingStatesDemo() {
  return (
    <>
      <Spinner />
      <Button disabled><ButtonLoader /> Loading</Button>
      <DotLoader />
      <CardSkeleton />
      <TableSkeleton rows={3} />
    </>
  );
}`;

export function LoadingStatesPage() {
  const [showPageLoader, setShowPageLoader] = useState(false);

  return (
    <ComponentShowcase
      title="Loading States"
      description="Collection of loading indicators and skeletons."
      category="UI Pattern"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex items-center gap-4 border p-4 rounded">
            <Spinner />
            <span>Simple Spinner</span>
          </div>
          <div className="border p-4 rounded">
            <Button onClick={() => setShowPageLoader(true)}>Try Page Loader (3s)</Button>
            {showPageLoader && (() => {
              setTimeout(() => setShowPageLoader(false), 3000);
              return <PageLoader />;
            })()}
          </div>
          <div className="border p-4 rounded">
            <Button disabled><ButtonLoader /> Processing</Button>
          </div>
          <div className="border p-4 rounded">
            <DotLoader />
          </div>
          <div className="md:col-span-2 border p-4 rounded space-y-4">
             <p className="text-sm font-medium text-muted-foreground">Skeletons</p>
             <CardSkeleton />
             <TableSkeleton rows={2} />
          </div>
        </div>
      }
      code={code}
      props={[
        { name: "Spinner.className", type: "string", description: "Additional classes for the spinner container." },
        { name: "PageLoader", type: "—", description: "Full-screen overlay with spinner and 'Loading' text. No props." },
        { name: "CardSkeleton", type: "—", description: "Card-shaped skeleton (title + content + footer). No props." },
        { name: "TableSkeleton.rows", type: "number", default: "5", description: "Number of skeleton rows to display in the table." },
        { name: "ButtonLoader", type: "—", description: "Inline spinner to place inside a disabled Button. No props." },
        { name: "DotLoader", type: "—", description: "Three animated dots with bounce. No props." },
      ]}
      examples={[
        {
          title: "Button with Loading State",
          description: "ButtonLoader inside a disabled Button simulates processing.",
          preview: (
            <div className="flex gap-4 items-center">
              <Button disabled><ButtonLoader /> Saving...</Button>
              <Button disabled variant="outline"><ButtonLoader /> Sending</Button>
              <Button disabled variant="secondary"><ButtonLoader /> Processing</Button>
            </div>
          ),
          code: `<Button disabled>
  <ButtonLoader /> Saving...
</Button>

<Button disabled variant="outline">
  <ButtonLoader /> Sending
</Button>`,
        },
        {
          title: "Table Skeleton",
          description: "TableSkeleton with different number of rows.",
          preview: (
            <div className="space-y-6 w-full">
              <TableSkeleton rows={3} />
            </div>
          ),
          code: `{/* 3 rows */}
<TableSkeleton rows={3} />

{/* 8 rows for long tables */}
<TableSkeleton rows={8} />`,
        },
        {
          title: "DotLoader inline",
          description: "Loading indicator with three animated dots.",
          preview: (
            <div className="flex items-center gap-2 border rounded-lg p-4">
              <span className="text-sm text-muted-foreground">Loading data</span>
              <DotLoader />
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <span>Loading data</span>
  <DotLoader />
</div>`,
        },
      ]}
    />
  );
}