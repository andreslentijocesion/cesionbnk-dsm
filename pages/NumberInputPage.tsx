import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { NumberInput } from "../components/ui/NumberInput";
import { Label } from "../components/ui/Label";
import { Card, CardContent } from "../components/ui/Card";

function NumberInputDemo() {
  const [dias, setDias] = useState(30);
  const [anticipo, setAnticipo] = useState(80);
  const [cuotas, setCuotas] = useState(3);
  const [tasa, setTasa] = useState(1.5);

  return (
    <div className="space-y-5 max-w-sm">
      <div className="space-y-1.5">
        <Label>Plazo (días)</Label>
        <NumberInput
          value={dias}
          onChange={setDias}
          min={1}
          max={365}
          step={1}
          suffix="días"
        />
      </div>
      <div className="space-y-1.5">
        <Label>% Anticipo</Label>
        <NumberInput
          value={anticipo}
          onChange={setAnticipo}
          min={50}
          max={100}
          step={5}
          suffix="%"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Número de cuotas</Label>
        <NumberInput
          value={cuotas}
          onChange={setCuotas}
          min={1}
          max={12}
          step={1}
          suffix="cuotas"
          size="sm"
        />
      </div>
      <div className="space-y-1.5">
        <Label>Tasa mensual (%)</Label>
        <NumberInput
          value={tasa}
          onChange={setTasa}
          min={0}
          max={10}
          step={0.1}
          decimals={2}
          suffix="%"
        />
      </div>
      <Card>
        <CardContent className="p-4 text-sm space-y-1">
          <p className="font-medium">Parámetros seleccionados</p>
          <p className="text-muted-foreground">Plazo: {dias} días · Anticipo: {anticipo}% · Cuotas: {cuotas} · Tasa: {tasa}%</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function NumberInputPage() {
  return (
    <ComponentShowcase
      title="Number Input"
      description="Input numérico con botones +/− para incrementar/decrementar. Soporta min/max/step, decimales, y sufijo/prefijo. Ideal para días de plazo, % de anticipo, número de cuotas y tasas."
      category="Forms"
      atomicLevel="Atom"
      preview={<NumberInputDemo />}
      code={`import { NumberInput } from "@/components/ui/NumberInput"
import { useState } from "react"

export function Demo() {
  const [dias, setDias] = useState(30)
  return (
    <NumberInput
      value={dias}
      onChange={setDias}
      min={1}
      max={365}
      step={1}
      suffix="días"
    />
  )
}`}
      props={[
        { name: "value",        type: "number",   description: "Valor controlado." },
        { name: "onChange",     type: "(value: number) => void", description: "Callback al cambiar el valor.", required: false },
        { name: "min",          type: "number",   description: "Valor mínimo.", required: false },
        { name: "max",          type: "number",   description: "Valor máximo.", required: false },
        { name: "step",         type: "number",   description: "Incremento por clic. Default: 1.", required: false },
        { name: "decimals",     type: "number",   description: "Decimales al redondear. Default: 0.", required: false },
        { name: "suffix",       type: "string",   description: "Texto a la derecha del número (ej. 'días', '%').", required: false },
        { name: "prefix",       type: "string",   description: "Texto a la izquierda del número.", required: false },
        { name: "size",         type: '"sm" | "default" | "lg"', description: "Tamaño del input. Default: default.", required: false },
        { name: "showControls", type: "boolean",  description: "Muestra botones +/−. Default: true.", required: false },
      ]}
      examples={[
        {
          title: "Sin controles",
          description: "Solo input numérico, sin botones.",
          preview: (
            <div className="max-w-xs space-y-3">
              <NumberInput value={100} onChange={() => {}} showControls={false} suffix="%" />
            </div>
          ),
          code: `<NumberInput value={100} onChange={setVal} showControls={false} suffix="%" />`,
        },
        {
          title: "Tamaños",
          description: "sm / default / lg.",
          preview: (
            <div className="max-w-xs space-y-2">
              <NumberInput value={30} onChange={() => {}} suffix="días" size="sm" />
              <NumberInput value={30} onChange={() => {}} suffix="días" size="default" />
              <NumberInput value={30} onChange={() => {}} suffix="días" size="lg" />
            </div>
          ),
          code: `<NumberInput size="sm" ... />\n<NumberInput size="default" ... />\n<NumberInput size="lg" ... />`,
        },
      ]}
    />
  );
}
