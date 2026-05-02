import * as React from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Heading1, Heading2,
  Quote, Undo, Redo,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
  readOnly = false,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [html, setHtml] = React.useState(value);

  React.useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      setHtml(value);
    }
  }, [value]);

  const exec = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      handleInput();
      editorRef.current.focus();
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtml(newHtml);
      onChange?.(newHtml);
    }
  };

  const ToolbarButton = ({ icon: Icon, command, arg, label, active = false }: { icon: any; command: string; arg?: string; label: string; active?: boolean }) => (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Toggle size="sm" pressed={active} onPressedChange={() => exec(command, arg)} disabled={readOnly} className="size-8 p-0" aria-label={label}>
            <Icon className="size-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent><p>{label}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className={cn("border rounded-md bg-background shadow-sm flex flex-col overflow-hidden", className)}>
      <div className="flex items-center gap-1 p-2 border-b bg-muted flex-wrap">
        <div className="flex items-center gap-1">
          <ToolbarButton icon={Undo} command="undo" label="Undo" />
          <ToolbarButton icon={Redo} command="redo" label="Redo" />
        </div>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <div className="flex items-center gap-1">
          <ToolbarButton icon={Heading1} command="formatBlock" arg="H1" label="Heading 1" />
          <ToolbarButton icon={Heading2} command="formatBlock" arg="H2" label="Heading 2" />
        </div>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <div className="flex items-center gap-1">
          <ToolbarButton icon={Bold} command="bold" label="Bold" />
          <ToolbarButton icon={Italic} command="italic" label="Italic" />
          <ToolbarButton icon={Underline} command="underline" label="Underline" />
          <ToolbarButton icon={Strikethrough} command="strikeThrough" label="Strikethrough" />
        </div>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <div className="flex items-center gap-1">
          <ToolbarButton icon={AlignLeft} command="justifyLeft" label="Align Left" />
          <ToolbarButton icon={AlignCenter} command="justifyCenter" label="Align Center" />
          <ToolbarButton icon={AlignRight} command="justifyRight" label="Align Right" />
        </div>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <div className="flex items-center gap-1">
          <ToolbarButton icon={List} command="insertUnorderedList" label="Bullet List" />
          <ToolbarButton icon={ListOrdered} command="insertOrderedList" label="Ordered List" />
          <ToolbarButton icon={Quote} command="formatBlock" arg="blockquote" label="Quote" />
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        data-placeholder={placeholder}
        className={cn(
          "flex-1 p-4 min-h-[200px] outline-none prose prose-sm max-w-none dark:prose-invert overflow-y-auto",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          readOnly && "opacity-50 cursor-not-allowed"
        )}
      />
      <div className="px-3 py-1.5 border-t bg-muted text-xs text-muted-foreground flex justify-between">
        <span>{html.length} chars</span>
        <span>HTML Mode</span>
      </div>
    </div>
  );
}