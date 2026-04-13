import { ComponentShowcase } from "../components/ui/component-showcase";
import { InputFile } from "../components/ui/input-file";
import { useState } from "react";

const code = `import { InputFile } from "@/components/ui/input-file";
import { useState } from "react";

export function InputFileDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <InputFile
      onFilesChange={setFiles}
      maxFiles={3}
      accept="image/*,.pdf"
      placeholder="Select images or PDFs"
    />
  );
}`;

export function InputFilePage() {
  const [_files1, setFiles1] = useState<File[]>([]);
  const [_files2, setFiles2] = useState<File[]>([]);
  const [_files3, setFiles3] = useState<File[]>([]);

  return (
    <ComponentShowcase
      title="Input File"
      description="File upload component with drag & drop, preview of selected files, and support for multiple files. Includes keyboard navigation, type restrictions, and individual file removal."
      category="Forms"
      atomicLevel="Molecule"
      preview={
        <div className="w-full max-w-md space-y-2">
          <label className="text-foreground font-medium">Single file</label>
          <InputFile
            onFilesChange={setFiles1}
            maxFiles={1}
            accept="image/*"
          />
        </div>
      }
      code={code}
      props={[
        { name: "onFilesChange", type: "(files: File[]) => void", description: "Callback when files change" },
        { name: "maxFiles", type: "number", default: "1", description: "Maximum number of allowed files" },
        { name: "showPreview", type: "boolean", default: "true", description: "Show list of selected files" },
        { name: "accept", type: "string", description: "Allowed file types (e.g.: .pdf, image/*)" },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
        { name: "className", type: "string", description: "Additional CSS classes" },
      ]}
      examples={[
        {
          title: "Multiple Files",
          description: "Allows selecting multiple files with a defined maximum.",
          preview: (
            <div className="w-full max-w-md">
              <InputFile
                onFilesChange={setFiles2}
                maxFiles={5}
                placeholder="Select up to 5 files"
              />
            </div>
          ),
          code: `<InputFile
  onFilesChange={setFiles}
  maxFiles={5}
  placeholder="Select up to 5 files"
/>`,
        },
        {
          title: "Without Preview",
          description: "File input without showing the selected files list.",
          preview: (
            <div className="w-full max-w-md">
              <InputFile
                onFilesChange={setFiles3}
                showPreview={false}
              />
            </div>
          ),
          code: `<InputFile
  onFilesChange={setFiles}
  showPreview={false}
/>`,
        },
        {
          title: "PDFs Only",
          description: "Input restricted to specific file types.",
          preview: (
            <div className="w-full max-w-md">
              <InputFile
                accept=".pdf,application/pdf"
                placeholder="Select PDF files"
              />
            </div>
          ),
          code: `<InputFile
  accept=".pdf,application/pdf"
  placeholder="Select PDF files"
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state of the component.",
          preview: (
            <div className="w-full max-w-md">
              <InputFile
                disabled
                placeholder="Input disabled"
              />
            </div>
          ),
          code: `<InputFile disabled placeholder="Input disabled" />`,
        },
      ]}
    />
  );
}