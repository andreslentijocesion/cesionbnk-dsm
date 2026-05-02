/**
 * PageRenderer — Routes a PageId to its page component with Dynamic Loading.
 *
 * v4.1.0 — Implements React.lazy + Suspense for code-splitting.
 * This ensures we only download the code for the specific page being viewed,
 * drastically reducing the initial bundle size (from 2.5MB+ to ~1.5MB main chunk).
 */
import { lazy, Suspense, ReactElement } from "react";
import type { PageId, NavPageId, SpecialPageId } from "../types/PageId";
import { Skeleton } from "../ui/Skeleton";

// ── Helper for named lazy imports ──────────────────────────────────────────────

const PAGES = import.meta.glob("../../pages/*.tsx");

/** Helper to lazy load named exports from specific page files for real code-splitting */
const lazyPage = (name: string) => {
  const path = `../../pages/${name}.tsx`;
  const loader = PAGES[path];

  if (!loader) {
    return lazy(async () => ({
      default: () => (
        <div className="p-8 text-destructive">
          Error: Page component <b>{name}</b> not found at {path}
        </div>
      ),
    }));
  }

  return lazy(() =>
    loader().then((module: any) => ({ default: module[name] }))
  );
};

// ── Lazy Page Definitions ──────────────────────────────────────────────────────

// Home
const HomePage = lazyPage("HomePage");
const DSMDashboardPage = lazyPage("DSMDashboardPage");

// Actions
const ButtonPage = lazyPage("ButtonPage");
const TogglePage = lazyPage("TogglePage");
const ToggleGroupPage = lazyPage("ToggleGroupPage");
const SplitButtonPage = lazyPage("SplitButtonPage");
const FabPage = lazyPage("FabPage");

// Forms
const InputPage = lazyPage("InputPage");
const CurrencyInputPage = lazyPage("CurrencyInputPage");
const MaskedInputPage = lazyPage("MaskedInputPage");
const NumberInputPage = lazyPage("NumberInputPage");
const StepperPage = lazyPage("StepperPage");
const TagInputPage = lazyPage("TagInputPage");
const DateNavigatorPage = lazyPage("DateNavigatorPage");
const TextareaPage = lazyPage("TextareaPage");
const TextareaAutoresizePage = lazyPage("TextareaAutoresizePage");
const SelectPage = lazyPage("SelectPage");
const CheckboxPage = lazyPage("CheckboxPage");
const RadioGroupPage = lazyPage("RadioGroupPage");
const SwitchPage = lazyPage("SwitchPage");
const SliderPage = lazyPage("SliderPage");
const CalendarPage = lazyPage("CalendarPage");
const DatePickerPage = lazyPage("DatePickerPage");
const DateRangePickerPage = lazyPage("DateRangePickerPage");
const InputOTPPage = lazyPage("InputOTPPage");
const InputFilePage = lazyPage("InputFilePage");
const ComboboxPage = lazyPage("ComboboxPage");
const MultiSelectPage = lazyPage("MultiSelectPage");
const FormPage = lazyPage("FormPage");
const LabelPage = lazyPage("LabelPage");

// Navigation
const TabsPage = lazyPage("TabsPage");
const BreadcrumbPage = lazyPage("BreadcrumbPage");
const CommandPage = lazyPage("CommandPage");
const DropdownMenuPage = lazyPage("DropdownMenuPage");
const ContextMenuPage = lazyPage("ContextMenuPage");
const NavigationMenuPage = lazyPage("NavigationMenuPage");
const PaginationPage = lazyPage("PaginationPage");
const MenubarPage = lazyPage("MenubarPage");

// Data Display
const CardPage = lazyPage("CardPage");
const TablePage = lazyPage("TablePage");
const BadgePage = lazyPage("BadgePage");
const AvatarPage = lazyPage("AvatarPage");
const SeparatorPage = lazyPage("SeparatorPage");
const HoverCardPage = lazyPage("HoverCardPage");

// Feedback
const AlertPage = lazyPage("AlertPage");
const InlineBannerPage = lazyPage("InlineBannerPage");
const AlertDialogPage = lazyPage("AlertDialogPage");
const DialogPage = lazyPage("DialogPage");
const ToastPage = lazyPage("ToastPage");
const TooltipPage = lazyPage("TooltipPage");
const ProgressPage = lazyPage("ProgressPage");
const ProgressWithRangePage = lazyPage("ProgressWithRangePage");
const SkeletonPage = lazyPage("SkeletonPage");
const SheetPage = lazyPage("SheetPage");
const DrawerPage = lazyPage("DrawerPage");
const PopoverPage = lazyPage("PopoverPage");
const EmptyStatePage = lazyPage("EmptyStatePage");
const ErrorBoundaryPage = lazyPage("ErrorBoundaryPage");
const BottomSheetPage = lazyPage("BottomSheetPage");
const LoadingStatesPage = lazyPage("LoadingStatesPage");

// Layout
const AccordionPage = lazyPage("AccordionPage");
const CollapsiblePage = lazyPage("CollapsiblePage");
const CarouselPage = lazyPage("CarouselPage");
const ScrollAreaPage = lazyPage("ScrollAreaPage");
const SidebarShowcasePage = lazyPage("SidebarShowcasePage");
const AppLayoutPage = lazyPage("AppLayoutPage");

// Patterns
const DataTableAdvancedPage = lazyPage("DataTableAdvancedPage");
const FactoringDashboardPage = lazyPage("FactoringDashboardPage");
const FactoringPortfolioTablePage = lazyPage("FactoringPortfolioTablePage");
const FactoringNewOperationPage = lazyPage("FactoringNewOperationPage");
const FactoringApprovalQueuePage = lazyPage("FactoringApprovalQueuePage");
const FactoringCedentListPage = lazyPage("FactoringCedentListPage");
const FactoringCedentProfilePage = lazyPage("FactoringCedentProfilePage");
const FactoringDebtorListPage = lazyPage("FactoringDebtorListPage");
const FactoringMaturityAlertsPage = lazyPage("FactoringMaturityAlertsPage");
const FactoringPortfolioReportPage = lazyPage("FactoringPortfolioReportPage");
const FactoringCalculatorPage = lazyPage("FactoringCalculatorPage");
const FactoringStatusCardPage = lazyPage("FactoringStatusCardPage");
const AdvancedFilterPanelPage = lazyPage("AdvancedFilterPanelPage");
const EditableTablePage = lazyPage("EditableTablePage");
const MultiStepWizardPage = lazyPage("MultiStepWizardPage");
const MultiStepFormPage = lazyPage("MultiStepFormPage");
const NotificationCenterPage = lazyPage("NotificationCenterPage");
const TimelinePage = lazyPage("TimelinePage");
const FileViewerPage = lazyPage("FileViewerPage");
const StatCardPage = lazyPage("StatCardPage");
const AgingReportPage = lazyPage("AgingReportPage");
const AuditLogPage = lazyPage("AuditLogPage");
const CreditScoreCardPage = lazyPage("CreditScoreCardPage");
const ApprovalFlowPage = lazyPage("ApprovalFlowPage");
const ExportPanelPage = lazyPage("ExportPanelPage");
const OnboardingPage = lazyPage("OnboardingPage");
const BulkActionToolbarPage = lazyPage("BulkActionToolbarPage");
const CommentThreadPage = lazyPage("CommentThreadPage");
const DocumentChecklistPage = lazyPage("DocumentChecklistPage");
const DetailCardPage = lazyPage("DetailCardPage");
const OperationStatusPipelinePage = lazyPage("OperationStatusPipelinePage");
const RiskIndicatorPage = lazyPage("RiskIndicatorPage");
const SignaturePanelPage = lazyPage("SignaturePanelPage");

// Advanced
const ChartsPage = lazyPage("ChartsPage");
const AdvancedFormsPage = lazyPage("AdvancedFormsPage");
const DataTablePage = lazyPage("DataTablePage");
const FileUploaderPage = lazyPage("FileUploaderPage");
const InfiniteScrollPage = lazyPage("InfiniteScrollPage");
const RichTextEditorPage = lazyPage("RichTextEditorPage");

// Design System & Resources
const BrandLayoutPage = lazyPage("BrandLayoutPage");
const DesignTokensPage = lazyPage("DesignTokensPage");
const HelpSystemDemoPage = lazyPage("HelpSystemDemoPage");
const AnimationsPage = lazyPage("AnimationsPage");
const IconGalleryPage = lazyPage("IconGalleryPage");
const DSMVisualAuditPage = lazyPage("DSMVisualAuditPage");
const ComponentGuidelinesPage = lazyPage("ComponentGuidelinesPage");
const ThemeExplorerPage = lazyPage("ThemeExplorerPage");

// ── Loading Fallback ───────────────────────────────────────────────────────────

function PageLoading() {
  return (
    <div className="space-y-6 animate-pulse p-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
}

// ── Route maps ─────────────────────────────────────────────────────────────────

const NAV_ROUTES: Record<NavPageId, () => ReactElement> = {
  button: () => <ButtonPage />,
  toggle: () => <TogglePage />,
  "toggle-group": () => <ToggleGroupPage />,
  "split-button": () => <SplitButtonPage />,
  fab: () => <FabPage />,
  input: () => <InputPage />,
  "currency-input": () => <CurrencyInputPage />,
  "masked-input": () => <MaskedInputPage />,
  "number-input": () => <NumberInputPage />,
  stepper: () => <StepperPage />,
  "tag-input": () => <TagInputPage />,
  "date-navigator": () => <DateNavigatorPage />,
  textarea: () => <TextareaPage />,
  "textarea-autoresize": () => <TextareaAutoresizePage />,
  select: () => <SelectPage />,
  checkbox: () => <CheckboxPage />,
  "radio-group": () => <RadioGroupPage />,
  switch: () => <SwitchPage />,
  slider: () => <SliderPage />,
  calendar: () => <CalendarPage />,
  "date-picker": () => <DatePickerPage />,
  "date-range-picker": () => <DateRangePickerPage />,
  "input-otp": () => <InputOTPPage />,
  "input-file": () => <InputFilePage />,
  combobox: () => <ComboboxPage />,
  "multi-select": () => <MultiSelectPage />,
  form: () => <FormPage />,
  label: () => <LabelPage />,
  tabs: () => <TabsPage />,
  breadcrumb: () => <BreadcrumbPage />,
  command: () => <CommandPage />,
  "dropdown-menu": () => <DropdownMenuPage />,
  "context-menu": () => <ContextMenuPage />,
  "navigation-menu": () => <NavigationMenuPage />,
  pagination: () => <PaginationPage />,
  menubar: () => <MenubarPage />,
  card: () => <CardPage />,
  table: () => <TablePage />,
  badge: () => <BadgePage />,
  avatar: () => <AvatarPage />,
  separator: () => <SeparatorPage />,
  "hover-card": () => <HoverCardPage />,
  alert: () => <AlertPage />,
  "inline-banner": () => <InlineBannerPage />,
  "alert-dialog": () => <AlertDialogPage />,
  dialog: () => <DialogPage />,
  toast: () => <ToastPage />,
  tooltip: () => <TooltipPage />,
  progress: () => <ProgressPage />,
  "progress-with-range": () => <ProgressWithRangePage />,
  skeleton: () => <SkeletonPage />,
  sheet: () => <SheetPage />,
  drawer: () => <DrawerPage />,
  popover: () => <PopoverPage />,
  "empty-state": () => <EmptyStatePage />,
  "error-boundary": () => <ErrorBoundaryPage />,
  "bottom-sheet": () => <BottomSheetPage />,
  "loading-states": () => <LoadingStatesPage />,
  accordion: () => <AccordionPage />,
  collapsible: () => <CollapsiblePage />,
  carousel: () => <CarouselPage />,
  "scroll-area": () => <ScrollAreaPage />,
  "sidebar-showcase": () => <SidebarShowcasePage />,
  "app-layout": () => <AppLayoutPage />,
  "data-table-advanced": () => <DataTableAdvancedPage />,
  "factoring-dashboard": () => <FactoringDashboardPage />,
  "factoring-portfolio": () => <FactoringPortfolioTablePage />,
  "factoring-new-operation": () => <FactoringNewOperationPage />,
  "factoring-approval-queue": () => <FactoringApprovalQueuePage />,
  "factoring-cedent-list": () => <FactoringCedentListPage />,
  "factoring-cedent-profile": () => <FactoringCedentProfilePage />,
  "factoring-debtor-list": () => <FactoringDebtorListPage />,
  "factoring-maturity-alerts": () => <FactoringMaturityAlertsPage />,
  "factoring-portfolio-report": () => <FactoringPortfolioReportPage />,
  "factoring-calculator": () => <FactoringCalculatorPage />,
  "factoring-status-card": () => <FactoringStatusCardPage />,
  "advanced-filter": () => <AdvancedFilterPanelPage />,
  "editable-table": () => <EditableTablePage />,
  "multi-step-wizard": () => <MultiStepWizardPage />,
  "multi-step-form": () => <MultiStepFormPage />,
  "notification-center": () => <NotificationCenterPage />,
  timeline: () => <TimelinePage />,
  "file-viewer": () => <FileViewerPage />,
  "stat-card": () => <StatCardPage />,
  "aging-report": () => <AgingReportPage />,
  "audit-log": () => <AuditLogPage />,
  "credit-score-card": () => <CreditScoreCardPage />,
  "approval-flow": () => <ApprovalFlowPage />,
  "export-panel": () => <ExportPanelPage />,
  onboarding: () => <OnboardingPage />,
  "bulk-action-toolbar": () => <BulkActionToolbarPage />,
  "comment-thread": () => <CommentThreadPage />,
  "document-checklist": () => <DocumentChecklistPage />,
  "detail-card": () => <DetailCardPage />,
  "operation-status-pipeline": () => <OperationStatusPipelinePage />,
  "risk-indicator": () => <RiskIndicatorPage />,
  "signature-panel": () => <SignaturePanelPage />,
  charts: () => <ChartsPage />,
  "advanced-forms": () => <AdvancedFormsPage />,
  "data-table": () => <DataTablePage />,
  "file-uploader": () => <FileUploaderPage />,
  "infinite-scroll": () => <InfiniteScrollPage />,
  "rich-text-editor": () => <RichTextEditorPage />,
};

const SPECIAL_ROUTES: Record<SpecialPageId, () => ReactElement> = {
  home: () => <HomePage />,
  "dsm-dashboard": () => <DSMDashboardPage />,
  "brand-layout": () => <BrandLayoutPage />,
  "design-tokens": () => <DesignTokensPage />,
  "help-system-demo": () => <HelpSystemDemoPage />,
  animations: () => <AnimationsPage />,
  "icon-gallery": () => <IconGalleryPage />,
  "dsm-visual-audit": () => <DSMVisualAuditPage />,
  "component-guidelines": () => <ComponentGuidelinesPage />,
  "theme-explorer": () => <ThemeExplorerPage />,
  changelog: () => <DSMDashboardPage />,
};

const ALL_ROUTES: Record<PageId, () => ReactElement> = {
  ...NAV_ROUTES,
  ...SPECIAL_ROUTES,
};

// ── Component ──────────────────────────────────────────────────────────────────

interface PageRendererProps {
  pageId: PageId;
}

export function PageRenderer({ pageId }: PageRendererProps) {
  const render = ALL_ROUTES[pageId];
  return (
    <Suspense fallback={<PageLoading />}>
      {render ? render() : <HomePage />}
    </Suspense>
  );
}
