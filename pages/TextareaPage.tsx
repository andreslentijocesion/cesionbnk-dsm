import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useState } from "react";

export function TextareaPage() {
  return (
    <ComponentShowcase
      title="Textarea"
      description="Displays a multi-line text input field for longer content like messages, descriptions, and comments."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="w-full max-w-md space-y-4">
          <Textarea placeholder="Type your message here..." />
          <Textarea placeholder="Disabled textarea" disabled />
        </div>
      }
      
      // Main Code
      code={`import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return (
    <div className="space-y-4">
      <Textarea placeholder="Type your message here..." />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "placeholder",
          type: "string",
          description: "Help text shown when empty",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the textarea",
        },
        {
          name: "rows",
          type: "number",
          default: "3",
          description: "Number of visible lines",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled value of the textarea",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Initial uncontrolled value",
        },
        {
          name: "onChange",
          type: "(e: ChangeEvent<HTMLTextAreaElement>) => void",
          description: "Callback when the value changes",
        },
        {
          name: "maxLength",
          type: "number",
          description: "Maximum character length",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Required field in forms",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Label",
          description: "Textarea with descriptive label for better accessibility",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your message here..." 
              />
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaWithLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea 
        id="message" 
        placeholder="Enter your message here..." 
      />
    </div>
  );
}`,
        },
        {
          title: "Different Sizes",
          description: "Size control via the rows prop",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="small">Small (3 rows)</Label>
                <Textarea id="small" rows={3} placeholder="Small textarea..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medium">Medium (5 rows)</Label>
                <Textarea id="medium" rows={5} placeholder="Medium textarea..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="large">Large (10 rows)</Label>
                <Textarea id="large" rows={10} placeholder="Large textarea..." />
              </div>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaSizes() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="small">Small (3 rows)</Label>
        <Textarea id="small" rows={3} placeholder="Small..." />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="medium">Medium (5 rows)</Label>
        <Textarea id="medium" rows={5} placeholder="Medium..." />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="large">Large (10 rows)</Label>
        <Textarea id="large" rows={10} placeholder="Large..." />
      </div>
    </div>
  );
}`,
        },
        {
          title: "With Helper Text",
          description: "Textarea with helper text and character count",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about yourself..." 
                rows={5}
              />
              <p className="text-muted-foreground">
                Maximum 500 characters
              </p>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaWithHelper() {
  return (
    <div className="space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea 
        id="bio" 
        placeholder="Tell us about yourself..." 
        rows={5}
      />
      <p className="text-sm text-muted-foreground">
        Maximum 500 characters
      </p>
    </div>
  );
}`,
        },
        {
          title: "Character Counter",
          description: "Textarea with real-time character count",
          preview: (
            <TextareaWithCounter />
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function TextareaWithCounter() {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <div className="space-y-2">
      <Label htmlFor="comment">Comment</Label>
      <Textarea
        id="comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a comment..."
        maxLength={maxLength}
        rows={4}
      />
      <p className="text-sm text-muted-foreground text-right">
        {value.length}/{maxLength}
      </p>
    </div>
  );
}`,
        },
        {
          title: "Disabled State",
          description: "Textarea in disabled state",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disabled1">Disabled Empty</Label>
                <Textarea id="disabled1" disabled placeholder="This is disabled" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled2">Disabled with Content</Label>
                <Textarea 
                  id="disabled2" 
                  disabled 
                  defaultValue="This textarea is disabled and contains some text that cannot be edited."
                  rows={3}
                />
              </div>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function DisabledTextarea() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="disabled1">Disabled Empty</Label>
        <Textarea 
          id="disabled1" 
          disabled 
          placeholder="This is disabled" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="disabled2">Disabled with Content</Label>
        <Textarea 
          id="disabled2" 
          disabled 
          defaultValue="This textarea is disabled..."
          rows={3}
        />
      </div>
    </div>
  );
}`,
        },
        {
          title: "Form Integration",
          description: "Textarea integrated into a complete form",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Textarea 
                  id="subject" 
                  placeholder="Email subject..."
                  rows={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Message Body</Label>
                <Textarea 
                  id="body" 
                  placeholder="Write your message..."
                  rows={6}
                />
              </div>
              <div className="flex gap-2">
                <Button>Send</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EmailForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Textarea 
          id="subject" 
          placeholder="Email subject..."
          rows={1}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="body">Message Body</Label>
        <Textarea 
          id="body" 
          placeholder="Write your message..."
          rows={6}
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">Send</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </form>
  );
}`,
        },
        {
          title: "Required Field",
          description: "Textarea as a required field with visual indicator",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="required">
                Feedback <span className="text-destructive">*</span>
              </Label>
              <Textarea 
                id="required" 
                required
                placeholder="Your feedback is required..."
                rows={4}
              />
              <p className="text-muted-foreground">
                This field is required
              </p>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function RequiredTextarea() {
  return (
    <div className="space-y-2">
      <Label htmlFor="required">
        Feedback <span className="text-destructive">*</span>
      </Label>
      <Textarea 
        id="required" 
        required
        placeholder="Your feedback is required..."
        rows={4}
      />
      <p className="text-sm text-muted-foreground">
        This field is required
      </p>
    </div>
  );
}`,
        },
        {
          title: "With Error State",
          description: "Textarea showing an error state",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="error">Description</Label>
              <Textarea 
                id="error" 
                placeholder="Enter description..."
                className="border-destructive focus-visible:ring-destructive"
                rows={4}
              />
              <p className="text-destructive">
                Description must be at least 10 characters long
              </p>
            </div>
          ),
          code: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaWithError() {
  return (
    <div className="space-y-2">
      <Label htmlFor="error">Description</Label>
      <Textarea 
        id="error" 
        placeholder="Enter description..."
        className="border-destructive focus-visible:ring-destructive"
        rows={4}
      />
      <p className="text-sm text-destructive">
        Description must be at least 10 characters long
      </p>
    </div>
  );
}`,
        },
      ]}
    />
  );
}

// Helper component for Character Counter example
function TextareaWithCounter() {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="comment">Comment</Label>
      <Textarea
        id="comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a comment..."
        maxLength={maxLength}
        rows={4}
      />
      <p className="text-muted-foreground text-right">
        {value.length}/{maxLength}
      </p>
    </div>
  );
}