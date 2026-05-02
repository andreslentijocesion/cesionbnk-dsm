import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundary } from "../components/ui/errorboundary";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

const meta: Meta<typeof ErrorBoundary> = {
  title: "UI/ErrorBoundary",
  component: ErrorBoundary,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ErrorBoundary>;

// Component that deliberately crashes
function BrokenComponent({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error("Simulated component crash — something went wrong internally.");
  }
  return (
    <div className="rounded-xl border border-success/30 bg-success/8 p-6 text-center">
      <Badge variant="success-soft">Component working correctly</Badge>
      <p className="mt-2 text-sm text-muted-foreground">Toggle the crash switch to trigger the ErrorBoundary.</p>
    </div>
  );
}

function InteractiveDemo() {
  const [crashed, setCrashed] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setCrashed(true)}
          disabled={crashed}
        >
          Trigger crash
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setCrashed(false); setKey((k) => k + 1); }}
        >
          Reset
        </Button>
      </div>
      <ErrorBoundary key={key} onReset={() => { setCrashed(false); setKey((k) => k + 1); }}>
        <BrokenComponent shouldCrash={crashed} />
      </ErrorBoundary>
    </div>
  );
}

export const Default: Story = {
  render: () => <InteractiveDemo />,
};

export const WithCustomFallback: Story = {
  render: () => {
    const [key, setKey] = useState(0);
    return (
      <ErrorBoundary
        key={key}
        fallback={
          <div className="rounded-xl border border-warning/30 bg-warning/8 p-6 text-center space-y-3">
            <Badge variant="warning-soft">Custom fallback</Badge>
            <p className="text-sm text-warning-on-subtle">
              Este es un fallback personalizado — puedes pasar cualquier ReactNode como `fallback`.
            </p>
            <Button size="sm" variant="outline" onClick={() => setKey((k) => k + 1)}>
              Reset
            </Button>
          </div>
        }
      >
        {(() => { throw new Error("Forced crash for demo"); })()}
      </ErrorBoundary>
    );
  },
};

export const DefaultFallbackUI: Story = {
  name: "Default Fallback UI",
  render: () => {
    const [key, setKey] = useState(0);
    return (
      <ErrorBoundary
        key={key}
        onReset={() => setKey((k) => k + 1)}
      >
        {(() => { throw new Error("An unexpected error occurred while loading this component."); })()}
      </ErrorBoundary>
    );
  },
};
