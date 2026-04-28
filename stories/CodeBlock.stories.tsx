import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "../components/ui/CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "UI/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: ["tsx", "ts", "js", "css", "json", "bash"],
      description: "Syntax language (display only — no highlighting)",
    },
    showLineNumbers: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof CodeBlock>;

const TSX_SAMPLE = `import { Button } from "@/components/ui/Button";

export function Example() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}`;

const JSON_SAMPLE = `{
  "name": "cesionbnk-dsm",
  "version": "0.4.0",
  "dependencies": {
    "react": "^18.0.0",
    "tailwindcss": "^4.0.0"
  }
}`;

const BASH_SAMPLE = `# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build`;

export const Default: Story = {
  args: {
    code: TSX_SAMPLE,
    filename: "example.tsx",
    showLineNumbers: true,
  },
};

export const WithoutFilename: Story = {
  args: {
    code: TSX_SAMPLE,
    showLineNumbers: true,
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    code: TSX_SAMPLE,
    filename: "example.tsx",
    showLineNumbers: false,
  },
};

export const JSON: Story = {
  args: {
    code: JSON_SAMPLE,
    filename: "package.json",
    showLineNumbers: true,
  },
};

export const Shell: Story = {
  args: {
    code: BASH_SAMPLE,
    filename: "setup.sh",
    showLineNumbers: false,
  },
};

export const Short: Story = {
  args: {
    code: `import { cn } from "@/lib/utils";`,
    filename: "snippet.ts",
    showLineNumbers: false,
  },
};
