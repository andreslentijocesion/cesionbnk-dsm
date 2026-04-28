import type { Meta, StoryObj } from "@storybook/react";
import { PageTransition } from "../components/ui/PageTransition";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useState } from "react";

const meta: Meta<typeof PageTransition> = {
  title: "UI/PageTransition",
  component: PageTransition,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["page", "fade", "scale"],
      description: "Animation variant applied on mount/unmount",
    },
  },
};
export default meta;

type Story = StoryObj<typeof PageTransition>;

function DemoContent({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center space-y-2">
      <Badge variant="primary-soft">{label}</Badge>
      <p className="text-muted-foreground text-sm">
        This content is wrapped in a PageTransition. Toggle pages to see the animation.
      </p>
    </div>
  );
}

function InteractiveDemo({ variant }: { variant: "page" | "fade" | "scale" }) {
  const [page, setPage] = useState<"A" | "B">("A");
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" variant={page === "A" ? "default" : "outline"} onClick={() => setPage("A")}>Page A</Button>
        <Button size="sm" variant={page === "B" ? "default" : "outline"} onClick={() => setPage("B")}>Page B</Button>
      </div>
      <PageTransition key={page} variant={variant}>
        <DemoContent label={`Page ${page} — variant: ${variant}`} />
      </PageTransition>
    </div>
  );
}

export const PageVariant: Story = {
  render: () => <InteractiveDemo variant="page" />,
  name: "variant: page (slide + fade)",
};

export const FadeVariant: Story = {
  render: () => <InteractiveDemo variant="fade" />,
  name: "variant: fade",
};

export const ScaleVariant: Story = {
  render: () => <InteractiveDemo variant="scale" />,
  name: "variant: scale",
};

export const Static: Story = {
  args: {
    variant: "fade",
    children: <DemoContent label="Static — always visible" />,
  },
};
