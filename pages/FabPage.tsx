import { ComponentShowcase } from "../components/ui/component-showcase";
import { FloatingActionButton } from "../components/ui/floating-action-button";
import { Plus, MessageSquare, Upload } from "lucide-react";

const code = `import { FloatingActionButton } from "@/components/ui/floating-action-button";

export function FabDemo() {
  return <FloatingActionButton position="bottom-right" />;
}`;

export function FabPage() {
  return (
    <ComponentShowcase
      title="Floating Action Button"
      description="Floating primary action button."
      category="UI Pattern"
      preview={
        <div className="h-[200px] w-full relative bg-muted rounded-md overflow-hidden border">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            The button floats in the corner
          </div>
          <FloatingActionButton position="bottom-right" className="absolute" />
        </div>
      }
      code={code}
      props={[
        { name: "icon", type: "React.ElementType", default: "Plus", description: "Lucide icon displayed in the button." },
        { name: "label", type: "string", description: "Tooltip text on hover over the button." },
        { name: "position", type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"', default: '"bottom-right"', description: "Corner where the floating button is positioned." },
        { name: "className", type: "string", description: "Additional classes. Supports all Button props (variant, size, onClick, etc.)." },
      ]}
      examples={[
        {
          title: "Bottom-left Position",
          description: "FAB with custom icon in the bottom-left corner.",
          preview: (
            <div className="h-[200px] w-full relative bg-muted rounded-md overflow-hidden border">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Bottom-left corner
              </div>
              <FloatingActionButton position="bottom-left" icon={MessageSquare} className="absolute" />
            </div>
          ),
          code: `<FloatingActionButton 
  position="bottom-left" 
  icon={MessageSquare}
  label="New message"
  onClick={() => openChat()}
/>`,
        },
        {
          title: "Top-right Position",
          description: "FAB with upload icon in the top-right corner.",
          preview: (
            <div className="h-[200px] w-full relative bg-muted rounded-md overflow-hidden border">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Top-right corner
              </div>
              <FloatingActionButton position="top-right" icon={Upload} className="absolute" />
            </div>
          ),
          code: `<FloatingActionButton 
  position="top-right" 
  icon={Upload}
  label="Upload file"
  onClick={() => openUploader()}
/>`,
        },
      ]}
    />
  );
}