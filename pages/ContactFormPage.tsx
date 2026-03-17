import { ComponentShowcase } from "../components/ui/component-showcase";
import { ContactForm } from "../components/widgets/contact-form";

const contactFormCode = `import { ContactForm } from "@/components/widgets/contact-form";

export function ContactFormDemo() {
  return <ContactForm />;
}`;

export function ContactFormPage() {
  return (
    <ComponentShowcase
      title="Contact Form"
      description="Professional contact form with validation and states."
      category="Business Component"
      preview={
        <div className="w-full max-w-2xl border rounded-lg p-6 bg-card">
          <ContactForm />
        </div>
      }
      code={contactFormCode}
      props={[
        { name: "onSubmit", type: "(data: ContactFormData) => void", description: "Callback with form data on successful submit." },
        { name: "showCompany", type: "boolean", default: "true", description: "Shows the company field." },
        { name: "showSubject", type: "boolean", default: "true", description: "Shows the subject field." },
        { name: "submitButtonText", type: "string", default: "\"Send Message\"", description: "Text for the submit button." },
      ]}
      examples={[
        {
          title: "Minimal Form",
          description: "Only essential fields without company or subject.",
          preview: (
            <div className="w-full max-w-2xl border rounded-lg p-6 bg-card">
              <ContactForm showCompany={false} showSubject={false} submitButtonText="Send Inquiry" />
            </div>
          ),
          code: `<ContactForm
  showCompany={false}
  showSubject={false}
  submitButtonText="Send Inquiry"
  onSubmit={(data) => console.log(data)}
/>`,
        },
        {
          title: "With Submit Callback",
          description: "Complete form with submit handler.",
          preview: (
            <div className="w-full max-w-2xl border rounded-lg p-6 bg-card">
              <ContactForm submitButtonText="Request Demo" />
            </div>
          ),
          code: `<ContactForm
  submitButtonText="Request Demo"
  onSubmit={async (data) => {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    toast.success("Request sent");
  }}
/>`,
        },
      ]}
    />
  );
}