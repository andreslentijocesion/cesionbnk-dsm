import { ComponentShowcase } from "../components/ui/component-showcase";
import { TextareaAutoresize } from "../components/ui/textarea-autoresize";
import { useState } from "react";

const code = `import { TextareaAutoresize } from "@/components/ui/textarea-autoresize";
import { useState } from "react";

export function TextareaAutoresizeDemo() {
  const [comment, setComment] = useState("");

  return (
    <TextareaAutoresize
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your comment..."
      minRows={3}
      maxRows={10}
    />
  );
}`;

export function TextareaAutoresizePage() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("This is initial text.\nIt spans multiple lines.\nYou can edit and add more.");
  const [value3, setValue3] = useState("");

  return (
    <ComponentShowcase
      title="Textarea Autoresize"
      description="Textarea that automatically adjusts its height based on content. Real-time auto-resize, min/max height control with minRows/maxRows, automatic scrollbar, and same API as a standard textarea."
      category="Forms"
      atomicLevel="Atom"
      preview={
        <div className="w-full max-w-md space-y-2">
          <label className="text-foreground font-medium">Write a comment</label>
          <TextareaAutoresize
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="The textarea will grow automatically as you type..."
            minRows={3}
            maxRows={8}
          />
          <p className="text-muted-foreground text-xs">Characters: {value1.length}</p>
        </div>
      }
      code={code}
      props={[
        { name: "minRows", type: "number", default: "3", description: "Minimum number of visible rows" },
        { name: "maxRows", type: "number", default: "10", description: "Maximum number of rows before scroll" },
        { name: "value", type: "string", description: "Controlled textarea value" },
        { name: "onChange", type: "(e) => void", description: "Callback when the value changes" },
        { name: "placeholder", type: "string", description: "Placeholder text" },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the textarea" },
        { name: "className", type: "string", description: "Additional CSS classes" },
        { name: "...props", type: "TextareaHTMLAttributes", description: "All standard textarea HTML props" },
      ]}
      examples={[
        {
          title: "With Initial Content",
          description: "Textarea that already has content and auto-adjusts.",
          preview: (
            <div className="w-full max-w-md">
              <TextareaAutoresize
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                minRows={2}
                maxRows={6}
              />
            </div>
          ),
          code: `<TextareaAutoresize
  value={initialContent}
  onChange={(e) => setValue(e.target.value)}
  minRows={2}
  maxRows={6}
/>`,
        },
        {
          title: "Constrained Height",
          description: "Height control with 2 rows minimum and 5 maximum.",
          preview: (
            <div className="w-full max-w-md">
              <TextareaAutoresize
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                placeholder="This textarea has 2 rows minimum and 5 maximum..."
                minRows={2}
                maxRows={5}
              />
            </div>
          ),
          code: `<TextareaAutoresize
  placeholder="2 rows min, 5 max..."
  minRows={2}
  maxRows={5}
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state of the component.",
          preview: (
            <div className="w-full max-w-md">
              <TextareaAutoresize
                value="This textarea is disabled and cannot be edited."
                disabled
                minRows={3}
              />
            </div>
          ),
          code: `<TextareaAutoresize
  value="Fixed content"
  disabled
  minRows={3}
/>`,
        },
      ]}
    />
  );
}