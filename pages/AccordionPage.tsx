import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export function AccordionPage() {
  return (
    <ComponentShowcase
      title="Accordion"
      description="A vertically stacked set of interactive headings that reveal content. Use Accordion as a container and nest AccordionItem for each section."
      category="Layout"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern and follows WCAG 2.1 Level AA guidelines.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match your design system but can be customized.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default with smooth transitions for opening and closing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
      
      // Main Code
      code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and follows WCAG 2.1 Level AA guidelines.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your design system but can be customized.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default with smooth transitions for opening and closing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "type",
          type: '"single" | "multiple"',
          default: '"single"',
          description: "Determines whether one or multiple items can be opened at the same time.",
        },
        {
          name: "collapsible",
          type: "boolean",
          default: "false",
          description: "Allows closing content when clicking trigger for an open item (only for type='single').",
        },
        {
          name: "value",
          type: "string",
          description: "The value of the item (for AccordionItem).",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "When true, prevents the user from interacting with the item.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Multiple Open",
          description: "Allows multiple items to be expanded at the same time.",
          preview: (
            <Accordion type="multiple" className="w-full max-w-md">
              <AccordionItem value="feature-1">
                <AccordionTrigger>Feature One</AccordionTrigger>
                <AccordionContent>
                  This is the content for feature one. Multiple items can be expanded at the same time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="feature-2">
                <AccordionTrigger>Feature Two</AccordionTrigger>
                <AccordionContent>
                  This is the content for feature two. All items remain independent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="multiple">
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`
        },
        {
          title: "FAQ Example",
          description: "A common use case for accordions in FAQ sections.",
          preview: (
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="faq-1">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>How long is the free trial?</AccordionTrigger>
                <AccordionContent>
                  Our free trial lasts for 14 days with full access to all features. No credit card required.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="single" collapsible>
  <AccordionItem value="faq-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>`
        }
      ]}
    />
  );
}