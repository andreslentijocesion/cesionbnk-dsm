import { ComponentShowcase } from "../components/ui/componentshowcase"
import { Card } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Logo } from "../components/layout/logo"
import { useState } from "react"
import { BRAND_COLORS, SPACING_SCALE, BRAND_INFO } from "../lib/constants"
import { ColorSwatch } from "../components/patterns/color-swatch"
import { GridSystemPreview } from "../components/patterns/grid-system-preview"
import { SpacingPreview } from "../components/patterns/spacing-preview"
import { copyToClipboard as copyText } from "../lib/utils"

function BrandLayoutContent() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    copyText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Logo Showcase */}
      <Card className="p-8">
        <h3 className="font-medium mb-6">Logo</h3>
        <div className="mb-8">
          <h4 className="font-medium text-sm mb-4 text-muted-foreground">Light Backgrounds</h4>
          <div className="space-y-4">
            {(["xl", "lg", "md", "sm"] as const).map((size) => (
              <div key={size} className="flex items-center gap-8 p-4 bg-muted rounded-lg">
                <div className="flex-shrink-0 w-24"><p className="text-xs text-muted-foreground">{size.toUpperCase()}</p></div>
                <Logo size={size} variant="light" />
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-6" />
        <div>
          <h4 className="font-medium text-sm mb-4 text-muted-foreground">Dark Backgrounds</h4>
          <div className="space-y-4">
            {(["xl", "lg", "md", "sm"] as const).map((size) => (
              <div key={size} className="flex items-center gap-8 p-4 bg-gray-900 rounded-lg">
                <div className="flex-shrink-0 w-24"><p className="text-xs text-gray-400">{size.toUpperCase()}</p></div>
                <Logo size={size} variant="dark" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Color Palette */}
      <Card className="p-8">
        <h3 className="font-medium mb-6">Color Palette</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {BRAND_COLORS.map((color) => (
            <ColorSwatch key={color.id} id={color.id} name={color.name} hex={color.hex} rgb={color.rgb} usage={color.usage} isPrimary={color.id === "primary"} copiedColor={copiedColor} onCopy={copyToClipboard} />
          ))}
        </div>
      </Card>

      {/* Typography */}
      <Card className="p-8">
        <h3 className="font-medium mb-6">Typography — {BRAND_INFO.fontFamily}</h3>
        <div className="space-y-6">
          <div className="p-4 bg-muted rounded-lg border-2 border-primary">
            <p className="text-2xl font-semibold">{BRAND_INFO.fontFamily}</p>
            <p className="text-xs text-muted-foreground mt-1">Font family — Weights: 400-700 — Only permitted font</p>
          </div>
          <div className="space-y-3">
            {[["text-5xl font-semibold", "Heading 1", "48px"], ["text-3xl font-semibold", "Heading 2", "30px"], ["text-xl font-semibold", "Heading 3", "20px"], ["text-base", "Body Text", "16px"], ["text-sm", "Small Text", "14px"], ["text-xs", "Caption", "12px"]].map(([cls, label, size]) => (
              <div key={label} className="p-3 border rounded-lg flex items-center justify-between">
                <p className={cls}>{label}</p>
                <p className="text-xs text-muted-foreground">{size}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid System */}
      <Card className="p-8">
        <h3 className="font-medium mb-6">Responsive Grid System</h3>
        <div className="space-y-6">
          {[{ device: "Desktop", columns: 12, gutter: "24px", margin: "48px" }, { device: "Tablet", columns: 6, gutter: "16px", margin: "32px" }, { device: "Mobile", columns: 4, gutter: "16px", margin: "16px" }].map((g) => (
            <GridSystemPreview key={g.device} device={g.device} columns={g.columns} gutter={g.gutter} margin={g.margin} />
          ))}
        </div>
      </Card>

      {/* Spacing System */}
      <Card className="p-8">
        <h3 className="font-medium mb-6">Spacing System ({BRAND_INFO.baseSpacing}px base)</h3>
        <div className="space-y-3">
          {SPACING_SCALE.map((s) => (<SpacingPreview key={s.name} name={s.name} value={s.value} multiplier={s.multiplier} />))}
        </div>
      </Card>
    </div>
  );
}

export function BrandLayoutPage() {
  return (
    <ComponentShowcase
      title="Brand & Layout Guidelines"
      description={`Complete design system reference: ${BRAND_INFO.name} brand identity (Logo with light/dark variants at 4 sizes), color palette (Primary Gray ${BRAND_INFO.primaryColor} + Secondary Purple ${BRAND_INFO.secondaryColor} with WCAG AA contrast), typography (${BRAND_INFO.fontFamily} exclusive, 400-700 weights, 6 scale levels), responsive grid system (12/6/4 columns for desktop/tablet/mobile), and spacing system (${BRAND_INFO.baseSpacing}px base unit with 8 levels).`}
      category="Design System"
      preview={<BrandLayoutContent />}
      code={`import { Logo } from "../components/layout/logo"
import { ColorSwatch } from "../components/patterns/color-swatch"
import { GridSystemPreview } from "../components/patterns/grid-system-preview"
import { SpacingPreview } from "../components/patterns/spacing-preview"
import { copyToClipboard as copyText } from "@/lib/utils"

// Logo with variants
<Logo size="xl" variant="light" />  // xl, lg, md, sm
<Logo size="md" variant="dark" />   // For dark backgrounds

// Colors: Primary ${BRAND_INFO.primaryColor} (Gray), Secondary ${BRAND_INFO.secondaryColor} (Purple)
// Font: ${BRAND_INFO.fontFamily} (exclusive) — font-family: '${BRAND_INFO.fontFamily}', sans-serif
// Border Radius: ${BRAND_INFO.borderRadius} (10px)
// Grid: 12 cols desktop, 6 tablet, 4 mobile
// Spacing: ${BRAND_INFO.baseSpacing}px base unit (xs=4, sm=8, md=12, base=16, lg=24, xl=32, 2xl=48, 3xl=64)`}
      props={[
        { name: "Logo size", type: "'xl' | 'lg' | 'md' | 'sm'", description: "Logo height: xl=48px, lg=40px, md=32px, sm=24px." },
        { name: "Logo variant", type: "'light' | 'dark'", description: "Use 'light' for light backgrounds, 'dark' for dark backgrounds." },
        { name: "ColorSwatch", type: "Component", description: "Color display with hex, rgb, usage, and click-to-copy." },
        { name: "GridSystemPreview", type: "Component", description: "Visual grid preview with device, columns, gutter, margin." },
        { name: "SpacingPreview", type: "Component", description: "Spacing scale display with name, value, and multiplier." },
      ]}
    />
  );
}