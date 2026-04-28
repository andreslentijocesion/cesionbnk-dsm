import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Skeleton } from "../components/ui/Skeleton";
import { 
  SkeletonTable, 
  SkeletonCardGrid, 
  SkeletonForm,
  SkeletonKpiCardGroup,
  SkeletonProfile
} from "../components/ui/SkeletonVariants";

export function SkeletonPage() {
  return (
    <ComponentShowcase
      title="Skeleton"
      description="Use Skeletons to create perceived performance. They act as placeholders for content that is currently loading."
      category="Feedback"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="w-full">
          <SkeletonCardGrid count={3} columns={3} />
        </div>
      }
      
      // Main Code
      code={`import { Skeleton } from "@/components/ui/Skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "className",
          type: "string",
          description: "Classes for sizing and shaping the skeleton.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Profile",
          description: "Loading state for settings or profile pages.",
          preview: (
            <SkeletonProfile />
          ),
          code: `<div className="flex items-center space-x-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`
        },
        {
          title: "Form",
          description: "For forms with dynamic field loading.",
          preview: (
            <SkeletonForm fields={3} />
          ),
          code: `<div className="space-y-4">
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full" />
  </div>
  {/* ... repeat */}
</div>`
        },
        {
          title: "KPIs",
          description: "Top-level dashboard metrics.",
          preview: (
            <SkeletonKpiCardGroup count={4} />
          ),
          code: `<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* ... cards */}
  <Skeleton className="h-[120px] rounded-xl" />
</div>`
        },
        {
          title: "Data Table",
          description: "Table rows with headers.",
          preview: (
            <SkeletonTable rows={4} columns={5} />
          ),
          code: `<div className="space-y-4">
  <div className="flex gap-4">
    {/* headers */}
    <Skeleton className="h-4 w-[100px]" />
  </div>
  {/* rows */}
  <Skeleton className="h-12 w-full" />
</div>`
        },
        {
          title: "Primitives",
          description: "Building blocks for custom skeletons.",
          preview: (
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Text Lines</h4>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Circular (Avatar)</h4>
                <Skeleton className="size-12 rounded-full" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Rectangular (Image/Box)</h4>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              </div>
            </div>
          ),
          code: `<Skeleton className="h-4 w-[250px]" />
<Skeleton className="size-12 rounded-full" />
<Skeleton className="h-[125px] w-[250px] rounded-xl" />`
        }
      ]}
    />
  );
}