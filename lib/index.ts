/**
 * @cesionbnk/dsm — Public API
 * Import components from this entry point in external apps.
 *
 * Usage:
 *   import { Button, Badge, Card } from '@cesionbnk/dsm'
 */

// ── Utilities ──────────────────────────────────────────────────────────────
export { cn } from '../components/ui/utils';

// ── Primitives ─────────────────────────────────────────────────────────────
export { Button, buttonVariants } from '../components/ui/button';
export { Badge, badgeVariants } from '../components/ui/badge';
export { Input } from '../components/ui/input';
export { Label } from '../components/ui/label';
export { Textarea } from '../components/ui/textarea';
export { Checkbox } from '../components/ui/checkbox';
export { Switch } from '../components/ui/switch';
export { Slider } from '../components/ui/slider';
export { Separator } from '../components/ui/separator';
export { Progress } from '../components/ui/progress';
export { Skeleton } from '../components/ui/skeleton';
export { Toggle, toggleVariants } from '../components/ui/toggle';
export { ToggleGroup, ToggleGroupItem } from '../components/ui/togglegroup';
export { SplitButton } from '../components/ui/splitbutton';

// ── Form ───────────────────────────────────────────────────────────────────
export {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
  useFormField,
} from '../components/ui/form';
export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectSeparator, SelectTrigger, SelectValue,
} from '../components/ui/select';
export {
  RadioGroup, RadioGroupItem,
} from '../components/ui/radiogroup';
export { MultiSelect } from '../components/ui/multiselect';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../components/ui/inputotp';
export { InputFile } from '../components/ui/inputfile';
export { Calendar } from '../components/ui/calendar';
export { DateRangePicker } from '../components/ui/daterangepicker';

// ── Layout / Navigation ────────────────────────────────────────────────────
export { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
export {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '../components/ui/breadcrumb';
export {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '../components/ui/pagination';
export {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/ui/navigationmenu';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
export { ScrollArea, ScrollBar } from '../components/ui/scrollarea';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '../components/ui/command';

// ── Menus ──────────────────────────────────────────────────────────────────
export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from '../components/ui/dropdownmenu';
export {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuLabel,
  ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from '../components/ui/contextmenu';

// ── Data Display ───────────────────────────────────────────────────────────
export { AspectRatio } from '../components/ui/aspectratio';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
export {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow,
} from '../components/ui/table';
export { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
export { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hovercard';
export { EmptyState } from '../components/ui/emptystate';

// ── Feedback / Overlays ────────────────────────────────────────────────────
export { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
export {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '../components/ui/alertdialog';
export {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '../components/ui/dialog';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
export { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
export {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from '../components/ui/sheet';
export { Toaster } from '../components/ui/sonner';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer';
export { Spinner, CardSkeleton, TableSkeleton } from '../components/ui/loadingstates';

// ── Form / Input Variants ───────────────────────────────────────────────────
export { NumberInput } from '../components/ui/numberinput';
export { CurrencyInput } from '../components/ui/currencyinput';
export { MaskedInput } from '../components/ui/maskedinput';
export { TagInput } from '../components/ui/taginput';
export { TextareaAutoresize } from '../components/ui/textareaautoresize';

// ── Navigation / Layout ─────────────────────────────────────────────────────
export {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput,
  SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub,
  SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail,
  SidebarSeparator, SidebarTrigger, useSidebar,
} from '../components/ui/sidebar';
export {
  Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub,
  MenubarSubTrigger, MenubarSubContent,
} from '../components/ui/menubar';
export { PageLayout, SplitLayout, StackLayout } from '../components/ui/pagelayout';
export {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from '../components/ui/carousel';
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable';
export { BottomSheet } from '../components/ui/bottomsheet';

// ── Components ──────────────────────────────────────────────────────────────
export { Stepper } from '../components/ui/stepper';
export { DateNavigator } from '../components/ui/datenavigator';
export { ProgressWithRange } from '../components/ui/progresswithrange';
export { InlineBanner } from '../components/ui/inlinebanner';
export { FloatingActionButton } from '../components/ui/floatingactionbutton';
export { ToggleButtonGroup } from '../components/ui/togglebuttongroup';
export { LoadingOverlay, InlineSpinner } from '../components/ui/loadingoverlay';
export { ErrorBoundary } from '../components/ui/errorboundary';

// ── Advanced / Data ─────────────────────────────────────────────────────────
export * from '../components/advanced';


// ── Charts ──────────────────────────────────────────────────────────────────
export type { ChartConfig } from '../components/ui/chart';
export {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, ChartStyle,
} from '../components/ui/chart';

// ── Skeleton Variants ───────────────────────────────────────────────────────
export {
  SkeletonTable, SkeletonCard, SkeletonCardGrid,
  SkeletonForm, SkeletonList, SkeletonDashboard,
  SkeletonKpiCard, SkeletonKpiCardGroup, SkeletonProfile,
} from '../components/ui/skeletonvariants';
