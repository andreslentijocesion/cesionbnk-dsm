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
export { Button, buttonVariants } from '../components/ui/Button';
export { Badge, badgeVariants } from '../components/ui/Badge';
export { Input } from '../components/ui/Input';
export { Label } from '../components/ui/Label';
export { Textarea } from '../components/ui/Textarea';
export { Checkbox } from '../components/ui/Checkbox';
export { Switch } from '../components/ui/Switch';
export { Slider } from '../components/ui/Slider';
export { Separator } from '../components/ui/Separator';
export { Progress } from '../components/ui/Progress';
export { Skeleton } from '../components/ui/Skeleton';
export { Toggle, toggleVariants } from '../components/ui/Toggle';
export { ToggleGroup, ToggleGroupItem } from '../components/ui/ToggleGroup';
export { SplitButton } from '../components/ui/SplitButton';

// ── Form ───────────────────────────────────────────────────────────────────
export {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
  useFormField,
} from '../components/ui/Form';
export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectSeparator, SelectTrigger, SelectValue,
} from '../components/ui/Select';
export {
  RadioGroup, RadioGroupItem,
} from '../components/ui/RadioGroup';
export { MultiSelect } from '../components/ui/MultiSelect';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../components/ui/InputOTP';
export { InputFile } from '../components/ui/InputFile';
export { Calendar } from '../components/ui/Calendar';
export { DateRangePicker } from '../components/ui/DateRangePicker';

// ── Layout / Navigation ────────────────────────────────────────────────────
export { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
export {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '../components/ui/Breadcrumb';
export {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from '../components/ui/Pagination';
export {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/ui/NavigationMenu';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/Accordion';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/Collapsible';
export { ScrollArea, ScrollBar } from '../components/ui/ScrollArea';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '../components/ui/Command';

// ── Menus ──────────────────────────────────────────────────────────────────
export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from '../components/ui/DropdownMenu';
export {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuLabel,
  ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from '../components/ui/ContextMenu';

// ── Data Display ───────────────────────────────────────────────────────────
export { AspectRatio } from '../components/ui/AspectRatio';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
export {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow,
} from '../components/ui/Table';
export { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
export { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/HoverCard';
export { EmptyState } from '../components/ui/EmptyState';

// ── Feedback / Overlays ────────────────────────────────────────────────────
export { Alert, AlertDescription, AlertTitle } from '../components/ui/Alert';
export {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '../components/ui/AlertDialog';
export {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '../components/ui/Dialog';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/Tooltip';
export { Popover, PopoverContent, PopoverTrigger } from '../components/ui/Popover';
export {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from '../components/ui/Sheet';
export { Toaster } from '../components/ui/Sonner';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/Drawer';
export { Spinner, CardSkeleton, TableSkeleton } from '../components/ui/LoadingStates';

// ── Form / Input Variants ───────────────────────────────────────────────────
export { NumberInput } from '../components/ui/NumberInput';
export { CurrencyInput } from '../components/ui/CurrencyInput';
export { MaskedInput } from '../components/ui/MaskedInput';
export { TagInput } from '../components/ui/TagInput';
export { TextareaAutoresize } from '../components/ui/TextareaAutoresize';

// ── Navigation / Layout ─────────────────────────────────────────────────────
export {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput,
  SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub,
  SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail,
  SidebarSeparator, SidebarTrigger, useSidebar,
} from '../components/ui/Sidebar';
export {
  Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub,
  MenubarSubTrigger, MenubarSubContent,
} from '../components/ui/Menubar';
export { PageLayout, SplitLayout, StackLayout } from '../components/ui/PageLayout';
export {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from '../components/ui/Carousel';
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/Resizable';
export { BottomSheet } from '../components/ui/BottomSheet';

// ── Components ──────────────────────────────────────────────────────────────
export { Stepper } from '../components/ui/Stepper';
export { DateNavigator } from '../components/ui/DateNavigator';
export { ProgressWithRange } from '../components/ui/ProgressWithRange';
export { InlineBanner } from '../components/ui/InlineBanner';
export { FloatingActionButton } from '../components/ui/FloatingActionButton';
export { ToggleButtonGroup } from '../components/ui/ToggleButtonGroup';
export { LoadingOverlay, InlineSpinner } from '../components/ui/LoadingOverlay';
export { ErrorBoundary } from '../components/ui/ErrorBoundary';

// ── Advanced / Data ─────────────────────────────────────────────────────────
export { DataTable } from '../components/advanced/DataTable';
export { MasterDataGrid } from '../components/advanced/MasterDataGrid';

// ── Advanced / Factoring ─────────────────────────────────────────────────────
export { Combobox } from '../components/advanced/Combobox';
export { FileUploader } from '../components/advanced/FileUploader';
export type { SparklineData } from '../components/advanced/Sparkline';
export { Sparkline } from '../components/advanced/Sparkline';
export { GaugeChart } from '../components/advanced/GaugeChart';
export type { FunnelStage } from '../components/advanced/FunnelChart';
export { FunnelChart } from '../components/advanced/FunnelChart';
export type { Step } from '../components/advanced/StepIndicator';
export { StepIndicator } from '../components/advanced/StepIndicator';
export { VirtualizedList } from '../components/advanced/VirtualizedList';
export type { TreemapData } from '../components/advanced/TreemapChart';
export { TreemapChart } from '../components/advanced/TreemapChart';
export type { HeatmapCell } from '../components/advanced/Heatmap';
export { Heatmap } from '../components/advanced/Heatmap';
export { InfiniteScroll } from '../components/advanced/InfiniteScroll';
export { RichTextEditor } from '../components/advanced/RichTextEditor';

// ── Charts ──────────────────────────────────────────────────────────────────
export type { ChartConfig } from '../components/ui/Chart';
export {
  ChartContainer, ChartTooltip, ChartTooltipContent,
  ChartLegend, ChartLegendContent, ChartStyle,
} from '../components/ui/Chart';

// ── Skeleton Variants ───────────────────────────────────────────────────────
export {
  SkeletonTable, SkeletonCard, SkeletonCardGrid,
  SkeletonForm, SkeletonList, SkeletonDashboard,
  SkeletonKpiCard, SkeletonKpiCardGroup, SkeletonProfile,
} from '../components/ui/SkeletonVariants';
