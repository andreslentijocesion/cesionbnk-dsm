import { Skeleton } from "./skeleton";
import { Card, CardContent, CardHeader } from "./card";

/**
 * SKELETON VARIANTS
 * Variantes predefinidas de skeleton loaders para casos comunes
 */

// ============================================
// TABLE SKELETON
// ============================================
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export function SkeletonTable({ 
  rows = 5, 
  columns = 4, 
  showHeader = true 
}: SkeletonTableProps) {
  return (
    <div className="w-full space-y-3">
      {showHeader && (
        <div className="flex gap-4 border-b pb-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-4 flex-1" />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4 py-3 border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`cell-${rowIndex}-${colIndex}`} 
              className="h-4 flex-1" 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================
// CARD SKELETON
// ============================================
interface SkeletonCardProps {
  hasImage?: boolean;
  lines?: number;
}

export function SkeletonCard({ hasImage = false, lines = 3 }: SkeletonCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        {hasImage && <Skeleton className="h-48 w-full rounded-md" />}
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-4 w-full" 
            style={{ width: i === lines - 1 ? "60%" : "100%" }} 
          />
        ))}
      </CardContent>
    </Card>
  );
}

// ============================================
// CARD GRID SKELETON
// ============================================
interface SkeletonCardGridProps {
  count?: number;
  columns?: number;
}

export function SkeletonCardGrid({ count = 6, columns = 3 }: SkeletonCardGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns as keyof typeof gridCols] || gridCols[3]}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ============================================
// FORM SKELETON
// ============================================
interface SkeletonFormProps {
  fields?: number;
  hasSubmitButton?: boolean;
}

export function SkeletonForm({ fields = 4, hasSubmitButton = true }: SkeletonFormProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      {hasSubmitButton && (
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      )}
    </div>
  );
}

// ============================================
// LIST SKELETON
// ============================================
interface SkeletonListProps {
  items?: number;
  variant?: "simple" | "detailed";
}

export function SkeletonList({ items = 5, variant = "simple" }: SkeletonListProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            {variant === "detailed" && <Skeleton className="h-3 w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// DASHBOARD SKELETON
// ============================================
export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <SkeletonTable rows={5} columns={5} />
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// KPI CARD SKELETON
// ============================================
export function SkeletonKpiCard() {
  return (
    <Card className="h-[103px]">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-7 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-3 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================
// KPI CARD GROUP SKELETON
// ============================================
interface SkeletonKpiCardGroupProps {
  count?: number;
}

export function SkeletonKpiCardGroup({ count = 4 }: SkeletonKpiCardGroupProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonKpiCard key={i} />
      ))}
    </div>
  );
}

// ============================================
// PROFILE SKELETON
// ============================================
export function SkeletonProfile() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <SkeletonForm fields={6} />
    </div>
  );
}
