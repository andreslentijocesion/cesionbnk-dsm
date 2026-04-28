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
export { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
export { SplitButton } from '../components/ui/split-button';

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
} from '../components/ui/radio-group';
export { MultiSelect } from '../components/ui/multi-select';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../components/ui/input-otp';
export { InputFile } from '../components/ui/input-file';
export { Calendar } from '../components/ui/calendar';
export { DateRangePicker } from '../components/ui/date-range-picker';

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
} from '../components/ui/navigation-menu';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
export { ScrollArea, ScrollBar } from '../components/ui/scroll-area';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '../components/ui/command';

// ── Menus ──────────────────────────────────────────────────────────────────
export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
export {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent,
  ContextMenuGroup, ContextMenuItem, ContextMenuLabel,
  ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from '../components/ui/context-menu';

// ── Data Display ───────────────────────────────────────────────────────────
export { AspectRatio } from '../components/ui/aspect-ratio';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
export {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow,
} from '../components/ui/table';
export { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
export { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
export { EmptyState } from '../components/ui/empty-state';

// ── Feedback / Overlays ────────────────────────────────────────────────────
export { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
export {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '../components/ui/alert-dialog';
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
export { Spinner, CardSkeleton, TableSkeleton } from '../components/ui/loading-states';

// ── Form / Input Variants ───────────────────────────────────────────────────
export { NumberInput } from '../components/ui/number-input';
export { CurrencyInput } from '../components/ui/currency-input';
export { MaskedInput } from '../components/ui/masked-input';
export { TagInput } from '../components/ui/tag-input';
export { TextareaAutoresize } from '../components/ui/textarea-autoresize';

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
export { PageLayout, SplitLayout, StackLayout } from '../components/ui/page-layout';
export {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from '../components/ui/carousel';
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable';
export { BottomSheet } from '../components/ui/bottom-sheet';

// ── Components ──────────────────────────────────────────────────────────────
export { Stepper } from '../components/ui/stepper';
export { DateNavigator } from '../components/ui/date-navigator';
export { ProgressWithRange } from '../components/ui/progress-with-range';
export { InlineBanner } from '../components/ui/inline-banner';
export { FloatingActionButton } from '../components/ui/floating-action-button';
export { ToggleButtonGroup } from '../components/ui/toggle-button-group';
export { LoadingOverlay, InlineSpinner } from '../components/ui/loading-overlay';
export { ErrorBoundary } from '../components/ui/error-boundary';

// ── Advanced / Data ─────────────────────────────────────────────────────────
export { DataTable } from '../components/advanced/data-table';
export { MasterDataGrid } from '../components/advanced/master-data-grid';

// ── Advanced / Factoring ─────────────────────────────────────────────────────
export { Combobox } from '../components/advanced/combobox';
export { FileUploader } from '../components/advanced/file-uploader';
export type { SparklineData } from '../components/advanced/sparkline';
export { Sparkline } from '../components/advanced/sparkline';
export { GaugeChart } from '../components/advanced/gauge-chart';
export type { FunnelStage } from '../components/advanced/funnel-chart';
export { FunnelChart } from '../components/advanced/funnel-chart';
export type { Step } from '../components/advanced/step-indicator';
export { StepIndicator } from '../components/advanced/step-indicator';
export { VirtualizedList } from '../components/advanced/virtualized-list';
export type { TreemapData } from '../components/advanced/treemap-chart';
export { TreemapChart } from '../components/advanced/treemap-chart';
export type { HeatmapCell } from '../components/advanced/heatmap';
export { Heatmap } from '../components/advanced/heatmap';
export { InfiniteScroll } from '../components/advanced/infinite-scroll';
export { RichTextEditor } from '../components/advanced/rich-text-editor';

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
} from '../components/ui/skeleton-variants';
