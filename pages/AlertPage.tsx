import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import {
  AlertCircle, CheckCircle, Info, AlertTriangle,
  Terminal, Zap, Lock, Mail, Bell, ShieldCheck,
  FileWarning, ServerCrash, Rocket,
} from "lucide-react";

export function AlertPage() {
  return (
    <ComponentShowcase
      title="Alert"
      description="Displays a callout for user attention. Includes native semantic variants: default, destructive, success, warning, and info."
      category="Feedback"
      atomicLevel="Atom"

      // Main Preview
      preview={
        <div className="flex flex-col gap-4 max-w-2xl">
          <Alert>
            <Terminal className="size-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>
              Neutral alert for general system information.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="size-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              The operation was completed successfully.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>
              An error occurred while processing the request.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle className="size-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action cannot be undone. Proceed with caution.
            </AlertDescription>
          </Alert>

          <Alert variant="info">
            <Info className="size-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              New features available in your dashboard.
            </AlertDescription>
          </Alert>
        </div>
      }

      // Main Code
      code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, AlertTriangle, Info, Terminal } from "lucide-react";

export function AlertSemanticDemo() {
  return (
    <div className="grid gap-4">
      <Alert>
        <Terminal className="size-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>General information.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error processing request.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="size-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Proceed with caution.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <Info className="size-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>New features available.</AlertDescription>
      </Alert>
    </div>
  );
}`}

      // Props Documentation
      props={[
        {
          name: "variant",
          type: '"default" | "destructive" | "success" | "warning" | "info"',
          default: '"default"',
          description: "Visual style of the alert. Each variant uses explicit colors compatible with light/dark mode.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the alert",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Alert content (AlertTitle, AlertDescription, icons, etc.)",
          required: true,
        },
      ]}

      // Examples
      examples={[
        {
          title: "All Variants",
          description: "The 5 native variants of the Alert component, no manual className needed.",
          preview: (
            <div className="grid gap-4 max-w-2xl">
              <Alert>
                <Terminal className="size-4" />
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>
                  This is a default informational alert.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Destructive</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info className="size-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  New features have been added to your dashboard.
                </AlertDescription>
              </Alert>
            </div>
          ),
          code: `<Alert variant="success">
  <CheckCircle className="size-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Saved successfully.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="size-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Session expired.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTriangle className="size-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Cannot be undone.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info className="size-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>New features available.</AlertDescription>
</Alert>`,
        },
        {
          title: "Business Scenarios",
          description: "Semantic alerts in real-world financial module contexts.",
          preview: (
            <div className="grid gap-4 max-w-2xl">
              <Alert variant="success">
                <ShieldCheck className="size-4" />
                <AlertTitle>Operation Approved</AlertTitle>
                <AlertDescription>
                  Operation OP-2024-001 for $45,200,000 was approved by the Risk Committee and is ready for assignment.
                </AlertDescription>
              </Alert>

              <Alert variant="warning">
                <FileWarning className="size-4" />
                <AlertTitle>Pending Documents</AlertTitle>
                <AlertDescription>
                  2 documents remain unverified in operation OP-2024-003. Assignment cannot proceed until validation is complete.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <ServerCrash className="size-4" />
                <AlertTitle>Tax Service Connection Error</AlertTitle>
                <AlertDescription>
                  Could not verify invoices against the Tax Service. Please retry in a few minutes.
                </AlertDescription>
              </Alert>

              <Alert variant="info">
                <Rocket className="size-4" />
                <AlertTitle>New Feature</AlertTitle>
                <AlertDescription>
                  You can now pre-evaluate operations with the automatic scoring engine. Access it from the evaluation panel.
                </AlertDescription>
              </Alert>
            </div>
          ),
          code: `<Alert variant="success">
  <ShieldCheck className="size-4" />
  <AlertTitle>Operation Approved</AlertTitle>
  <AlertDescription>
    OP-2024-001 approved by Risk Committee.
  </AlertDescription>
</Alert>

<Alert variant="warning">
  <FileWarning className="size-4" />
  <AlertTitle>Pending Documents</AlertTitle>
  <AlertDescription>
    2 documents remain unverified.
  </AlertDescription>
</Alert>`,
        },
        {
          title: "With Actions",
          description: "Alert with action buttons using the new semantic Button variants.",
          preview: (
            <div className="grid gap-4 max-w-2xl">
              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertTitle>Session Expiring</AlertTitle>
                <AlertDescription className="mt-1">
                  Your session will expire in 5 minutes. Would you like to extend it?
                </AlertDescription>
                <div className="flex gap-2 mt-3 col-start-2">
                  <Button size="sm" variant="warning">Extend Session</Button>
                  <Button size="sm" variant="warning-outline">Log Out</Button>
                </div>
              </Alert>

              <Alert variant="info">
                <Zap className="size-4" />
                <AlertTitle>Update Available</AlertTitle>
                <AlertDescription className="mt-1">
                  A new version of the platform is available.
                </AlertDescription>
                <div className="flex gap-2 mt-3 col-start-2">
                  <Button size="sm" variant="info">Update Now</Button>
                  <Button size="sm" variant="info-outline">Remind Later</Button>
                </div>
              </Alert>
            </div>
          ),
          code: `<Alert variant="warning">
  <AlertTriangle className="size-4" />
  <AlertTitle>Session Expiring</AlertTitle>
  <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
  <div className="flex gap-2 mt-3 col-start-2">
    <Button size="sm" variant="warning">Extend</Button>
    <Button size="sm" variant="warning-outline">Log Out</Button>
  </div>
</Alert>`,
        },
        {
          title: "Without Icon",
          description: "Alert without icon, text only",
          preview: (
            <div className="grid gap-3 max-w-2xl">
              <Alert variant="info">
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  Alerts without icons also work correctly with all semantic variants.
                </AlertDescription>
              </Alert>
            </div>
          ),
          code: `<Alert variant="info">
  <AlertTitle>Important Note</AlertTitle>
  <AlertDescription>
    Works without icons with any variant.
  </AlertDescription>
</Alert>`,
        },
        {
          title: "Compact Alerts",
          description: "Compact alerts without title, description only.",
          preview: (
            <div className="grid gap-3 max-w-2xl">
              <Alert variant="success">
                <CheckCircle className="size-4" />
                <AlertDescription>
                  Changes saved successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertDescription>
                  Scheduled maintenance at 11:00 PM.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <Lock className="size-4" />
                <AlertDescription>
                  Account locked due to suspicious activity.
                </AlertDescription>
              </Alert>
              <Alert variant="info">
                <Mail className="size-4" />
                <AlertDescription>
                  You have 3 unread messages in your inbox.
                </AlertDescription>
              </Alert>
            </div>
          ),
          code: `<Alert variant="success">
  <CheckCircle className="size-4" />
  <AlertDescription>Changes saved.</AlertDescription>
</Alert>`,
        },
        {
          title: "Notification Style (Border Left)",
          description: "Alerts with colored left border for notification style.",
          preview: (
            <div className="grid gap-4 max-w-2xl">
              <Alert variant="info" className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
                <Bell className="size-4" />
                <AlertTitle>New Message</AlertTitle>
                <AlertDescription>
                  You have 3 unread messages in your inbox.
                </AlertDescription>
              </Alert>

              <Alert variant="success" className="border-l-4 border-l-green-500 dark:border-l-green-400">
                <CheckCircle className="size-4" />
                <AlertTitle>Deploy Successful</AlertTitle>
                <AlertDescription>
                  Your deployment has completed and is now in production.
                </AlertDescription>
              </Alert>

              <Alert variant="warning" className="border-l-4 border-l-amber-500 dark:border-l-amber-400">
                <AlertTriangle className="size-4" />
                <AlertTitle>High Usage</AlertTitle>
                <AlertDescription>
                  API usage is at 85% of your monthly quota.
                </AlertDescription>
              </Alert>
            </div>
          ),
          code: `<Alert variant="info" className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
  <Bell className="size-4" />
  <AlertTitle>New Message</AlertTitle>
  <AlertDescription>3 unread messages.</AlertDescription>
</Alert>`,
        },
      ]}
    />
  );
}