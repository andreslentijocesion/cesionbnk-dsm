import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { CurrencyInput } from "../components/ui/currency-input";
import { Label } from "../components/ui/label";

function CurrencyInputDemo() {
  const [clp, setClp] = useState<number | null>(4320000);
  const [usd, setUsd] = useState<number | null>(4850.5);
  const [pct, setPct] = useState<number | null>(1.85);

  return (
    <div className="space-y-5 max-w-sm">
      <div className="space-y-1.5">
        <Label>Monto (CLP)</Label>
        <CurrencyInput mode="clp" value={clp} onChange={setClp} />
        <p className="text-xs text-muted-foreground">Valor: {clp?.toLocaleString("es-CL") ?? "—"}</p>
      </div>
      <div className="space-y-1.5">
        <Label>Monto (USD)</Label>
        <CurrencyInput mode="usd" value={usd} onChange={setUsd} />
        <p className="text-xs text-muted-foreground">Valor: {usd?.toFixed(2) ?? "—"}</p>
      </div>
      <div className="space-y-1.5">
        <Label>Tasa mensual (%)</Label>
        <CurrencyInput mode="percent" value={pct} onChange={setPct} min={0} max={100} />
        <p className="text-xs text-muted-foreground">Valor: {pct?.toFixed(2) ?? "—"}%</p>
      </div>
    </div>
  );
}

export function CurrencyInputPage() {
  return (
    <ComponentShowcase
      title="Currency Input"
      description="Input numérico con formateo de moneda y porcentaje. Soporta CLP, USD y modo porcentaje. Al enfocar muestra el valor sin formato; al salir aplica el formato local."
      category="Forms"
      atomicLevel="Atom"
      preview={<CurrencyInputDemo />}
      code={`import { CurrencyInput } from "@/components/ui/currency-input"
import { useState } from "react"

export function Demo() {
  const [amount, setAmount] = useState<number | null>(4320000)
  return (
    <CurrencyInput
      mode="clp"
      value={amount}
      onChange={setAmount}
    />
  )
}`}
      props={[
        { name: "value",    type: "number | null",      description: "Valor numérico actual." },
        { name: "onChange", type: "(v: number | null) => void", description: "Callback con el valor parseado al salir del input." },
        { name: "mode",     type: '"clp" | "usd" | "percent" | "number"', description: "Modo de formateo. Por defecto: clp.", required: false },
        { name: "decimals", type: "number",              description: "Decimales a mostrar. Por defecto: 0 para CLP, 2 para USD/percent.", required: false },
        { name: "min",      type: "number",              description: "Valor mínimo al perder foco.", required: false },
        { name: "max",      type: "number",              description: "Valor máximo al perder foco.", required: false },
        { name: "showSymbol", type: "boolean",           description: "Muestra el prefijo/sufijo de moneda o porcentaje. Default: true.", required: false },
        { name: "size",     type: '"sm" | "default" | "lg" | "xl"', description: "Tamaño heredado del componente Input.", required: false },
      ]}
      examples={[
        {
          title: "Tamaños",
          description: "Hereda los tamaños del componente Input base.",
          preview: (
            <div className="space-y-3 max-w-xs">
              <CurrencyInput mode="clp" size="sm"      value={980000}  onChange={() => {}} />
              <CurrencyInput mode="clp" size="default" value={1500000} onChange={() => {}} />
              <CurrencyInput mode="clp" size="lg"      value={4320000} onChange={() => {}} />
            </div>
          ),
          code: `<CurrencyInput mode="clp" size="sm"      value={980000}  onChange={setVal} />
<CurrencyInput mode="clp" size="default" value={1500000} onChange={setVal} />
<CurrencyInput mode="clp" size="lg"      value={4320000} onChange={setVal} />`,
        },
        {
          title: "Modo número sin símbolo",
          description: "Para cantidades de facturas o conteos.",
          preview: (
            <div className="max-w-xs">
              <CurrencyInput mode="number" value={187} onChange={() => {}} showSymbol={false} />
            </div>
          ),
          code: `<CurrencyInput mode="number" value={187} onChange={setVal} showSymbol={false} />`,
        },
        {
          title: "Deshabilitado",
          description: "Estado de solo lectura.",
          preview: (
            <div className="space-y-2 max-w-xs">
              <CurrencyInput mode="clp"     value={2750000} onChange={() => {}} disabled />
              <CurrencyInput mode="percent" value={1.85}    onChange={() => {}} disabled />
            </div>
          ),
          code: `<CurrencyInput mode="clp" value={2750000} onChange={setVal} disabled />`,
        },
      ]}
    />
  );
}
