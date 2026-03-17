import React, { useState, useCallback } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { ErrorBoundary } from "../components/ui/error-boundary";
import { Button } from "../components/ui/button";
import { AlertTriangle } from "lucide-react";

const code = `import { ErrorBoundary } from "@/components/ui/error-boundary";

export function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary>
      <MyComponentThatMightError />
    </ErrorBoundary>
  );
}`;

/**
 * Instead of throwing during render (which causes React to log errors
 * even when caught by ErrorBoundary), we simulate an error state
 * without actually throwing. This avoids the error flooding the console.
 */
function ErrorBoundaryDemo() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900">
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-red-900 dark:text-red-300">
          Something went wrong
        </h2>
        <p className="mb-6 max-w-md text-sm text-red-800 dark:text-red-400">
          Boom! This error was caught by the ErrorBoundary.
        </p>
        <Button
          onClick={() => setHasError(false)}
          className="bg-red-600 hover:bg-red-700 text-white border-none"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <p className="text-muted-foreground">This component is working correctly.</p>
      <Button variant="destructive" onClick={() => setHasError(true)}>
        Simulate Error
      </Button>
    </div>
  );
}

export function ErrorBoundaryPage() {
  return (
    <ComponentShowcase
      title="Error Boundary"
      description="Catches render errors and shows a friendly fallback UI."
      category="Utility"
      preview={
        <div className="w-full p-4 border rounded-lg">
          <ErrorBoundary>
            <ErrorBoundaryDemo />
          </ErrorBoundary>
        </div>
      }
      code={code}
      props={[
        { name: "children", type: "ReactNode", description: "Child components that will be wrapped by the boundary." },
        { name: "fallback", type: "ReactNode", description: "Custom error UI. If not provided, uses the default fallback with icon and retry button." },
        { name: "onReset", type: "() => void", description: "Callback executed when clicking 'Try Again'. Useful for clearing state." },
      ]}
      examples={[
        {
          title: "Custom Fallback",
          description: "ErrorBoundary with custom error UI.",
          preview: (
            <div className="w-full p-4 border rounded-lg">
              <div className="text-center py-8 space-y-2">
                <p className="text-sm text-muted-foreground">The custom fallback replaces the default ErrorBoundary UI.</p>
              </div>
            </div>
          ),
          code: `<ErrorBoundary
  fallback={
    <div className="text-center py-8">
      <h3>An unexpected error occurred</h3>
      <p>Contact support if the problem persists.</p>
    </div>
  }
  onReset={() => window.location.reload()}
>
  <MyComponent />
</ErrorBoundary>`,
        },
        {
          title: "With onReset Callback",
          description: "Clears external state on retry.",
          preview: (
            <div className="w-full p-4 border rounded-lg">
              <div className="text-center py-8 space-y-2">
                <p className="text-sm text-muted-foreground">onReset fires when pressing "Try Again" to clear corrupted state.</p>
              </div>
            </div>
          ),
          code: `const [data, setData] = useState(null);

<ErrorBoundary onReset={() => setData(null)}>
  <DataVisualization data={data} />
</ErrorBoundary>`,
        },
      ]}
    />
  );
}