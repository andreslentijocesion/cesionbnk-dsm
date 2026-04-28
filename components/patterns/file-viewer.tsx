/**
 * FileViewer — Document list and preview panel
 * Factoring-ready: invoice PDFs, contracts, cedent documents, debtors' files.
 * @layer patterns
 */
import { useState } from "react";
import {
  FileText, FileImage, FileSpreadsheet, File, Download, Eye,
  Search, X, ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

export type FileType = "pdf" | "image" | "spreadsheet" | "other";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploadedBy?: string;
  uploadedAt: string;
  /** Optional URL for preview/download */
  url?: string;
  /** Tag for categorization */
  category?: string;
}

interface FileViewerProps {
  files: FileItem[];
  /** Called when user clicks Download */
  onDownload?: (file: FileItem) => void;
  /** Called when user clicks Preview */
  onPreview?: (file: FileItem) => void;
  className?: string;
}

const typeIcons: Record<FileType, React.ElementType> = {
  pdf:         FileText,
  image:       FileImage,
  spreadsheet: FileSpreadsheet,
  other:       File,
};

const typeColors: Record<FileType, string> = {
  pdf:         "text-destructive",
  image:       "text-info",
  spreadsheet: "text-success",
  other:       "text-muted-foreground",
};

export function FileViewer({ files, onDownload, onPreview, className }: FileViewerProps) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? files.filter(
        (f) =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.category?.toLowerCase().includes(search.toLowerCase())
      )
    : files;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar documento..."
          className="pl-9 pr-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* File list */}
      {filtered.length === 0 ? (
        <div className="py-10 flex flex-col items-center gap-2 text-muted-foreground">
          <FileText className="h-8 w-8 opacity-30" />
          <p className="text-sm">No se encontraron documentos</p>
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border overflow-hidden">
          {filtered.map((file) => {
            const Icon = typeIcons[file.type];
            return (
              <li
                key={file.id}
                className="flex items-center gap-3 px-4 py-3 bg-card hover:bg-muted/40 transition-colors"
              >
                <Icon className={cn("h-5 w-5 flex-shrink-0", typeColors[file.type])} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{file.uploadedAt}</span>
                    {file.uploadedBy && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{file.uploadedBy}</span>
                      </>
                    )}
                    {file.category && (
                      <Badge variant="outline" className="text-xs py-0 h-4">
                        {file.category}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {onPreview && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onPreview(file)}
                      title="Ver documento"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  {onDownload && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onDownload(file)}
                      title="Descargar"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  {file.url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      asChild
                      title="Abrir en pestaña"
                    >
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="text-xs text-muted-foreground text-right">
        {filtered.length} de {files.length} documentos
      </p>
    </div>
  );
}
