import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { RichTextEditor } from "../components/advanced/rich-text-editor";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";

export function RichTextEditorPage() {
  const [content, setContent] = useState(
    "<h3>Initial Content</h3><p>Try editing this text to see the <b>rich text</b> features in action.</p>"
  );

  return (
    <ComponentShowcase
      title="Rich Text Editor"
      description="WYSIWYG editor for rich content creation with formatting tools. Supports bold, italic, underline, lists, headings, and more. Use it for operation notes, document descriptions, and comment threads."
      category="Advanced"
      preview={
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Description / Notes</Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              className="min-h-[250px]"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                console.log("Saved:", content);
                toast.success("Content saved successfully!");
              }}
            >
              Save Content
            </Button>
          </div>
        </div>
      }
      code={`import { RichTextEditor } from "@/components/advanced/RichTextEditor";

const [content, setContent] = useState("<p>Hello world</p>");

<RichTextEditor
  value={content}
  onChange={setContent}
  className="min-h-[250px]"
/>`}
      props={[
        {
          name: "value",
          type: "string",
          description: "HTML string representing the editor content.",
          required: true,
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback invoked when the content changes.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the editor container.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when the editor is empty.",
        },
      ]}
      examples={[
        {
          title: "HTML Output Preview",
          description: "The raw HTML output of the editor for debugging or API submission.",
          preview: (
            <div className="space-y-4">
              <RichTextEditor
                value={content}
                onChange={setContent}
                className="min-h-[150px]"
              />
              <div className="bg-muted p-4 rounded-md font-mono text-xs overflow-x-auto whitespace-pre-wrap break-all">
                {content}
              </div>
            </div>
          ),
          code: `<RichTextEditor value={content} onChange={setContent} />
<pre>{content}</pre> {/* Raw HTML output */}`,
        },
      ]}
    />
  );
}