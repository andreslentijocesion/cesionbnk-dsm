import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { BRAND_INFO, BRAND_COLORS, SPACING_SCALE } from "../lib/constants";

// Primitives (KPIs)
const kpiTokens = [
  { name: "kpi-green", cssVar: "--kpi-green", darkVar: "--kpi-green-dark", bgVar: "--kpi-green-bg" },
  { name: "kpi-red", cssVar: "--kpi-red", darkVar: "--kpi-red-dark", bgVar: "--kpi-red-bg" },
  { name: "kpi-yellow", cssVar: "--kpi-yellow", darkVar: "--kpi-yellow-dark", bgVar: "--kpi-yellow-bg" },
  { name: "kpi-orange", cssVar: "--kpi-orange", darkVar: "--kpi-orange-dark", bgVar: "--kpi-orange-bg" },
  { name: "kpi-blue", cssVar: "--kpi-blue", darkVar: "--kpi-blue-dark", bgVar: "--kpi-blue-bg" },
  { name: "kpi-lime", cssVar: "--kpi-lime", darkVar: "--kpi-lime-dark", bgVar: "--kpi-lime-bg" },
];

// Radius tokens
const radiusTokens = [
  { name: "radius-sm", cssVar: "--radius-sm", twClass: "rounded-sm", computed: "calc(var(--radius) - 4px)", px: "~6px" },
  { name: "radius-md", cssVar: "--radius-md", twClass: "rounded-md", computed: "calc(var(--radius) - 2px)", px: "~8px" },
  { name: "radius-lg (base)", cssVar: "--radius", twClass: "rounded-lg", computed: "var(--radius)", px: "10px" },
  { name: "radius-xl", cssVar: "--radius-xl", twClass: "rounded-xl", computed: "calc(var(--radius) + 4px)", px: "~14px" },
  { name: "radius-full", cssVar: "—", twClass: "rounded-full", computed: "9999px", px: "9999px" },
];

function DesignTokensContent() {
  return (
    <div className="space-y-12">
      {/* ── Brand Colors ── */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Brand Identity</h2>
          <p className="text-muted-foreground">Primary source of truth for {BRAND_INFO.name} colors.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {BRAND_COLORS.map((color) => (
            <Card key={color.id} className="overflow-hidden">
              <div 
                className="h-24 w-full" 
                style={{ backgroundColor: color.hex }}
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{color.name}</CardTitle>
                  <Badge variant="outline">{color.hex}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{color.usage}</p>
              </CardHeader>
              <CardContent className="text-xs space-y-1 font-mono">
                <p>CSS: var(--{color.id})</p>
                <p>RGB: {color.rgb}</p>
                <p>Contrast: {color.contrast}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── KPI Primitives ── */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">KPI Primitives</h2>
          <p className="text-muted-foreground">Standardized colors for indicators and status states.</p>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token Name</TableHead>
                <TableHead>Light Mode</TableHead>
                <TableHead>Dark Mode</TableHead>
                <TableHead>Background (Subtle)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiTokens.map((token) => (
                <TableRow key={token.name}>
                  <TableCell className="font-mono text-xs">{token.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-4 rounded" style={{ backgroundColor: `var(${token.cssVar})` }} />
                      <span className="text-xs">{token.cssVar}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-4 rounded border" style={{ backgroundColor: `var(${token.darkVar})` }} />
                      <span className="text-xs">{token.darkVar}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="size-4 rounded" style={{ backgroundColor: `var(${token.bgVar})` }} />
                      <span className="text-xs">{token.bgVar}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* ── Spacing Scale ── */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Spacing System</h2>
          <p className="text-muted-foreground">4px base unit spacing scale for margins, padding, and gaps.</p>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Visual Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SPACING_SCALE.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="font-mono text-xs">{s.name}</TableCell>
                  <TableCell>{s.value}</TableCell>
                  <TableCell className="text-muted-foreground">{s.multiplier}</TableCell>
                  <TableCell>
                    <div className="bg-primary h-4 rounded" style={{ width: s.value }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* ── Border Radius ── */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Border Radius</h2>
          <p className="text-muted-foreground">Standardized corner rounding for components.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {radiusTokens.map((r) => (
            <Card key={r.name} className="flex flex-col items-center p-6 text-center">
              <div className={`size-16 bg-muted border-2 border-primary mb-4 ${r.twClass}`} />
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono mt-1">{r.computed}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DesignTokensPage() {
  return (
    <ComponentShowcase
      title="Design Tokens"
      description={`Visual reference for the ${BRAND_INFO.name} Design System tokens. All values are driven by CSS variables in globals.css.`}
      category="Foundations"
      preview={<DesignTokensContent />}
      code={`// Spacing usage
<div className="p-4 space-y-2">...</div>

// Color usage
<div className="bg-primary text-primary-foreground">...</div>

// Radius usage
<div className="rounded-lg border">...</div>`}
    />
  );
}
