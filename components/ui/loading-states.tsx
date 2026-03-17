import { Loader2 } from "lucide-react";
import { Skeleton } from "./skeleton";
import { cn } from "./utils";

// 1. Simple Spinner
export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)} {...props}>
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

// 2. Full Page Loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading application...
        </p>
      </div>
    </div>
  );
}

// 3. Card Skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

// 4. Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      <div className="h-12 border-b bg-muted/50 px-4 flex items-center">
         <div className="flex w-full gap-4">
             <Skeleton className="h-4 w-[100px]" />
             <Skeleton className="h-4 w-[150px]" />
             <Skeleton className="h-4 w-[80px] ml-auto" />
         </div>
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Button Loader
export function ButtonLoader() {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
}

// 6. Dot Loader
export function DotLoader() {
  return (
    <div className="flex space-x-1.5 justify-center py-4">
      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
    </div>
  );
}