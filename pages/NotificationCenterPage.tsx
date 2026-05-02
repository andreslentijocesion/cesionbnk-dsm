import { ComponentShowcase } from "../components/ui/componentshowcase"
import { NotificationCenter } from "../components/patterns/notification-center"

const notificationCenterCode = `import { NotificationCenter } from "@/components/patterns/notificationcenter"

export function NotificationCenterDemo() {
  return (
    <div className="flex justify-center p-8">
      <NotificationCenter />
    </div>
  );
}`;

export function NotificationCenterPage() {
  return (
    <ComponentShowcase
      title="Notification Center"
      description="Centralized notification center with filtering system, read marking, and real-time actions."
      category="Business Pattern"
      preview={
        <div className="w-full max-w-4xl border rounded-lg p-6 bg-card min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
             <p className="text-sm text-muted-foreground mb-4">Click the bell to view notifications</p>
             <NotificationCenter />
          </div>
        </div>
      }
      code={notificationCenterCode}
    />
  );
}