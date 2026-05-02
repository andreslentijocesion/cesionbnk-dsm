import { useState } from "react";
import { StepIndicator, Step } from "../components/advanced/step-indicator";
import { FormBuilder } from "../components/advanced/form-builder";
import { ConditionalForm } from "../components/advanced/conditional-form";
import { MultiColumnForm } from "../components/advanced/multi-column-form";
import { User, Building2, CreditCard, CheckCircle } from "lucide-react";
import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

/**
 * AdvancedFormsPage - Showcase of advanced form components
 * 
 * Implemented components:
 * 1. Step Indicator - Multi-step progress indicators
 * 2. Form Builder - Visual drag & drop builder
 * 3. Conditional Form - Forms with conditional logic
 * 4. Multi-Column Form - Forms with responsive column layouts
 * 
 * Location: /pages/AdvancedFormsPage.tsx
 * Status: ✅ Completed - 4/4 medium priority components
 */

const demoSteps: Step[] = [
  { id: "1", title: "Account", description: "Create your account", icon: <User className="size-5" /> },
  { id: "2", title: "Company", description: "Company details", icon: <Building2 className="size-5" /> },
  { id: "3", title: "Payment", description: "Billing information", icon: <CreditCard className="size-5" /> },
  { id: "4", title: "Confirm", description: "Review and submit", icon: <CheckCircle className="size-5" /> },
];

const verticalSteps: Step[] = [
  { id: "1", title: "Personal Information", description: "Tell us about yourself" },
  { id: "2", title: "Work Experience", description: "Your professional background" },
  { id: "3", title: "Education", description: "Academic qualifications" },
  { id: "4", title: "Skills", description: "Technical and soft skills" },
  { id: "5", title: "Review", description: "Verify your information" },
];

function AdvancedFormsDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentVerticalStep, setCurrentVerticalStep] = useState(2);

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="font-bold">Advanced Forms</h1>
          <Badge variant="info">
            MEDIUM PRIORITY
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Advanced components for complex forms: step indicators, form builders,
          conditional logic and multi-column layouts. Built with shadcn/ui and react-dnd.
        </p>
      </div>

      <Separator />

      {/* 1. Step Indicator */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Step Indicator</h2>
            <Badge variant="outline">Progress Tracking</Badge>
          </div>
          <p className="text-muted-foreground">
            Reusable progress indicators for wizards and multi-step processes.
            Supports horizontal/vertical orientation and multiple variants.
          </p>
        </div>

        <Tabs defaultValue="horizontal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
            <TabsTrigger value="vertical">Vertical</TabsTrigger>
            <TabsTrigger value="compact">Compact</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
          </TabsList>

          <TabsContent value="horizontal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Horizontal Step Indicator</CardTitle>
                <CardDescription>
                  Default variant with labels and progress bar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <StepIndicator
                  steps={demoSteps}
                  currentStep={currentStep}
                  orientation="horizontal"
                  showProgress={true}
                  showLabels={true}
                  clickable={true}
                  onStepClick={(step) => setCurrentStep(step)}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === demoSteps.length - 1}
                  >
                    {currentStep === demoSteps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vertical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vertical Step Indicator</CardTitle>
                <CardDescription>
                  Best for sidebars and mobile layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <StepIndicator
                    steps={verticalSteps}
                    currentStep={currentVerticalStep}
                    orientation="vertical"
                    showLabels={true}
                    clickable={true}
                    onStepClick={(step) => setCurrentVerticalStep(step)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compact Step Indicator</CardTitle>
                <CardDescription>
                  Minimal space with just circles and connectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StepIndicator
                  steps={demoSteps}
                  currentStep={currentStep}
                  variant="compact"
                  showProgress={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minimal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Minimal Step Indicator</CardTitle>
                <CardDescription>
                  Just a progress bar with step count
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StepIndicator
                  steps={demoSteps}
                  currentStep={currentStep}
                  variant="minimal"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Horizontal and vertical orientation</li>
            <li>3 variants: default, compact, minimal</li>
            <li>States: pending, active, completed</li>
            <li>Clickable steps for navigation</li>
            <li>Integrated progress bar</li>
            <li>Customizable icons per step</li>
            <li>Fully responsive</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 2. Form Builder */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Form Builder</h2>
            <Badge variant="outline">Drag & Drop</Badge>
          </div>
          <p className="text-muted-foreground">
            Visual form builder with drag & drop. Drag fields from the palette,
            reorder on the canvas, and generate React code automatically.
          </p>
        </div>

        <FormBuilder />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Drag & drop fields from palette</li>
            <li>7 field types: text, email, phone, date, textarea, checkbox, select</li>
            <li>Field reordering with drag & drop</li>
            <li>Live preview of the form</li>
            <li>React code generation</li>
            <li>Individual field deletion</li>
            <li>Clear all to reset</li>
            <li>Built with react-dnd</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 3. Conditional Form */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Conditional Logic Form</h2>
            <Badge variant="outline">Smart Forms</Badge>
          </div>
          <p className="text-muted-foreground">
            Smart form with conditional logic. Fields appear or disappear
            dynamically based on user responses in real time.
          </p>
        </div>

        <ConditionalForm />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Fields that appear/disappear dynamically</li>
            <li>Logic based on user selection (Individual vs Business)</li>
            <li>Nested sub-conditions (Startup vs Enterprise)</li>
            <li>Conditional validations</li>
            <li>Visually differentiated sections with colors</li>
            <li>Submission state with animation</li>
            <li>Automatic reset after submit</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 4. Multi-Column Form */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Multi-Column Form</h2>
            <Badge variant="outline">Responsive Layout</Badge>
          </div>
          <p className="text-muted-foreground">
            Form with multi-column design that adapts to screen size.
            Optimizes space and improves UX for extensive forms.
          </p>
        </div>

        <MultiColumnForm />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Responsive grid: 1 column (mobile) → 2-3 columns (desktop)</li>
            <li>4 organized sections: Personal, Address, Company, Additional</li>
            <li>Visual separators between sections</li>
            <li>Mix of 2-col and 3-col grids depending on context</li>
            <li>Strategic full-width fields (street, textarea)</li>
            <li>Complete form state management</li>
            <li>Clear form functionality</li>
            <li>Success state with animation</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Implementation Notes */}
      <section className="bg-card rounded-lg p-6 space-y-4 border border-border">
        <h3 className="font-semibold">📋 Implementation Notes</h3>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Location:</strong> All components are in{" "}
            <code className="bg-muted px-2 py-1 rounded">/components/advanced/</code>
          </p>
          <p>
            <strong>Dependencies:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
            <li>
              <code className="bg-muted px-2 py-1 rounded">react-dnd</code> and{" "}
              <code className="bg-muted px-2 py-1 rounded">react-dnd-html5-backend</code> for Form Builder
            </li>
            <li>shadcn/ui components (Input, Select, Button, Card, etc.)</li>
            <li>lucide-react for icons</li>
          </ul>
          <p>
            <strong>Required Imports:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ StepIndicator }"} from "./components/advanced/stepindicator"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ FormBuilder }"} from "./components/advanced/formbuilder"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ ConditionalForm }"} from "./components/advanced/conditionalform"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ MultiColumnForm }"} from "./components/advanced/multicolumnform"
              </code>
            </li>
          </ul>
          <p>
            <strong>Recommended Usage:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
            <li><strong>Step Indicator:</strong> Onboarding, checkout flows, multi-step wizards</li>
            <li><strong>Form Builder:</strong> Admin panels, survey creators, form management tools</li>
            <li><strong>Conditional Form:</strong> Applications, surveys, smart questionnaires</li>
            <li><strong>Multi-Column Form:</strong> Registration, profiles, long forms</li>
          </ul>
          <p>
            <strong>Compatibility:</strong> All components are compatible with the
            Theme Customizer and automatically adapt colors in light/dark mode.
          </p>
          <p>
            <strong>Status:</strong> ✅ Phase 3 completed - 4 advanced form components
            of MEDIUM PRIORITY implemented and documented.
          </p>
        </div>
      </section>
    </div>
  );
}

export function AdvancedFormsPage() {
  return (
    <ComponentShowcase
      title="Advanced Forms"
      description="Showcase of advanced form components: StepIndicator for multi-step progress, FormBuilder for dynamic field generation, ConditionalForm for logic-driven fields, and MultiColumnForm for complex layouts."
      category="Advanced"
      preview={<AdvancedFormsDemo />}
      code={`import { StepIndicator } from "@/components/advanced/stepindicator";
import { FormBuilder } from "@/components/advanced/formbuilder";
import { ConditionalForm } from "@/components/advanced/conditionalform";
import { MultiColumnForm } from "@/components/advanced/multicolumnform";

<StepIndicator steps={steps} currentStep={2} />
<FormBuilder schema={schema} />
<ConditionalForm />
<MultiColumnForm />`}
      props={[
        { name: "(aggregation)", type: "—", description: "Showcases 4 advanced form components." },
      ]}
      examples={[]}
    />
  );
}