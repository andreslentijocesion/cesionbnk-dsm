import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "../components/ui/menubar";
import { Badge } from "../components/ui/badge";

// ── Demos ──────────────────────────────────────────────────────────────────

function BasicMenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email Link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Copy Link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Select All <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Release Notes</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Report an Issue</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function CheckboxRadioMenubarDemo() {
  const [showToolbar, setShowToolbar] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [view, setView] = useState("grid");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Panels</MenubarLabel>
          <MenubarCheckboxItem
            checked={showToolbar}
            onCheckedChange={setShowToolbar}
          >
            Toolbar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel>Layout</MenubarLabel>
          <MenubarRadioGroup value={view} onValueChange={setView}>
            <MenubarRadioItem value="grid">Grid</MenubarRadioItem>
            <MenubarRadioItem value="list">List</MenubarRadioItem>
            <MenubarRadioItem value="table">Table</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function AppMenubarDemo() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Menubar className="w-full justify-start rounded-none border-x-0 border-t-0 px-3">
        <MenubarMenu>
          <MenubarTrigger>Operaciones</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Nueva Operación <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Cargar Facturas</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Exportar Cartera</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Clientes</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Ver Todos</MenubarItem>
            <MenubarItem>
              Agregar Cliente <MenubarShortcut>⌘K</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Filtrar por Estado</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Activos</MenubarItem>
                <MenubarItem>En Análisis</MenubarItem>
                <MenubarItem>Inactivos</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Reportes</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Dashboard Comercial</MenubarItem>
            <MenubarItem>Cartera Vigente</MenubarItem>
            <MenubarItem>Aging Report</MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="destructive">Limpiar Caché</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="px-3">
        <Badge variant="outline" className="text-xs">Ejemplo de Menubar en modo app-width sin border lateral</Badge>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function MenubarPage() {
  return (
    <ComponentShowcase
      title="Menubar"
      description="A horizontal menu bar for desktop applications. Built on Radix UI Menubar. Supports nested submenus, keyboard shortcuts, checkbox and radio items, and a destructive variant. Ideal as an application toolbar above a content area."
      category="Navigation"

      preview={<BasicMenubarDemo />}

      code={`import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "@/components/ui/menubar";

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email Link</MenubarItem>
              <MenubarItem>Copy Link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}`}

      props={[
        {
          name: "MenubarItem › variant",
          type: '"default" | "destructive"',
          default: '"default"',
          description: 'Use "destructive" for dangerous actions like delete or clear cache.',
        },
        {
          name: "MenubarItem › inset",
          type: "boolean",
          description: "Adds left padding to align with items that have an icon or indicator.",
        },
        {
          name: "MenubarItem › disabled",
          type: "boolean",
          description: "Renders the item in a non-interactive, dimmed state.",
        },
        {
          name: "MenubarCheckboxItem › checked",
          type: "boolean",
          description: "Controlled checked state for toggle-style menu items.",
        },
        {
          name: "MenubarRadioGroup › value",
          type: "string",
          description: "Currently selected value in a radio group of menu items.",
        },
        {
          name: "MenubarShortcut",
          type: "ReactNode",
          description: "Renders a right-aligned shortcut label. Purely visual — does not bind keys.",
        },
      ]}

      examples={[
        {
          title: "Checkbox & Radio Items",
          description: "Use MenubarCheckboxItem for toggles (show/hide panels) and MenubarRadioGroup for exclusive selections (view mode).",
          preview: <CheckboxRadioMenubarDemo />,
          code: `const [showToolbar, setShowToolbar] = useState(true);
const [view, setView] = useState("grid");

<MenubarContent>
  <MenubarLabel>Panels</MenubarLabel>
  <MenubarCheckboxItem
    checked={showToolbar}
    onCheckedChange={setShowToolbar}
  >
    Toolbar
  </MenubarCheckboxItem>
  <MenubarSeparator />
  <MenubarLabel>Layout</MenubarLabel>
  <MenubarRadioGroup value={view} onValueChange={setView}>
    <MenubarRadioItem value="grid">Grid</MenubarRadioItem>
    <MenubarRadioItem value="list">List</MenubarRadioItem>
    <MenubarRadioItem value="table">Table</MenubarRadioItem>
  </MenubarRadioGroup>
</MenubarContent>`,
        },
        {
          title: "App-Width Menubar",
          description: 'Remove side borders and extend full-width by overriding the className. Common in desktop-style app shells.',
          preview: <AppMenubarDemo />,
          code: `<Menubar className="w-full rounded-none border-x-0 border-t-0 px-3">
  <MenubarMenu>
    <MenubarTrigger>Operaciones</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Nueva Operación</MenubarItem>
      <MenubarSeparator />
      <MenubarItem variant="destructive">Eliminar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
        },
      ]}
    />
  );
}
