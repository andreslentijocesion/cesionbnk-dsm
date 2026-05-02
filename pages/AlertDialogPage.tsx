import { ComponentShowcase } from "../components/ui/componentshowcase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alertdialog";
import { Button } from "../components/ui/button";
import { AlertTriangle, Trash2, LogOut, Info } from "lucide-react";

const code = `import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alertdialog";
import { Button } from "@/components/ui/button";

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

export function AlertDialogPage() {
  return (
    <ComponentShowcase
      title="Alert Dialog"
      description="Modal dialog for important interruptions that require user confirmation. Built on Radix UI with focus trap, escape key, ARIA roles, and focus restoration. Use for destructive actions or irreversible critical decisions."
      category="Feedback"
      atomicLevel="Molecule"
      preview={
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="size-4 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Yes, delete account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
      code={code}
      props={[
        { name: "AlertDialog", type: "Component", description: "Main dialog container" },
        { name: "AlertDialogTrigger", type: "Component", description: "Button that opens the dialog (use asChild)" },
        { name: "AlertDialogContent", type: "Component", description: "Modal content with overlay" },
        { name: "AlertDialogHeader", type: "Component", description: "Container for title and description" },
        { name: "AlertDialogTitle", type: "Component", description: "Alert dialog title" },
        { name: "AlertDialogDescription", type: "Component", description: "Descriptive text for the dialog" },
        { name: "AlertDialogFooter", type: "Component", description: "Container for action buttons" },
        { name: "AlertDialogAction", type: "Component", description: "Confirmatory action button" },
        { name: "AlertDialogCancel", type: "Component", description: "Cancel / close button" },
      ]}
      examples={[
        {
          title: "Warning",
          description: "Alert dialog with warning tone for unsaved changes.",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <AlertTriangle className="size-4 mr-2" />
                  View Warning
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="size-5 text-yellow-600" />
                    Unsaved Changes
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. If you continue, you will lose all changes
                    made to this document.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue without saving</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">View Warning</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
      <AlertDialogDescription>
        If you continue, you will lose all changes.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: "Log Out",
          description: "Log out confirmation.",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <LogOut className="size-4 mr-2" />
                  Log Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to log in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Log Out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Log Out</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Log out?</AlertDialogTitle>
      <AlertDialogDescription>...</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Log Out</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
        {
          title: "Information",
          description: "Informational alert dialog for updates.",
          preview: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Info className="size-4 mr-2" />
                  View Information
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Info className="size-5 text-info-on-subtle" />
                    Update Available
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    A new version is available with performance improvements and
                    bug fixes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Later</AlertDialogCancel>
                  <AlertDialogAction>Update Now</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
          code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>View Information</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Update Available</AlertDialogTitle>
      <AlertDialogDescription>...</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Later</AlertDialogCancel>
      <AlertDialogAction>Update</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
        },
      ]}
    />
  );
}