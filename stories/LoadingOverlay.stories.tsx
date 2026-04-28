import type { Meta, StoryObj } from "@storybook/react";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";
import { LoadingProvider } from "../components/providers/LoadingProvider";
import { useLoading } from "../components/providers/LoadingProvider";
import { Button } from "../components/ui/Button";

const meta: Meta<typeof LoadingOverlay> = {
  title: "UI/LoadingOverlay",
  component: LoadingOverlay,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LoadingProvider>
        <div className="relative h-screen bg-background">
          <Story />
        </div>
      </LoadingProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "bar"],
      description: "Loading animation style",
    },
    message: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

function OverlayDemo({ variant, message }: { variant?: "spinner" | "dots" | "bar"; message?: string }) {
  const { showLoading, hideLoading, isLoading } = useLoading();
  return (
    <div className="flex items-center justify-center h-full gap-4 flex-col">
      <p className="text-muted-foreground text-sm">Click the button to trigger the overlay</p>
      <div className="flex gap-2">
        <Button onClick={() => showLoading(message ?? "Loading...", "overlay")} disabled={isLoading}>
          Show overlay
        </Button>
        <Button variant="outline" onClick={hideLoading} disabled={!isLoading}>
          Hide
        </Button>
      </div>
      <LoadingOverlay variant={variant} message={message} />
    </div>
  );
}

export const Spinner: Story = {
  render: () => <OverlayDemo variant="spinner" message="Cargando operaciones..." />,
};

export const Dots: Story = {
  render: () => <OverlayDemo variant="dots" message="Procesando..." />,
};

export const Bar: Story = {
  render: () => <OverlayDemo variant="bar" message="Generando reporte..." />,
};

export const CustomMessage: Story = {
  render: () => <OverlayDemo variant="spinner" message="Validando RUT del cedente..." />,
};
