import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { TagInput } from "../components/ui/tag-input";
import { Label } from "../components/ui/label";

function TagInputDemo() {
  const [tags1, setTags1] = useState<string[]>(["Retail", "Santiago"]);
  const [tags2, setTags2] = useState<string[]>(["factoring", "cedente"]);
  const [tags3, setTags3] = useState<string[]>(["Alto riesgo"]);
  return (
    <div className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <Label>Rubros del cedente</Label>
        <TagInput value={tags1} onChange={setTags1} placeholder="Agregar rubro..." />
        <p className="text-xs text-muted-foreground">Escribe y presiona Enter o coma para agregar</p>
      </div>
      <div className="space-y-1.5">
        <Label>Etiquetas del documento (outline)</Label>
        <TagInput value={tags2} onChange={setTags2} variant="outline" placeholder="Agregar etiqueta..." />
      </div>
      <div className="space-y-1.5">
        <Label>Clasificación de riesgo (máx. 2)</Label>
        <TagInput value={tags3} onChange={setTags3} max={2} placeholder="Agregar clasificación..." />
      </div>
    </div>
  );
}

export function TagInputPage() {
  return (
    <ComponentShowcase
      title="Tag Input"
      description="Input multi-valor para ingresar etiquetas/chips. Presiona Enter o coma para agregar. Clic en × para eliminar. Soporta máximo de tags y variantes de color."
      category="Forms"
      atomicLevel="Atom"
      preview={<TagInputDemo />}
      code={`import { TagInput } from "@/components/ui/tag-input"
import { useState } from "react"

export function Demo() {
  const [tags, setTags] = useState<string[]>(["Retail", "Santiago"])
  return (
    <TagInput
      value={tags}
      onChange={setTags}
      placeholder="Agregar etiqueta..."
    />
  )
}`}
      props={[
        { name: "value",      type: "string[]",             description: "Lista de tags actuales." },
        { name: "onChange",   type: "(tags: string[]) => void", description: "Callback cuando cambia la lista." },
        { name: "placeholder", type: "string",              description: "Texto placeholder.", required: false },
        { name: "max",        type: "number",               description: "Máximo de tags permitidos.", required: false },
        { name: "delimiters", type: "string[]",             description: "Caracteres que disparan la creación de un tag. Default: [','].", required: false },
        { name: "variant",    type: '"default" | "secondary" | "outline"', description: "Estilo visual de los tags.", required: false },
        { name: "validate",   type: "(tag: string) => boolean", description: "Función de validación por tag. Retorna false para rechazar.", required: false },
        { name: "disabled",   type: "boolean",              description: "Deshabilita el input.", required: false },
      ]}
      examples={[
        {
          title: "Variante default (primary)",
          description: "Tags con color primario del sistema.",
          preview: (
            <div className="max-w-md">
              <TagInput
                value={["Aprobado", "Prioridad alta"]}
                onChange={() => {}}
                variant="default"
                placeholder="Agregar estado..."
              />
            </div>
          ),
          code: `<TagInput value={tags} onChange={setTags} variant="default" />`,
        },
        {
          title: "Deshabilitado",
          description: "Estado de solo lectura para mostrar etiquetas sin edición.",
          preview: (
            <div className="max-w-md">
              <TagInput
                value={["Retail", "Gran distribución", "Santiago"]}
                onChange={() => {}}
                disabled
              />
            </div>
          ),
          code: `<TagInput value={tags} onChange={() => {}} disabled />`,
        },
      ]}
    />
  );
}
