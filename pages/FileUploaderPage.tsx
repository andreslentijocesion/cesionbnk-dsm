import { ComponentShowcase } from "../components/ui/component-showcase";
import { FileUploader } from "../components/advanced/file-uploader";
import { toast } from "sonner";

export function FileUploaderPage() {
  const handleUpload = (files: File[]) => {
    console.log("Files uploaded:", files);
    toast.success(`${files.length} files successfully uploaded!`);
  };

  return (
    <ComponentShowcase
      title="File Uploader"
      description="Advanced file upload component with drag & drop zone, image previews, file type and size validation, and upload progress simulation. Use it for invoice uploads, document verification, and batch file processing."
      category="Advanced"
      preview={
        <FileUploader
          maxFiles={5}
          maxSize={5 * 1024 * 1024}
          accept={["image/png", "image/jpeg", "application/pdf"]}
          onUpload={handleUpload}
        />
      }
      code={`import { FileUploader } from "@/components/advanced/file-uploader";

<FileUploader
  maxFiles={5}
  maxSize={5 * 1024 * 1024}           // 5MB
  accept={["image/png", "image/jpeg", "application/pdf"]}
  onUpload={(files) => console.log(files)}
/>`}
      props={[
        {
          name: "maxFiles",
          type: "number",
          default: "5",
          description: "Maximum number of files per upload batch.",
        },
        {
          name: "maxSize",
          type: "number",
          default: "5242880",
          description: "Maximum file size in bytes (default: 5MB).",
        },
        {
          name: "accept",
          type: "string[]",
          description: "Array of accepted MIME types (e.g., 'image/png', 'application/pdf').",
        },
        {
          name: "onUpload",
          type: "(files: File[]) => void",
          description: "Callback invoked when files are submitted for upload.",
          required: true,
        },
      ]}
      examples={[
        {
          title: "PDF Only",
          description: "Restricted to PDF documents with a 10MB limit.",
          preview: (
            <FileUploader
              maxFiles={3}
              maxSize={10 * 1024 * 1024}
              accept={["application/pdf"]}
              onUpload={handleUpload}
            />
          ),
          code: `<FileUploader
  maxFiles={3}
  maxSize={10 * 1024 * 1024}
  accept={["application/pdf"]}
  onUpload={handleUpload}
/>`,
        },
        {
          title: "Images Only",
          description: "Restricted to image formats for visual document uploads.",
          preview: (
            <FileUploader
              maxFiles={10}
              maxSize={2 * 1024 * 1024}
              accept={["image/png", "image/jpeg", "image/webp"]}
              onUpload={handleUpload}
            />
          ),
          code: `<FileUploader
  maxFiles={10}
  maxSize={2 * 1024 * 1024}
  accept={["image/png", "image/jpeg", "image/webp"]}
  onUpload={handleUpload}
/>`,
        },
      ]}
    />
  );
}