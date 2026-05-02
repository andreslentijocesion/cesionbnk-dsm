import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export function ToastPage() {
  return (
    <ComponentShowcase
      title="Toast"
      description="Temporary notification message. Import toast from sonner and use it to display different types of notifications."
      category="Feedback"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      }
      
      // Main Code
      code={`import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}`}
      
      // Props Documentation
      props={[
        { name: "message", type: "string | ReactNode", description: "Primary toast text. First argument of toast().", required: true },
        { name: "description", type: "string | ReactNode", description: "Secondary text below the message." },
        { name: "action", type: "{ label: string; onClick: () => void }", description: "Action button inside the toast." },
        { name: "duration", type: "number", default: "4000", description: "Duration in ms before auto-close. Infinity for persistent." },
        { name: "position", type: "\"top-left\" | \"top-right\" | \"bottom-left\" | \"bottom-right\" | ...", description: "Toast position on screen." },
        { name: "dismissible", type: "boolean", default: "true", description: "Allows manual toast dismissal." },
        { name: "id", type: "string | number", description: "Unique ID to update or dismiss a specific toast." },
      ]}
      
      // Examples
      examples={[
        {
          title: "Success",
          description: "Show a success message.",
          preview: (
            <Button
              variant="outline"
              onClick={() => toast.success("Event has been created")}
            >
              Show Success
            </Button>
          ),
          code: `toast.success("Event has been created")`
        },
        {
          title: "Error",
          description: "Show an error message.",
          preview: (
            <Button
              variant="outline"
              onClick={() => toast.error("Event has not been created")}
            >
              Show Error
            </Button>
          ),
          code: `toast.error("Event has not been created")`
        },
        {
          title: "Action",
          description: "Show a toast with an action button.",
          preview: (
            <Button
              variant="outline"
              onClick={() =>
                toast("Event has been created", {
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              }
            >
              Show Action
            </Button>
          ),
          code: `toast("Event has been created", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})`
        }
      ]}
    />
  );
}