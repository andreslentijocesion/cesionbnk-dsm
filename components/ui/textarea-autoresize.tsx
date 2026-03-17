import * as React from "react";
import { cn } from "./utils";

interface TextareaAutoresizeProps extends React.ComponentProps<"textarea"> {
  minRows?: number;
  maxRows?: number;
}

const TextareaAutoresize = React.forwardRef<HTMLTextAreaElement, TextareaAutoresizeProps>(
  ({ className, minRows = 3, maxRows = 10, onChange, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [value, setValue] = React.useState(props.value || props.defaultValue || "");

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate line height
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyle.lineHeight);
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);

      // Calculate min and max heights
      const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
      const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;

      // Set new height
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;

      // Show scrollbar if content exceeds maxHeight
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [minRows, maxRows]);

    React.useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    return (
      <textarea
        ref={textareaRef}
        data-slot="textarea"
        className={cn(
          "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-input-background flex w-full resize-none rounded-md border-input border px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

TextareaAutoresize.displayName = "TextareaAutoresize";

export { TextareaAutoresize };