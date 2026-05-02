import { ComponentShowcase } from "../components/ui/componentshowcase";
import { EmptyState } from "../components/ui/emptystate";
import { FileSearch, Inbox, Search } from "lucide-react";

const code = `import { EmptyState } from "@/components/ui/emptystate";
import { FileSearch } from "lucide-react";

export function EmptyStateDemo() {
  return (
    <EmptyState 
      title="No documents"
      description="Upload your first document to start the assignment process."
      action={{ label: "Upload Document", onClick: () => {} }}
      icon={FileSearch}
    />
  );
}`;

export function EmptyStatePage() {
  return (
    <ComponentShowcase
      title="Empty State"
      description="Empty state for lists or containers with no data."
      category="UI Pattern"
      preview={
        <EmptyState 
          title="No documents"
          description="Upload your first document to start the assignment process."
          action={{ label: "Upload Document", onClick: () => {} }}
          icon={FileSearch}
        />
      }
      code={code}
      props={[
        { name: "title", type: "string", description: "Main title of the empty state.", required: true },
        { name: "description", type: "string", description: "Descriptive text below the title.", required: true },
        { name: "icon", type: "React.ElementType", default: "FileQuestion", description: "Lucide icon displayed centered above the title." },
        { name: "action", type: "{ label: string; onClick: () => void }", description: "Primary action button (e.g. 'Create new', 'Upload file')." },
        { name: "children", type: "ReactNode", description: "Additional content below the description and action." },
        { name: "className", type: "string", description: "Additional classes for the root container." },
      ]}
      examples={[
        {
          title: "Without Action",
          description: "Informational empty state without action button.",
          preview: (
            <EmptyState
              title="No results"
              description="No invoices were found matching the selected filters."
              icon={Search}
            />
          ),
          code: `<EmptyState
  title="No results"
  description="No invoices were found matching the selected filters."
  icon={Search}
/>`,
        },
        {
          title: "Empty Inbox",
          description: "Variant for inbox or notification sections.",
          preview: (
            <EmptyState
              title="Empty inbox"
              description="You have no new notifications at this time."
              icon={Inbox}
              action={{ label: "Configure alerts", onClick: () => {} }}
            />
          ),
          code: `<EmptyState
  title="Empty inbox"
  description="You have no new notifications at this time."
  icon={Inbox}
  action={{ label: "Configure alerts", onClick: () => {} }}
/>`,
        },
      ]}
    />
  );
}