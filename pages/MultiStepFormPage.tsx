import { ComponentShowcase } from "../components/ui/componentshowcase";
import { OnboardingWizard } from "../components/patterns/onboarding-wizard";

export function MultiStepFormPage() {
  return (
    <ComponentShowcase
      title="Multi-step Business Form"
      description="Advanced multi-step workflow for business onboarding. Features document upload with extraction simulation, data validation, client management, and legal declarations (SARLAFT/PEP)."
      category="Patterns"
      preview={<OnboardingWizard />}
      code={`import { OnboardingWizard } from "@/components/patterns/onboarding-wizard";

<OnboardingWizard />`}
    />
  );
}
