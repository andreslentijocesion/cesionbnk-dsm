import * as React from "react";
import { Upload, X, File, FileText, Image as ImageIcon, Trash2, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";

interface FileUploaderProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  className?: string;
  onUpload?: (files: File[]) => void;
}

interface FileState {
  file: File;
  progress: number;
  error?: string;
  preview?: string;
  completed: boolean;
}

export function FileUploader({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  accept = ["image/*", "application/pdf"],
  className,
  onUpload,
}: FileUploaderProps) {
  const [files, setFiles] = React.useState<FileState[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  const validateFile = (file: File): string | undefined => {
    if (file.size > maxSize) return `File too large (max ${(maxSize / 1024 / 1024).toFixed(0)}MB)`;
    const fileType = file.type;
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    const isValidType = accept.some((type) => {
      if (type.endsWith("/*")) return fileType.startsWith(type.replace("/*", ""));
      return type === fileType || type === fileExtension;
    });
    if (!isValidType) return "File type not supported";
    return undefined;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const addFiles = (newFiles: File[]) => {
    const currentCount = files.length;
    if (currentCount + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    const newFileStates: FileState[] = newFiles.map((file) => ({
      file, progress: 0, error: validateFile(file),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      completed: false,
    }));
    setFiles((prev) => [...prev, ...newFileStates]);
    newFileStates.forEach((fileState, index) => {
      if (!fileState.error) simulateUpload(currentCount + index);
    });
  };

  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) => prev.map((f, i) => i === index ? { ...f, progress: 100, completed: true } : f));
      } else {
        setFiles((prev) => prev.map((f, i) => i === index ? { ...f, progress } : f));
      }
    }, 200);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const removed = newFiles.splice(index, 1)[0];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return newFiles;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (file.type === "application/pdf") return <FileText className="h-8 w-8 text-red-500" />;
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 rounded-lg border-2 border-dashed transition-colors cursor-pointer",
          isDragging ? "border-primary bg-muted" : "border-muted-foreground/25 hover:bg-muted",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput} accept={accept.join(",")} disabled={files.length >= maxFiles} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <div className="p-4 bg-background rounded-full shadow-sm mb-4 border">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-2 text-sm text-foreground font-medium">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Supported: {accept.map((a) => a.replace("application/", "").replace("image/", "")).join(", ")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB per file</p>
        </div>
      </div>

      {files.length > 0 && (
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {files.map((fileState, index) => (
              <div key={`${fileState.file.name}-${index}`} className="flex items-center gap-4 p-3 bg-muted rounded-lg border group">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-background flex items-center justify-center">
                  {fileState.preview ? <img src={fileState.preview} alt={fileState.file.name} className="h-full w-full object-cover" /> : getFileIcon(fileState.file)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate pr-4">{fileState.file.name}</p>
                    <button onClick={(e) => { e.stopPropagation(); removeFile(index); }} className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {fileState.error ? (
                    <p className="text-xs text-destructive font-medium">{fileState.error}</p>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(fileState.file.size)}</span>
                        <span>{Math.round(fileState.progress)}%</span>
                      </div>
                      <Progress value={fileState.progress} className={cn("h-1.5", fileState.completed && "bg-green-100")} />
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 ml-2">
                  {fileState.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : fileState.error ? (
                    <Trash2 className="h-5 w-5 text-destructive cursor-pointer" onClick={() => removeFile(index)} />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {files.length > 0 && (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted">
          <div className="text-sm text-muted-foreground">{files.length} file(s) selected</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { files.forEach(() => removeFile(0)); }}>Clear All</Button>
            <Button
              size="sm"
              onClick={() => onUpload?.(files.filter((f) => !f.error).map((f) => f.file))}
              disabled={files.some((f) => !f.completed && !f.error) || files.every((f) => f.error)}
            >
              Upload Files
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}