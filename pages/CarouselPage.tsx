import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// ── Demos ──────────────────────────────────────────────────────────────────

function BasicCarouselDemo() {
  return (
    <div className="flex justify-center px-12 w-full max-w-sm mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((n) => (
            <CarouselItem key={n}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function MultipleItemsDemo() {
  return (
    <div className="px-10 w-full max-w-lg mx-auto">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-2">
          {["Invoice #001", "Invoice #002", "Invoice #003", "Invoice #004", "Invoice #005"].map(
            (label, i) => (
              <CarouselItem key={i} className="pl-2 md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="flex flex-col gap-2 p-4">
                    <Badge variant="outline" className="w-fit">Pending</Badge>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">COP 4,500,000</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function LoopCarouselDemo() {
  return (
    <div className="px-12 w-full max-w-sm mx-auto">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {["Design", "Develop", "Deploy", "Monitor"].map((step, i) => (
            <CarouselItem key={i}>
              <Card className="bg-card border-primary">
                <CardContent className="flex flex-col items-center justify-center p-8 gap-2">
                  <span className="text-3xl font-bold text-primary">{`0${i + 1}`}</span>
                  <span className="text-sm font-medium">{step}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function ApiControlledDemo() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleSetApi = (newApi: CarouselApi) => {
    setApi(newApi);
    if (!newApi) return;
    setCurrent(newApi.selectedScrollSnap() + 1);
    newApi.on("select", () => setCurrent(newApi.selectedScrollSnap() + 1));
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      <div className="px-12 w-full">
        <Carousel setApi={handleSetApi} className="w-full">
          <CarouselContent>
            {["Q1 Report", "Q2 Report", "Q3 Report", "Q4 Report"].map((title, i) => (
              <CarouselItem key={i}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-1">
                    <span className="text-sm text-muted-foreground">Period</span>
                    <span className="text-lg font-semibold">{title}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <p className="text-sm text-muted-foreground">
        Slide <span className="font-medium text-foreground">{current}</span> of 4
      </p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function CarouselPage() {
  return (
    <ComponentShowcase
      title="Carousel"
      description="A slideshow component built on top of Embla Carousel. Supports horizontal and vertical orientations, looping, multi-item views, and programmatic API control via setApi. Navigate with arrow buttons or keyboard arrows."
      category="Layout"
      atomicLevel="Molecule"

      preview={<BasicCarouselDemo />}

      code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((n) => (
          <CarouselItem key={n}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{n}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}`}

      props={[
        {
          name: "opts",
          type: "EmblaOptionsType",
          description: "Options passed directly to Embla Carousel (align, loop, skipSnaps, etc.).",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Scroll axis direction.",
        },
        {
          name: "setApi",
          type: "(api: CarouselApi) => void",
          description: "Callback to receive the Embla API instance for programmatic control.",
        },
        {
          name: "plugins",
          type: "EmblaPluginType[]",
          description: "Embla plugins (e.g. Autoplay, WheelGestures).",
        },
        {
          name: "basis (CarouselItem)",
          type: "Tailwind class",
          description: 'Apply basis-1/2, basis-1/3, etc. on CarouselItem to show multiple slides.',
        },
      ]}

      examples={[
        {
          title: "Multiple Items",
          description: "Show partial items by setting basis on CarouselItem — ideal for invoice or card feeds.",
          preview: <MultipleItemsDemo />,
          code: `<Carousel opts={{ align: "start" }}>
  <CarouselContent>
    {items.map((item, i) => (
      <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
        <Card>...</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        },
        {
          title: "Infinite Loop",
          description: "Enable loop mode so the carousel wraps back to the beginning seamlessly.",
          preview: <LoopCarouselDemo />,
          code: `<Carousel opts={{ loop: true }}>
  <CarouselContent>
    {steps.map((step, i) => (
      <CarouselItem key={i}>...</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
        },
        {
          title: "API-Controlled",
          description: "Access the Embla API to track the current slide or trigger navigation programmatically.",
          preview: <ApiControlledDemo />,
          code: `const [api, setApi] = useState<CarouselApi>();
const [current, setCurrent] = useState(0);

useEffect(() => {
  if (!api) return;
  setCurrent(api.selectedScrollSnap() + 1);
  api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
}, [api]);

<Carousel setApi={setApi}>
  ...
</Carousel>
<p>Slide {current} of {count}</p>`,
        },
      ]}
    />
  );
}