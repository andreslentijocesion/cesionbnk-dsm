import * as React from "react";
import { Upload, X, File } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

interface InputFileProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  showPreview?: boolean;
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ className, onFilesChange, maxFiles = 1, showPreview = true, ...props }, ref) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const newFiles = maxFiles === 1 ? selectedFiles.slice(0, 1) : selectedFiles.slice(0, maxFiles);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    };

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = maxFiles === 1 ? droppedFiles.slice(0, 1) : droppedFiles.slice(0, maxFiles);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    return (
      <div className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            "border-input hover:border-ring flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted p-8 text-center transition-colors",
            className
          )}
        >
          <Upload className="text-muted-foreground size-10" />
          <div className="space-y-1">
            <p className="text-foreground">
              <Button
                type="button"
                variant="link"
                className="h-auto p-0"
                onClick={() => inputRef.current?.click()}
              >
                Select a file
              </Button>
              {" "}or drag and drop
            </p>
            <p className="text-muted-foreground text-xs">
              {maxFiles === 1 ? "Maximum 1 file" : `Maximum ${maxFiles} files`}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple={maxFiles > 1}
            {...props}
          />
        </div>

        {showPreview && files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-muted border-border flex items-center gap-3 rounded-md border p-3"
              >
                <File className="text-muted-foreground size-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm">{file.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="shrink-0"
                >
                  <X className="size-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

InputFile.displayName = "InputFile";

export { InputFile };