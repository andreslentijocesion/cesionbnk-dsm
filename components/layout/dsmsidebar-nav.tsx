/**
 * DSMSidebarNav — Sidebar navigation for the DSM Showcase
 *
 * Data is derived from components/registry.ts — do NOT add nav items here.
 * To add a page: edit ITEMS_SPEC in registry.ts, then add a case in PageRenderer.tsx.
 */
import { useState } from "react";
import {
  MousePointerClick,
  FormInput,
  Compass,
  Grid3x3,
  MessageSquare,
  LayoutGrid,
  Layers,
  Sparkles,
  Landmark,
  Home,
  Search,
  X,
  Paintbrush,
  Scale,
  Zap,
  Clapperboard,
  ImageIcon,
  LayoutDashboard,
  ScanEye,
  History,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import {
  LayoutSidebarNav,
  LayoutSidebarGroup,
  LayoutSidebarCollapsibleGroup,
  LayoutSidebarItem,
  useAdminLayout,
} from "./app-layout/index";
import type { PageId } from "../types/PageId";
import { NAV_ITEMS, ITEMS_BY_SECTION, SECTIONS, type SectionId } from "../registry";

interface DSMSidebarNavProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
}

// ── Section icon mapping (presentation only — not in registry) ──────────────
const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  actions:        MousePointerClick,
  forms:          FormInput,
  navigation:     Compass,
  "data-display": Grid3x3,
  feedback:       MessageSquare,
  layout:         LayoutGrid,
  factoring:      Landmark,
  patterns:       Layers,
  advanced:       Sparkles,
};

// Which sections belong to "Components" group vs "Patterns & Advanced" group
const COMPONENT_SECTIONS: SectionId[] = [
  "actions", "forms", "navigation", "data-display", "feedback", "layout",
];
const PATTERN_SECTIONS: SectionId[] = ["factoring", "patterns", "advanced"];

// ── Special standalone pages (not in registry nav items) ────────────────────
const DESIGN_SYSTEM_PAGES: { id: PageId; label: string; icon: LucideIcon }[] = [
  { id: "dsm-dashboard",         label: "DSM Dashboard",       icon: LayoutDashboard },
  { id: "dsm-visual-audit",      label: "Visual Audit",        icon: ScanEye },
  { id: "component-guidelines",  label: "Usage Guidelines",    icon: BookOpen },
  { id: "theme-explorer",        label: "Theme Explorer",      icon: Paintbrush },
  { id: "changelog",             label: "Changelog",           icon: History },
  { id: "brand-layout",          label: "Brand Layout",        icon: Paintbrush },
  { id: "design-tokens",         label: "Design Tokens",       icon: Scale },
];

const RESOURCE_PAGES: { id: PageId; label: string; icon: LucideIcon }[] = [
  { id: "help-system-demo", label: "Help System",    icon: Zap },
  { id: "animations",       label: "Animations",     icon: Clapperboard },
  { id: "icon-gallery",     label: "Icon Gallery",   icon: ImageIcon },
];

// ── Component ────────────────────────────────────────────────────────────────

export function DSMSidebarNav({ activePage, onPageChange }: DSMSidebarNavProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isSidebarCollapsed, toggleSidebar } = useAdminLayout();

  const navigate = (page: PageId) => {
    onPageChange(page);
    toggleSidebar();
  };

  // Search across all nav items + special pages
  const allSearchable = [
    ...NAV_ITEMS.map((item) => ({
      id:          item.id as PageId,
      label:       item.label,
      sectionIcon: SECTION_ICONS[item.section],
    })),
    ...DESIGN_SYSTEM_PAGES.map((p) => ({ ...p, sectionIcon: p.icon })),
    ...RESOURCE_PAGES.map((p)       => ({ ...p, sectionIcon: p.icon })),
  ];

  const searchResults = searchQuery
    ? allSearchable.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const isSectionActive = (sectionId: SectionId) =>
    ITEMS_BY_SECTION[sectionId]?.some((item) => item.id === activePage) ?? false;

  // Render a set of collapsible section groups from an array of section IDs
  const renderSectionGroup = (sectionIds: SectionId[]) =>
    SECTIONS.filter((s) => sectionIds.includes(s.id)).map((section) => {
      const items = ITEMS_BY_SECTION[section.id] ?? [];
      const Icon  = SECTION_ICONS[section.id];
      return (
        <LayoutSidebarCollapsibleGroup
          key={section.id}
          label={section.label}
          icon={Icon}
          count={items.length}
          defaultOpen={isSectionActive(section.id)}
          
        >
          {items.map((item) => (
            <LayoutSidebarItem
              key={item.id}
              label={item.label}
              active={activePage === item.id}
              onClick={() => navigate(item.id as PageId)}
              className="py-1.5 px-2 text-xs"
            />
          ))}
        </LayoutSidebarCollapsibleGroup>
      );
    });

  return (
    <LayoutSidebarNav className="gap-1 no-scrollbar">
      {/* Home */}
      <LayoutSidebarItem
        icon={Home}
        label="Home"
        active={activePage === "home"}
        onClick={() => navigate("home")}
        
      />

      {/* Search (hidden when collapsed) */}
      {!isSidebarCollapsed && (
        <div className="px-0 pb-2">
          <div className="relative group/search">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground/50 transition-colors group-focus-within/search:text-primary" />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full rounded-[var(--radius)] bg-sidebar-accent/20 border border-sidebar-border/50 pl-9 pr-8 py-2 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-sidebar-accent/30 focus:border-primary/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2.5 text-sidebar-foreground/50 hover:text-sidebar-foreground p-0.5 hover:bg-sidebar-accent/50 rounded-sm transition-colors"
              >
                <X className="size-3.5 .5" />
              </button>
            )}
          </div>
        </div>
      )}

      {searchQuery ? (
        /* ── Search Results ── */
        <LayoutSidebarGroup label={`Results (${searchResults.length})`}>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <LayoutSidebarItem
                key={String(item.id)}
                icon={item.sectionIcon}
                label={item.label}
                active={activePage === item.id}
                onClick={() => navigate(item.id)}
              />
            ))
          ) : (
            <div className="px-4 py-8 flex flex-col items-center text-center gap-2">
              <div className="size-10 rounded-full bg-sidebar-accent/20 flex items-center justify-center text-sidebar-foreground/30">
                <Search className="size-5" />
              </div>
              <p className="text-sm text-sidebar-foreground/60">
                No results for &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          )}
        </LayoutSidebarGroup>
      ) : (
        <>
          {/* Components */}
          <LayoutSidebarGroup label={isSidebarCollapsed ? undefined : "Components"}>
            {renderSectionGroup(COMPONENT_SECTIONS)}
          </LayoutSidebarGroup>

          {/* Patterns & Advanced */}
          <LayoutSidebarGroup label={isSidebarCollapsed ? undefined : "Patterns & Advanced"}>
            {renderSectionGroup(PATTERN_SECTIONS)}
          </LayoutSidebarGroup>

          {/* Design System */}
          <LayoutSidebarGroup label={isSidebarCollapsed ? undefined : "DSM & Resources"}>
            {DESIGN_SYSTEM_PAGES.map((page) => (
              <LayoutSidebarItem
                key={String(page.id)}
                icon={page.icon}
                label={page.label}
                active={activePage === page.id}
                onClick={() => navigate(page.id)}
                
              />
            ))}
          </LayoutSidebarGroup>

          {/* Resources */}
          <LayoutSidebarGroup label={isSidebarCollapsed ? undefined : "Resources"}>
            {RESOURCE_PAGES.map((page) => (
              <LayoutSidebarItem
                key={String(page.id)}
                icon={page.icon}
                label={page.label}
                active={activePage === page.id}
                onClick={() => navigate(page.id)}
                
              />
            ))}
          </LayoutSidebarGroup>
        </>
      )}
    </LayoutSidebarNav>
  );
}
