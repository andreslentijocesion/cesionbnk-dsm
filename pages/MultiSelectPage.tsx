import { ComponentShowcase } from "../components/ui/component-showcase";
import { MultiSelect, MultiSelectOption } from "../components/ui/multi-select";
import { useState } from "react";

const frameworks: MultiSelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
];

const countries: MultiSelectOption[] = [
  { label: "Spain", value: "es" },
  { label: "Mexico", value: "mx" },
  { label: "Argentina", value: "ar" },
  { label: "Colombia", value: "co" },
  { label: "Chile", value: "cl" },
  { label: "Peru", value: "pe" },
];

const departments: MultiSelectOption[] = [
  { label: "Development", value: "dev" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Human Resources", value: "hr" },
];

const code = `import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { useState } from "react";

const options: MultiSelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
];

export function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MultiSelect
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select one or more..."
    />
  );
}`;

export function MultiSelectPage() {
  const [selected1, setSelected1] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>(["react", "nextjs"]);
  const [selected3, setSelected3] = useState<string[]>([]);
  const [selected4, setSelected4] = useState<string[]>([]);

  return (
    <ComponentShowcase
      title="Multi Select"
      description="Multiple selection component with integrated search, badges for selected items, and full keyboard support. Ideal for forms with multiple options."
      category="Forms"
      atomicLevel="Molecule"
      preview={
        <div className="w-full max-w-md space-y-2">
          <label className="text-foreground font-medium">Select frameworks</label>
          <MultiSelect
            options={frameworks}
            selected={selected1}
            onChange={setSelected1}
            placeholder="Select one or more frameworks..."
          />
          {selected1.length > 0 && (
            <p className="text-muted-foreground text-sm">
              Selected: {selected1.join(", ")}
            </p>
          )}
        </div>
      }
      code={code}
      props={[
        { name: "options", type: "MultiSelectOption[]", description: "Array of available options", required: true },
        { name: "selected", type: "string[]", description: "Array of selected values", required: true },
        { name: "onChange", type: "(selected: string[]) => void", description: "Callback when selection changes", required: true },
        { name: "placeholder", type: "string", default: '"Select options..."', description: "Text when nothing is selected" },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the component" },
        { name: "className", type: "string", description: "Additional CSS classes" },
      ]}
      examples={[
        {
          title: "With Default Values",
          description: "Multi Select with preselected options.",
          preview: (
            <div className="w-full max-w-md">
              <MultiSelect
                options={frameworks}
                selected={selected2}
                onChange={setSelected2}
                placeholder="Select frameworks..."
              />
            </div>
          ),
          code: `<MultiSelect
  options={frameworks}
  selected={["react", "nextjs"]}
  onChange={setSelected}
/>`,
        },
        {
          title: "Countries",
          description: "Multi Select with different option sets.",
          preview: (
            <div className="w-full max-w-md">
              <MultiSelect
                options={countries}
                selected={selected3}
                onChange={setSelected3}
                placeholder="Select countries..."
              />
            </div>
          ),
          code: `<MultiSelect
  options={countries}
  selected={selected}
  onChange={setSelected}
  placeholder="Select countries..."
/>`,
        },
        {
          title: "Departments",
          description: "Multi Select integrated in a form.",
          preview: (
            <div className="w-full max-w-md">
              <MultiSelect
                options={departments}
                selected={selected4}
                onChange={setSelected4}
                placeholder="Select departments..."
              />
            </div>
          ),
          code: `<MultiSelect
  options={departments}
  selected={selected}
  onChange={setSelected}
/>`,
        },
        {
          title: "Disabled",
          description: "Disabled state of the component.",
          preview: (
            <div className="w-full max-w-md">
              <MultiSelect
                options={frameworks}
                selected={["react", "vue"]}
                onChange={() => {}}
                disabled
                placeholder="Disabled Multi Select"
              />
            </div>
          ),
          code: `<MultiSelect
  options={frameworks}
  selected={["react", "vue"]}
  onChange={() => {}}
  disabled
/>`,
        },
      ]}
    />
  );
}