import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive-subtle p-8 text-center dark:border-destructive/20 dark:bg-destructive/10">
          <div className="mb-4 rounded-full bg-destructive/10 p-3 dark:bg-destructive/20">
            <AlertTriangle className="size-10 text-destructive dark:text-destructive/80" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-destructive-on-subtle dark:text-destructive/80">
            Something went wrong
          </h2>
          <p className="mb-6 max-w-md text-sm text-destructive-on-subtle/80 dark:text-destructive/70">
            {this.state.error?.message || "An unexpected error occurred while loading this component."}
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-destructive/30 bg-card hover:bg-destructive-subtle hover:text-destructive-on-subtle"
            >
              Reload page
            </Button>
            <Button
              variant="destructive"
              onClick={this.handleReset}
            >
              <RefreshCw className="mr-2 size-4" />
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}