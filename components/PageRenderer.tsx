/**
 * PageRenderer — Routes a PageId to its page component.
 *
 * Uses a typed Record<PageId, () => ReactElement> map instead of a switch statement.
 * TypeScript will error at compile time if any PageId lacks a route entry.
 *
 * When adding a new page:
 *   1. Add the id to ITEMS_SPEC in registry.ts
 *   2. Import the page component below
 *   3. Add an entry to NAV_ROUTES
 */
import type { PageId, NavPageId, SpecialPageId } from "./types/PageId";
import type { ReactElement } from "react";

// ── Page imports ───────────────────────────────────────────────────────────────
import {
  // Home
  HomePage,
  DSMDashboardPage,
  // Actions
  ButtonPage,
  TogglePage,
  ToggleGroupPage,
  SplitButtonPage,
  FabPage,
  // Forms
  InputPage,
  CurrencyInputPage,
  MaskedInputPage,
  NumberInputPage,
  StepperPage,
  TagInputPage,
  DateNavigatorPage,
  TextareaPage,
  TextareaAutoresizePage,
  SelectPage,
  CheckboxPage,
  RadioGroupPage,
  SwitchPage,
  SliderPage,
  CalendarPage,
  DatePickerPage,
  DateRangePickerPage,
  InputOTPPage,
  InputFilePage,
  ComboboxPage,
  MultiSelectPage,
  FormPage,
  LabelPage,
  // Navigation
  TabsPage,
  BreadcrumbPage,
  CommandPage,
  DropdownMenuPage,
  ContextMenuPage,
  NavigationMenuPage,
  PaginationPage,
  MenubarPage,
  // Data Display
  CardPage,
  TablePage,
  BadgePage,
  AvatarPage,
  SeparatorPage,
  HoverCardPage,
  // Feedback
  AlertPage,
  InlineBannerPage,
  AlertDialogPage,
  DialogPage,
  ToastPage,
  TooltipPage,
  ProgressPage,
  ProgressWithRangePage,
  SkeletonPage,
  SheetPage,
  DrawerPage,
  PopoverPage,
  EmptyStatePage,
  ErrorBoundaryPage,
  BottomSheetPage,
  LoadingStatesPage,
  // Layout
  AccordionPage,
  CollapsiblePage,
  CarouselPage,
  ScrollAreaPage,
  SidebarShowcasePage,
  AppLayoutPage,
  // Patterns
  DataTableAdvancedPage,
  FactoringDashboardPage,
  FactoringPortfolioTablePage,
  FactoringNewOperationPage,
  FactoringApprovalQueuePage,
  FactoringCedentListPage,
  FactoringCedentProfilePage,
  FactoringDebtorListPage,
  FactoringMaturityAlertsPage,
  FactoringPortfolioReportPage,
  FactoringCalculatorPage,
  FactoringStatusCardPage,
  AdvancedFilterPanelPage,
  EditableTablePage,
  MultiStepWizardPage,
  MultiStepFormPage,
  NotificationCenterPage,
  TimelinePage,
  FileViewerPage,
  StatCardPage,
  AgingReportPage,
  AuditLogPage,
  CreditScoreCardPage,
  ApprovalFlowPage,
  ExportPanelPage,
  OnboardingPage,
  BulkActionToolbarPage,
  CommentThreadPage,
  DocumentChecklistPage,
  DetailCardPage,
  OperationStatusPipelinePage,
  RiskIndicatorPage,
  SignaturePanelPage,
  // Advanced
  ChartsPage,
  AdvancedFormsPage,
  DataTablePage,
  FileUploaderPage,
  InfiniteScrollPage,
  RichTextEditorPage,
  // Design System & Resources
  BrandLayoutPage,
  DesignTokensPage,
  HelpSystemDemoPage,
  AnimationsPage,
  IconGalleryPage,
} from "../pages";
import { DSMVisualAuditPage } from "../pages/DSMVisualAuditPage";
import { ComponentGuidelinesPage } from "../pages/ComponentGuidelinesPage";
import { ThemeExplorerPage } from "../pages/ThemeExplorerPage";

// ── Route maps ─────────────────────────────────────────────────────────────────

/**
 * NAV_ROUTES — must contain every NavPageId from registry.ts.
 * TypeScript will error if any id is missing or misspelled.
 */
const NAV_ROUTES: Record<NavPageId, () => ReactElement> = {
  // Actions
  button:        () => <ButtonPage />,
  toggle:        () => <TogglePage />,
  "toggle-group": () => <ToggleGroupPage />,
  "split-button": () => <SplitButtonPage />,
  fab:           () => <FabPage />,

  // Forms
  input:               () => <InputPage />,
  "currency-input":    () => <CurrencyInputPage />,
  "masked-input":      () => <MaskedInputPage />,
  "number-input":      () => <NumberInputPage />,
  stepper:             () => <StepperPage />,
  "tag-input":         () => <TagInputPage />,
  "date-navigator":    () => <DateNavigatorPage />,
  textarea:             () => <TextareaPage />,
  "textarea-autoresize": () => <TextareaAutoresizePage />,
  select:               () => <SelectPage />,
  checkbox:             () => <CheckboxPage />,
  "radio-group":        () => <RadioGroupPage />,
  switch:               () => <SwitchPage />,
  slider:               () => <SliderPage />,
  calendar:             () => <CalendarPage />,
  "date-picker":        () => <DatePickerPage />,
  "date-range-picker":  () => <DateRangePickerPage />,
  "input-otp":          () => <InputOTPPage />,
  "input-file":         () => <InputFilePage />,
  combobox:             () => <ComboboxPage />,
  "multi-select":       () => <MultiSelectPage />,
  form:                 () => <FormPage />,
  label:                () => <LabelPage />,

  // Navigation
  tabs:              () => <TabsPage />,
  breadcrumb:        () => <BreadcrumbPage />,
  command:           () => <CommandPage />,
  "dropdown-menu":   () => <DropdownMenuPage />,
  "context-menu":    () => <ContextMenuPage />,
  "navigation-menu": () => <NavigationMenuPage />,
  pagination:        () => <PaginationPage />,
  menubar:           () => <MenubarPage />,

  // Data Display
  card:         () => <CardPage />,
  table:        () => <TablePage />,
  badge:        () => <BadgePage />,
  avatar:       () => <AvatarPage />,
  separator:    () => <SeparatorPage />,
  "hover-card": () => <HoverCardPage />,

  // Feedback
  alert:                () => <AlertPage />,
  "inline-banner":      () => <InlineBannerPage />,
  "alert-dialog":       () => <AlertDialogPage />,
  dialog:               () => <DialogPage />,
  toast:                () => <ToastPage />,
  tooltip:              () => <TooltipPage />,
  progress:             () => <ProgressPage />,
  "progress-with-range": () => <ProgressWithRangePage />,
  skeleton:             () => <SkeletonPage />,
  sheet:                () => <SheetPage />,
  drawer:               () => <DrawerPage />,
  popover:              () => <PopoverPage />,
  "empty-state":        () => <EmptyStatePage />,
  "error-boundary":     () => <ErrorBoundaryPage />,
  "bottom-sheet":       () => <BottomSheetPage />,
  "loading-states":     () => <LoadingStatesPage />,

  // Layout
  accordion:          () => <AccordionPage />,
  collapsible:        () => <CollapsiblePage />,
  carousel:           () => <CarouselPage />,
  "scroll-area":      () => <ScrollAreaPage />,
  "sidebar-showcase": () => <SidebarShowcasePage />,
  "app-layout":       () => <AppLayoutPage />,

  // Patterns
  "data-table-advanced":             () => <DataTableAdvancedPage />,
  "factoring-dashboard":             () => <FactoringDashboardPage />,
  "factoring-portfolio":             () => <FactoringPortfolioTablePage />,
  "factoring-new-operation":         () => <FactoringNewOperationPage />,
  "factoring-approval-queue":        () => <FactoringApprovalQueuePage />,
  "factoring-cedent-list":           () => <FactoringCedentListPage />,
  "factoring-cedent-profile":        () => <FactoringCedentProfilePage />,
  "factoring-debtor-list":           () => <FactoringDebtorListPage />,
  "factoring-maturity-alerts":       () => <FactoringMaturityAlertsPage />,
  "factoring-portfolio-report":      () => <FactoringPortfolioReportPage />,
  "factoring-calculator":            () => <FactoringCalculatorPage />,
  "factoring-status-card":           () => <FactoringStatusCardPage />,
  "advanced-filter":                 () => <AdvancedFilterPanelPage />,
  "editable-table":                  () => <EditableTablePage />,
  "multi-step-wizard":               () => <MultiStepWizardPage />,
  "multi-step-form":                 () => <MultiStepFormPage />,
  "notification-center":             () => <NotificationCenterPage />,
  timeline:                          () => <TimelinePage />,
  "file-viewer":                     () => <FileViewerPage />,
  "stat-card":                       () => <StatCardPage />,
  "aging-report":                    () => <AgingReportPage />,
  "audit-log":                       () => <AuditLogPage />,
  "credit-score-card":               () => <CreditScoreCardPage />,
  "approval-flow":                   () => <ApprovalFlowPage />,
  "export-panel":                    () => <ExportPanelPage />,
  onboarding:                        () => <OnboardingPage />,
  "bulk-action-toolbar":             () => <BulkActionToolbarPage />,
  "comment-thread":                  () => <CommentThreadPage />,
  "document-checklist":              () => <DocumentChecklistPage />,
  "detail-card":                     () => <DetailCardPage />,
  "operation-status-pipeline":       () => <OperationStatusPipelinePage />,
  "risk-indicator":                  () => <RiskIndicatorPage />,
  "signature-panel":                 () => <SignaturePanelPage />,

  // Advanced
  charts:             () => <ChartsPage />,
  "advanced-forms":   () => <AdvancedFormsPage />,
  "data-table":       () => <DataTablePage />,
  "file-uploader":    () => <FileUploaderPage />,
  "infinite-scroll":  () => <InfiniteScrollPage />,
  "rich-text-editor": () => <RichTextEditorPage />,
};

/** Special pages not in the registry nav (home, design system, resources, legacy) */
const SPECIAL_ROUTES: Record<SpecialPageId, () => ReactElement> = {
  home:               () => <HomePage />,
  "dsm-dashboard":    () => <DSMDashboardPage />,
  "brand-layout":     () => <BrandLayoutPage />,
  "design-tokens":    () => <DesignTokensPage />,
  "help-system-demo": () => <HelpSystemDemoPage />,
  animations:         () => <AnimationsPage />,
  "icon-gallery":     () => <IconGalleryPage />,
  "dsm-visual-audit":     () => <DSMVisualAuditPage />,
  "component-guidelines": () => <ComponentGuidelinesPage />,
  "theme-explorer":       () => <ThemeExplorerPage />,
  changelog:              () => <DSMDashboardPage />, // legacy alias
};

/** Merged route map — TypeScript ensures all PageIds are covered */
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
  return render ? render() : <HomePage />;
}
