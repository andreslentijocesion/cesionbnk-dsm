import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { CodeBlock } from "./code-block";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  category?: string;
  /** e.g. "DSM v1.0" */
  dsmVersion?: string;
  /** e.g. "Atom" | "Molecule" | "Organism" | "Pattern" */
  atomicLevel?: string;
  preview: ReactNode;
  code: string;
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
    required?: boolean;
  }>;
  examples?: Array<{
    title: string;
    description?: string;
    preview: ReactNode;
    code: string;
  }>;
}

// ─── Shared primitives (mirrors ButtonPage) ───────────────────────────────────

function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-x-auto">
      {children}
    </div>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="space-y-3 scroll-mt-4">
      <div>
        <h3 className="text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function PropsTable({
  props,
}: {
  props: NonNullable<ComponentShowcaseProps["props"]>;
}) {
  return (
    <Canvas>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted">
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th key={h} className="px-4 py-2 text-left">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  {h}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr
              key={p.name}
              className="border-t border-border/25 hover:bg-muted transition-colors"
            >
              <td className="px-4 py-3 align-top whitespace-nowrap">
                <code className="text-xs bg-secondary border border-border/50 px-1.5 py-0.5 rounded text-secondary-foreground">
                  {p.name}
                  {p.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </code>
              </td>
              <td className="px-4 py-3 align-top max-w-[260px]">
                <code className="text-xs text-muted-foreground break-words">
                  {p.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top whitespace-nowrap">
                {p.default ? (
                  <code className="text-xs bg-muted border border-border/50 px-1.5 py-0.5 rounded text-muted-foreground">
                    {p.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground/30 select-none text-sm">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-sm text-muted-foreground">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Canvas>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ComponentShowcase({
  title,
  description,
  category,
  dsmVersion = "DSM v1.0",
  atomicLevel,
  preview,
  code,
  props,
  examples,
}: ComponentShowcaseProps) {
  // Build quick nav
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const nav: Array<{ id: string; label: string }> = [
    { id: `${slug}-preview`, label: "Preview" },
  ];
  if (props && props.length > 0) nav.push({ id: `${slug}-props`, label: "Props" });
  if (examples && examples.length > 0) {
    examples.forEach((ex, i) =>
      nav.push({ id: `${slug}-ex-${i}`, label: ex.title })
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/* ── Header ── */}
      <div className="space-y-4">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <Badge variant="neutral-soft-outline">{category}</Badge>
          )}
          <Badge variant="secondary-soft-outline">{dsmVersion}</Badge>
          {atomicLevel && (
            <Badge variant="info-soft-outline">{atomicLevel}</Badge>
          )}
        </div>

        {/* Title + description */}
        <div>
          <h2 className="text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-1.5">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="inline-flex items-center rounded-md border border-border bg-muted hover:bg-accent px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>

        <Separator />
      </div>

      {/* ── Preview & Code ── */}
      <Section
        id={`${slug}-preview`}
        title="Preview"
        description="Interactive component preview"
      >
        <Canvas>
          <Tabs defaultValue="preview" className="w-full">
            <div className="border-b border-border bg-muted px-4 py-2">
              <TabsList className="h-7 gap-0.5 bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="m-0">
              <div className="min-h-[200px] p-8">{preview}</div>
            </TabsContent>

            <TabsContent value="code" className="m-0">
              <div className="p-4">
                <CodeBlock
                  code={code}
                  filename={`${slug}.tsx`}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Canvas>
      </Section>

      {/* ── Props ── */}
      {props && props.length > 0 && (
        <Section
          id={`${slug}-props`}
          title="Props"
          description="Complete API reference."
        >
          <PropsTable props={props} />
        </Section>
      )}

      {/* ── Examples ── */}
      {examples && examples.length > 0 &&
        examples.map((example, index) => (
          <Section
            key={index}
            id={`${slug}-ex-${index}`}
            title={example.title}
            description={example.description}
          >
            <Canvas>
              <Tabs defaultValue="preview" className="w-full">
                <div className="border-b border-border bg-muted px-4 py-2">
                  <TabsList className="h-7 gap-0.5 bg-transparent p-0">
                    <TabsTrigger
                      value="preview"
                      className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
                    >
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
                    >
                      Code
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="preview" className="m-0">
                  <div className="min-h-[150px] p-6">{example.preview}</div>
                </TabsContent>

                <TabsContent value="code" className="m-0">
                  <div className="p-4">
                    <CodeBlock
                      code={example.code}
                      filename={`${example.title.toLowerCase().replace(/\s+/g, "-")}.tsx`}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </Canvas>
          </Section>
        ))}
    </div>
  );
}