import { ComponentShowcase } from "../components/ui/component-showcase";
import { Slider } from "../components/ui/slider";
import { Label } from "../components/ui/label";
import { Volume2, VolumeX, Sun, DollarSign, Gauge } from "lucide-react";
import { useState } from "react";

export function SliderPage() {
  return (
    <ComponentShowcase
      title="Slider"
      description="An input control where the user selects a value from within a given range using a draggable thumb."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="w-full max-w-md space-y-6">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[75]} max={100} step={1} />
        </div>
      }
      
      // Main Code
      code={`import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  return (
    <div className="space-y-6">
      <Slider defaultValue={[50]} max={100} step={1} />
      <Slider defaultValue={[75]} max={100} step={1} />
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "value",
          type: "number[]",
          description: "Controlled slider value (array for multiple thumbs)",
        },
        {
          name: "defaultValue",
          type: "number[]",
          default: "[0]",
          description: "Uncontrolled initial value",
        },
        {
          name: "onValueChange",
          type: "(value: number[]) => void",
          description: "Callback when the value changes",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "Minimum range value",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "Maximum range value",
        },
        {
          name: "step",
          type: "number",
          default: "1",
          description: "Increment between values",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the slider",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Slider orientation",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "Basic Slider",
          description: "Simple slider with a default value",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label>Basic Slider</Label>
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function BasicSlider() {
  return (
    <div className="space-y-2">
      <Label>Basic Slider</Label>
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  );
}`,
        },
        {
          title: "Volume Control",
          description: "Slider with icons and real-time visible value",
          preview: (
            <VolumeControlExample />
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export function VolumeControl() {
  const [volume, setVolume] = useState([50]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">
          {volume[0]}%
        </span>
      </div>
      <div className="flex items-center gap-3">
        <VolumeX className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="flex-1"
        />
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}`,
        },
        {
          title: "Different Steps",
          description: "Sliders with different step increments",
          preview: (
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2">
                <Label>Step 1 (Fine control)</Label>
                <Slider defaultValue={[25]} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Step 10 (Medium control)</Label>
                <Slider defaultValue={[50]} max={100} step={10} />
              </div>
              <div className="space-y-2">
                <Label>Step 25 (Coarse control)</Label>
                <Slider defaultValue={[75]} max={100} step={25} />
              </div>
            </div>
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function DifferentSteps() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Step 1 (Fine control)</Label>
        <Slider defaultValue={[25]} max={100} step={1} />
      </div>
      
      <div className="space-y-2">
        <Label>Step 10 (Medium control)</Label>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
      
      <div className="space-y-2">
        <Label>Step 25 (Coarse control)</Label>
        <Slider defaultValue={[75]} max={100} step={25} />
      </div>
    </div>
  );
}`,
        },
        {
          title: "Price Range",
          description: "Slider to select a price range",
          preview: (
            <PriceRangeExample />
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export function PriceRange() {
  const [price, setPrice] = useState([500]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Maximum Price</Label>
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-medium">
            {price[0].toLocaleString()}
          </span>
        </div>
      </div>
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={1000}
        step={50}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </div>
  );
}`,
        },
        {
          title: "Brightness Control",
          description: "Slider with custom minimum and maximum values",
          preview: (
            <BrightnessControlExample />
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sun } from "lucide-react";
import { useState } from "react";

export function BrightnessControl() {
  const [brightness, setBrightness] = useState([70]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Label>Brightness</Label>
        </div>
        <span className="text-muted-foreground">
          {brightness[0]}%
        </span>
      </div>
      <Slider
        value={brightness}
        onValueChange={setBrightness}
        min={10}
        max={100}
        step={5}
      />
    </div>
  );
}`,
        },
        {
          title: "Performance Gauge",
          description: "Slider styled as a performance gauge",
          preview: (
            <PerformanceGaugeExample />
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Gauge } from "lucide-react";
import { useState } from "react";

export function PerformanceGauge() {
  const [performance, setPerformance] = useState([65]);
  
  const getPerformanceLevel = (value: number) => {
    if (value < 30) return { label: "Low", color: "text-red-500" };
    if (value < 70) return { label: "Medium", color: "text-yellow-500" };
    return { label: "High", color: "text-green-500" };
  };
  
  const level = getPerformanceLevel(performance[0]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <Label>Performance</Label>
        </div>
        <span className={\`text-sm font-medium \${level.color}\`}>
          {level.label} ({performance[0]}%)
        </span>
      </div>
      <Slider
        value={performance}
        onValueChange={setPerformance}
        max={100}
        step={1}
      />
    </div>
  );
}`,
        },
        {
          title: "Range Slider",
          description: "Slider with multiple thumbs for range selection",
          preview: (
            <RangeSliderExample />
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function RangeSlider() {
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Age Range</Label>
        <span className="text-sm text-muted-foreground">
          {range[0]} - {range[1]} years
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        min={18}
        max={100}
        step={1}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>18</span>
        <span>100</span>
      </div>
    </div>
  );
}`,
        },
        {
          title: "Disabled State",
          description: "Slider in disabled state",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label>Disabled Slider</Label>
                <Slider defaultValue={[40]} max={100} step={1} disabled />
              </div>
              <div className="space-y-2">
                <Label>Disabled at Maximum</Label>
                <Slider defaultValue={[100]} max={100} step={1} disabled />
              </div>
            </div>
          ),
          code: `import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function DisabledSlider() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Disabled Slider</Label>
        <Slider defaultValue={[40]} max={100} step={1} disabled />
      </div>
      
      <div className="space-y-2">
        <Label>Disabled at Maximum</Label>
        <Slider defaultValue={[100]} max={100} step={1} disabled />
      </div>
    </div>
  );
}`,
        },
      ]}
    />
  );
}

// Helper components for examples
function VolumeControlExample() {
  const [volume, setVolume] = useState([50]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <Label>Volume</Label>
        <span className="text-muted-foreground">
          {volume[0]}%
        </span>
      </div>
      <div className="flex items-center gap-3">
        <VolumeX className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="flex-1"
        />
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}

function PriceRangeExample() {
  const [price, setPrice] = useState([500]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <Label>Maximum Price</Label>
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">
            {price[0].toLocaleString()}
          </span>
        </div>
      </div>
      <Slider
        value={price}
        onValueChange={setPrice}
        min={0}
        max={1000}
        step={50}
      />
      <div className="flex justify-between text-muted-foreground">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </div>
  );
}

function BrightnessControlExample() {
  const [brightness, setBrightness] = useState([70]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Label>Brightness</Label>
        </div>
        <span className="text-muted-foreground">
          {brightness[0]}%
        </span>
      </div>
      <Slider
        value={brightness}
        onValueChange={setBrightness}
        min={10}
        max={100}
        step={5}
      />
    </div>
  );
}

function PerformanceGaugeExample() {
  const [performance, setPerformance] = useState([65]);
  
  const getPerformanceLevel = (value: number) => {
    if (value < 30) return { label: "Low", color: "text-red-500" };
    if (value < 70) return { label: "Medium", color: "text-yellow-500" };
    return { label: "High", color: "text-green-500" };
  };
  
  const level = getPerformanceLevel(performance[0]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          <Label>Performance</Label>
        </div>
        <span className={`font-medium ${level.color}`}>
          {level.label} ({performance[0]}%)
        </span>
      </div>
      <Slider
        value={performance}
        onValueChange={setPerformance}
        max={100}
        step={1}
      />
    </div>
  );
}

function RangeSliderExample() {
  const [range, setRange] = useState([25, 75]);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex items-center justify-between">
        <Label>Age Range</Label>
        <span className="text-muted-foreground">
          {range[0]} - {range[1]} years
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        min={18}
        max={100}
        step={1}
      />
      <div className="flex justify-between text-muted-foreground">
        <span>18</span>
        <span>100</span>
      </div>
    </div>
  );
}