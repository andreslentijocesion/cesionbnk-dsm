import { ComponentShowcase } from "../components/ui/component-showcase";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { CalendarDays, MapPin, Mail, ExternalLink } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

export function HoverCardPage() {
  return (
    <ComponentShowcase
      title="Hover Card"
      description="For sighted users to preview content available behind a link."
      category="Data Display"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto font-semibold">
              @cesionbnk
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@cesionbnk</h4>
                <p className="text-sm text-muted-foreground">
                  Plataforma financiera de cesiones — creada y mantenida por CESIONBNK.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">
                    Joined January 2025
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      }
      
      // Main Code
      code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>
        Plataforma financiera de cesiones — creada y mantenida por CESIONBNK.
      </HoverCardContent>
    </HoverCard>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "openDelay",
          type: "number",
          default: "700",
          description: "Duration in ms before the hover card opens.",
        },
        {
          name: "closeDelay",
          type: "number",
          default: "300",
          description: "Duration in ms before the hover card closes.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Link Preview",
          description: "Preview external links.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" className="p-0 h-auto">
                  shadcn/ui
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-semibold">shadcn/ui</h4>
                  <p className="text-sm text-muted-foreground">
                    Beautifully designed components built with Radix UI and Tailwind CSS.
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs text-muted-foreground">ui.shadcn.com</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger>Link</HoverCardTrigger>
  <HoverCardContent>Preview</HoverCardContent>
</HoverCard>`
        },
        {
          title: "Team Member",
          description: "Show team member details.",
          preview: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Product Manager</p>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 opacity-70" />
                      <span className="text-muted-foreground">john@company.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 opacity-70" />
                      <span className="text-muted-foreground">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          code: `<HoverCard>
  <HoverCardTrigger>Profile</HoverCardTrigger>
  <HoverCardContent>Details</HoverCardContent>
</HoverCard>`
        }
      ]}
    />
  );
}