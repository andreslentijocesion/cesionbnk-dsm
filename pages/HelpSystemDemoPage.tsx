import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Card } from "../components/ui/Card";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { ContextualHelp } from "../components/help/ContextualHelp";
import { ProductTour } from "../components/help/ProductTour";
import { vinculacionTourSteps } from "../components/help/tourSteps";

function HelpSystemDemo() {
  const [companyName, setCompanyName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-6">
      {/* Product Tour */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium mb-1">Product Tour</h3>
            <p className="text-sm text-muted-foreground">Step-by-step guided walkthrough</p>
          </div>
          <ProductTour
            steps={vinculacionTourSteps}
            tourId="demo-tour"
            showButton={true}
            buttonText="Start Demo Tour"
            buttonVariant="default"
          />
        </div>
      </Card>

      {/* Contextual Help on Form Fields */}
      <Card className="p-6 space-y-5">
        <div>
          <h3 className="font-medium mb-1">Contextual Help</h3>
          <p className="text-sm text-muted-foreground">Tooltip + Popover modes on form fields</p>
        </div>

        <div id="tour-step-nit">
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="tax-id">Company Tax ID (NIT)</Label>
            <ContextualHelp
              quickHelp="Enter without verification digit"
              detailedHelp="The Tax Identification Number (NIT) is a unique identifier assigned to your company by the tax authority. Enter only the numbers without the verification digit. Example: If your NIT is 900123456-7, enter only 900123456."
              title="About Tax ID (NIT)"
            />
          </div>
          <Input id="tax-id" placeholder="900123456" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">9 digits without verification digit</p>
        </div>

        <div id="tour-step-company-name">
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="company-name">Company Name</Label>
            <ContextualHelp quickHelp="Enter the legal name exactly as it appears on official documents" tooltipOnly={true} />
          </div>
          <Input id="company-name" placeholder="Acme Corporation S.A.S." value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="email">Contact Email</Label>
            <ContextualHelp
              detailedHelp="This email will be used for all official communications regarding your operations. Make sure it's an email you check regularly."
              title="Contact Email"
              popoverOnly={true}
            />
          </div>
          <Input id="email" type="email" placeholder="contact@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </Card>

      {/* Help Center Info */}
      <Card className="p-6">
        <h3 className="font-medium mb-3">Help Center</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">FAQs</h4>
            <p className="text-xs text-muted-foreground">Searchable frequently asked questions</p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Guides</h4>
            <p className="text-xs text-muted-foreground">Step-by-step documentation articles</p>
          </div>
          <div className="border rounded-lg p-3">
            <h4 className="font-medium text-sm mb-1">Videos</h4>
            <p className="text-xs text-muted-foreground">Video tutorials for visual learners</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function HelpSystemDemoPage() {
  return (
    <ComponentShowcase
      title="Help System"
      description="Three-layer help system: Contextual Help (inline tooltips + popovers on form fields), Product Tour (guided step-by-step walkthrough with driver.js), and Help Center (comprehensive documentation panel with FAQs, guides, and videos). Reduces support tickets, improves UX, and accelerates onboarding."
      category="Patterns"
      preview={<HelpSystemDemo />}
      code={`import { ContextualHelp } from "@/components/help/ContextualHelp";
import { ProductTour } from "@/components/help/ProductTour";
import { vinculacionTourSteps } from "@/components/help/tourSteps";

// Contextual Help (tooltip + popover)
<ContextualHelp
  quickHelp="Brief hint on hover"
  detailedHelp="Detailed explanation..."
  title="Help Title"
/>

// Tooltip-only mode
<ContextualHelp quickHelp="Quick hint" tooltipOnly />

// Popover-only mode
<ContextualHelp detailedHelp="Details..." popoverOnly />

// Product Tour
<ProductTour
  steps={vinculacionTourSteps}
  tourId="my-tour"
  showButton={true}
  buttonText="Start Tour"
/>`}
      props={[
        { name: "quickHelp", type: "string", description: "Text shown in tooltip on hover (ContextualHelp)." },
        { name: "detailedHelp", type: "string", description: "Longer text shown in popover on click (ContextualHelp)." },
        { name: "title", type: "string", description: "Title of the popover (ContextualHelp)." },
        { name: "tooltipOnly", type: "boolean", default: "false", description: "Only show tooltip, no popover icon." },
        { name: "popoverOnly", type: "boolean", default: "false", description: "Only show popover, no tooltip." },
        { name: "steps", type: "TourStep[]", description: "Array of tour steps with element selectors (ProductTour).", required: true },
        { name: "tourId", type: "string", description: "Unique ID for tracking tour completion (ProductTour).", required: true },
        { name: "showButton", type: "boolean", default: "false", description: "Show a button to restart the tour." },
      ]}
      examples={[
        {
          title: "Integration Pattern",
          description: "How to add contextual help to any form field.",
          preview: (
            <div className="space-y-3 max-w-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label>Example Field</Label>
                  <ContextualHelp quickHelp="Hover for quick help" detailedHelp="Click for detailed explanation with more context about this field." title="Field Help" />
                </div>
                <Input placeholder="Type something..." />
              </div>
            </div>
          ),
          code: `<Label>Field</Label>
<ContextualHelp quickHelp="..." detailedHelp="..." title="..." />
<Input />`,
        },
      ]}
    />
  );
}