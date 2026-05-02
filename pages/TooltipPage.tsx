import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Button } from "../components/ui/button";
import { Info, HelpCircle } from "lucide-react";

export function TooltipPage() {
  return (
    <ComponentShowcase
      title="Tooltip"
      description="A popup that displays information related to an element when focused or hovered."
      category="Feedback"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
      
      // Main Code
      code={`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "delayDuration",
          type: "number",
          default: "700",
          description: "Delay before showing the tooltip (ms).",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "With Icons",
          description: "Tooltips on icon buttons.",
          preview: (
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Info className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <HelpCircle className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Need help?</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ),
          code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon"><Info /></Button>
  </TooltipTrigger>
  <TooltipContent>Info</TooltipContent>
</Tooltip>`
        },
        {
          title: "Positions",
          description: "Tooltips can be positioned on any side.",
          preview: (
            <div className="flex flex-wrap gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Top</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Tooltip on top</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Right</Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Tooltip on right</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Tooltip on bottom</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Left</Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Tooltip on left</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ),
          code: `<TooltipContent side="right">Right</TooltipContent>
<TooltipContent side="bottom">Bottom</TooltipContent>`
        }
      ]}
    />
  );
}