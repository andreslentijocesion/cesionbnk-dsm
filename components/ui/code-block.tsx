import { useState } from "react";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "../../lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  filename,
  showLineNumbers = true
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const safeCode = code ?? "";

  const handleCopy = async () => {
    await copyToClipboard(safeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-slate-950 overflow-hidden">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900">
          <span className="text-xs font-mono text-slate-400">{filename}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-slate-400 hover:text-slate-200"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="text-slate-200 font-mono">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-slate-600 pr-4 text-right border-r border-slate-800 mr-4">
                  {safeCode.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1">
                  {safeCode.split('\n').map((line, i) => (
                    <div key={i}>{line || '\u00A0'}</div>
                  ))}
                </div>
              </div>
            ) : (
              safeCode
            )}
          </code>
        </pre>
      </div>

      {!filename && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 px-2 text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}