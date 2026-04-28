import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";

export function AvatarPage() {
  return (
    <ComponentShowcase
      title="Avatar"
      description="An image element with a fallback for representing a user or entity. AvatarFallback is displayed automatically when the image fails to load."
      category="Data Display"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=cesionbnk" alt="@cesionbnk" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      }
      
      // Main Code
      code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?u=cesionbnk" alt="@cesionbnk" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "src",
          type: "string",
          description: "The source URL of the image (for AvatarImage).",
        },
        {
          name: "alt",
          type: "string",
          description: "Alternative text for the image (for AvatarImage).",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for styling.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Different Sizes",
          description: "You can control the size using Tailwind classes.",
          preview: (
            <div className="flex items-center gap-4">
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="size-14">
                <AvatarFallback className="text-lg">LG</AvatarFallback>
              </Avatar>
              <Avatar className="size-20">
                <AvatarFallback className="text-xl">XL</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar className="size-8">...</Avatar>
<Avatar className="size-14">...</Avatar>
<Avatar className="size-20">...</Avatar>`
        },
        {
          title: "Avatar Group",
          description: "Avatars can be grouped by overlapping them with negative margins.",
          preview: (
            <div className="flex -space-x-4">
              <Avatar className="border-2 border-background">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background">
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background bg-muted">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>MK</AvatarFallback>
  </Avatar>
  {/* ... */}
</div>`
        }
      ]}
    />
  );
}