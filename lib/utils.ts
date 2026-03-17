// Re-export cn utility from the correct location
export { cn } from "../components/ui/utils";

/**
 * Copies text to clipboard with fallback for iframe/permissions-policy environments.
 * Uses Clipboard API first, falls back to execCommand('copy').
 */
export async function copyToClipboard(text: string): Promise<void> {
  // Try modern Clipboard API first
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Blocked by permissions policy — fall through to legacy
    }
  }

  // Legacy fallback using a temporary textarea
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}