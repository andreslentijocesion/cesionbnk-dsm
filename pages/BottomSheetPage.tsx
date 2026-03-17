import { ComponentShowcase } from "../components/ui/component-showcase";
import { BottomSheet } from "../components/ui/bottom-sheet";
import { Button } from "../components/ui/button";
import { Download, MessageSquare, Share2, Printer, Trash2 } from "lucide-react";

const code = `import { BottomSheet } from "@/components/ui/bottom-sheet";

export function BottomSheetDemo() {
  return (
    <BottomSheet 
      trigger={<Button>Open Sheet</Button>}
      title="Invoice Options"
      description="Select an action for the selected invoice"
    >
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Download className="mr-2 h-4 w-4"/> Download PDF
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <MessageSquare className="mr-2 h-4 w-4"/> Send Comment
        </Button>
      </div>
    </BottomSheet>
  );
}`;

export function BottomSheetPage() {
  return (
    <ComponentShowcase
      title="Bottom Sheet"
      description="Slidable panel from the bottom, ideal for mobile options."
      category="UI Pattern"
      preview={
        <div className="h-[200px] flex items-center justify-center">
          <BottomSheet 
            trigger={<Button>Open Sheet</Button>}
            title="Invoice Options"
            description="Select an action for the selected invoice"
          >
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><Download className="mr-2 h-4 w-4"/> Download PDF</Button>
              <Button variant="outline" className="w-full justify-start"><MessageSquare className="mr-2 h-4 w-4"/> Send Comment</Button>
            </div>
          </BottomSheet>
        </div>
      }
      code={code}
      props={[
        { name: "trigger", type: "ReactNode", description: "Element that opens the bottom sheet on click.", required: true },
        { name: "children", type: "ReactNode", description: "Main content of the panel.", required: true },
        { name: "title", type: "string", description: "Title displayed in the sheet header." },
        { name: "description", type: "string", description: "Descriptive text below the title." },
        { name: "footer", type: "ReactNode", description: "Footer content (action buttons, etc.)." },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when the open state changes." },
      ]}
      examples={[
        {
          title: "With Footer",
          description: "Bottom sheet with action buttons in the footer.",
          preview: (
            <div className="h-[200px] flex items-center justify-center">
              <BottomSheet
                trigger={<Button variant="outline">Document Actions</Button>}
                title="Available Actions"
                description="Select what to do with this document"
                footer={
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">Cancel</Button>
                    <Button className="flex-1">Confirm</Button>
                  </div>
                }
              >
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                  <Button variant="ghost" className="w-full justify-start"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                </div>
              </BottomSheet>
            </div>
          ),
          code: `<BottomSheet
  trigger={<Button variant="outline">Actions</Button>}
  title="Available Actions"
  description="Select what to do with this document"
  footer={
    <div className="flex gap-2 w-full">
      <Button variant="outline" className="flex-1">Cancel</Button>
      <Button className="flex-1">Confirm</Button>
    </div>
  }
>
  <div className="space-y-2">
    <Button variant="ghost" className="w-full justify-start">
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
    <Button variant="ghost" className="w-full justify-start">
      <Printer className="mr-2 h-4 w-4" /> Print
    </Button>
  </div>
</BottomSheet>`,
        },
        {
          title: "Destructive Actions",
          description: "Bottom sheet with highlighted delete option.",
          preview: (
            <div className="h-[200px] flex items-center justify-center">
              <BottomSheet
                trigger={<Button variant="destructive" size="sm">Delete</Button>}
                title="Delete invoice?"
                description="This action cannot be undone"
              >
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Invoice FV-9921 and all its history will be deleted.</p>
                  <Button variant="destructive" className="w-full"><Trash2 className="mr-2 h-4 w-4" /> Confirm Deletion</Button>
                </div>
              </BottomSheet>
            </div>
          ),
          code: `<BottomSheet
  trigger={<Button variant="destructive" size="sm">Delete</Button>}
  title="Delete invoice?"
  description="This action cannot be undone"
>
  <div className="space-y-3">
    <p className="text-sm text-muted-foreground">
      Invoice FV-9921 and all its history will be deleted.
    </p>
    <Button variant="destructive" className="w-full">
      <Trash2 className="mr-2 h-4 w-4" /> Confirm Deletion
    </Button>
  </div>
</BottomSheet>`,
        },
      ]}
    />
  );
}