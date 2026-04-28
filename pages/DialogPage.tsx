import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { AlertCircle, Trash2, Upload, UserPlus, Settings, Mail } from "lucide-react";

export function DialogPage() {
  return (
    <ComponentShowcase
      title="Dialog"
      description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
      category="Feedback"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Basic Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">With Form</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action is permanent and cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
      
      // Main Code
      code={`import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`}
      

      
      // Props Documentation
      props={[
        {
          name: "open",
          type: "boolean",
          description: "Controlled state of the dialog (open/closed)",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Initial state of the dialog (uncontrolled component)",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback that fires when the dialog state changes",
        },
        {
          name: "modal",
          type: "boolean",
          default: "true",
          description: "If true, blocks interaction with the content below the dialog",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Form",
          description: "Dialog with complete form and validation",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="mr-2 size-4" />
                  Create Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Account</DialogTitle>
                  <DialogDescription>
                    Fill in the information below to create your account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="johndoe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email-form">Email</Label>
                    <Input id="email-form" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Create Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Account</DialogTitle>
      <DialogDescription>
        Fill in the information below.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Username" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
        },
        {
          title: "Destructive Action",
          description: "Dialog to confirm destructive actions with warning",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 size-4" />
                  Delete Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-destructive/10 rounded-full">
                      <AlertCircle className="size-5 text-destructive" />
                    </div>
                    <DialogTitle>Delete Item</DialogTitle>
                  </div>
                  <DialogDescription>
                    Are you sure you want to delete this item? This action cannot be undone
                    and will permanently remove the item from your account.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 size-4" />
                    Delete Permanently
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Item</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <div className="flex items-center gap-2">
        <AlertCircle className="size-5 text-destructive" />
        <DialogTitle>Delete Item</DialogTitle>
      </div>
      <DialogDescription>
        Are you sure? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
        },
        {
          title: "Custom Width",
          description: "Dialog with custom width",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Large Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Large Dialog Example</DialogTitle>
                  <DialogDescription>
                    This dialog has a larger maximum width for more content.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Textarea placeholder="Additional comments..." rows={4} />
                </div>
                <DialogFooter>
                  <Button>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<DialogContent className="sm:max-w-2xl">
  <DialogHeader>
    <DialogTitle>Large Dialog</DialogTitle>
  </DialogHeader>
  {/* Content */}
</DialogContent>`
        },
        {
          title: "Scrollable Content",
          description: "Dialog with content that exceeds the height and scrolls",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Scrollable Dialog</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[600px]">
                <DialogHeader>
                  <DialogTitle>Terms and Conditions</DialogTitle>
                  <DialogDescription>
                    Please read and accept our terms and conditions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto max-h-[400px]">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-semibold">Section {i + 1}</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Decline</Button>
                  </DialogClose>
                  <Button>Accept</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<DialogContent className="max-h-[600px]">
  <DialogHeader>
    <DialogTitle>Terms and Conditions</DialogTitle>
  </DialogHeader>
  <div className="overflow-y-auto max-h-[400px]">
    {/* Scrollable content */}
  </div>
  <DialogFooter>
    <Button>Accept</Button>
  </DialogFooter>
</DialogContent>`
        },
        {
          title: "Upload Dialog",
          description: "Dialog for uploading files with preview",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 size-4" />
                  Upload Files
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Files</DialogTitle>
                  <DialogDescription>
                    Drag and drop files here or click to browse.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted transition-colors cursor-pointer">
                    <Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Upload Files</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upload Files</DialogTitle>
    </DialogHeader>
    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <Upload className="size-8 mx-auto mb-2" />
      <p>Click to upload or drag and drop</p>
    </div>
    <DialogFooter>
      <Button>Upload</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
        },
        {
          title: "Settings Dialog",
          description: "Settings dialog with multiple sections",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 size-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                  <DialogDescription>
                    Manage your account settings and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Profile</h4>
                    <div className="grid gap-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Email</h4>
                    <div className="grid gap-2">
                      <Label htmlFor="settings-email">Email Address</Label>
                      <Input id="settings-email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Notifications</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <input type="checkbox" id="email-notif" className="size-4" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>Settings</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
    </DialogHeader>
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <h4>Profile</h4>
        <Input placeholder="Display Name" />
      </div>
      {/* More sections */}
    </div>
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`
        },
        {
          title: "Controlled Dialog",
          description: "Controlled dialog with external state",
          preview: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="mr-2 size-4" />
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message</DialogTitle>
                  <DialogDescription>
                    Compose your message below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input id="recipient" placeholder="recipient@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Message subject" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message..." rows={5} />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `import { useState } from "react";

function ControlledDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        {/* Content */}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`
        }
      ]}
    />
  );
}