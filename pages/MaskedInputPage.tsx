import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { MaskedInput } from "../components/ui/masked-input";
import { Label } from "../components/ui/label";

function MaskedInputDemo() {
  const [nit,   setNit]   = useState("9001234567"); // 900.123.456-7 — NIT válido Colombia
  const [phone, setPhone] = useState("573101234567");
  const [bank,  setBank]  = useState("1234567890"); // cuenta bancaria colombiana típica (10 dígitos)

  return (
    <div className="space-y-5 max-w-sm">
      <div className="space-y-1.5">
        <Label>NIT</Label>
        <MaskedInput mask="nit" value={nit} onChange={(v) => setNit(v)} />
        <p className="text-xs text-muted-foreground">
          Valor: {nit || "—"} ·{" "}
          {nit.replace(/\D/g, "").length >= 7 && (
            <span className={/\d-\d$/.test(nit) ? "text-success" : "text-muted-foreground"}>
              válido
            </span>
          )}
        </p>
      </div>
      <div className="space-y-1.5">
        <Label>Teléfono (Colombia)</Label>
        <MaskedInput mask="phone" value={phone} onChange={(v) => setPhone(v)} />
      </div>
      <div className="space-y-1.5">
        <Label>Número de cuenta bancaria</Label>
        <MaskedInput mask="bank-account" value={bank} onChange={(v) => setBank(v)} />
      </div>
    </div>
  );
}

export function MaskedInputPage() {
  return (
    <ComponentShowcase
      title="Masked Input"
      description="Input con formateo automático para NIT (formato colombiano DIAN con validación de dígito verificador), teléfono (+57) y número de cuenta bancaria. Formatea mientras el usuario escribe."
      category="Forms"
      atomicLevel="Atom"
      preview={<MaskedInputDemo />}
      code={`import { MaskedInput } from "@/components/ui/masked-input"
import { useState } from "react"

export function Demo() {
  const [nit, setNit] = useState("")
  return (
    <MaskedInput
      mask="nit"
      value={nit}
      onChange={(formatted) => setNit(formatted)}
    />
  )
}`}
      props={[
        { name: "mask",           type: '"nit" | "phone" | "bank-account" | "custom"', description: "Tipo de máscara. Default: nit." },
        { name: "value",          type: "string",   description: "Valor formateado actual." },
        { name: "onChange",       type: "(formatted: string, raw: string) => void", description: "Callback con el valor formateado y el valor sin formato." },
        { name: "pattern",        type: "string",   description: "Máscara personalizada: # = dígito (ej. '##/##/####'). Solo para mask='custom'.", required: false },
        { name: "showValidation", type: "boolean",  description: "Muestra borde verde/rojo para validación de NIT. Default: true.", required: false },
        { name: "size",           type: '"sm" | "default" | "lg" | "xl"', description: "Tamaño del input.", required: false },
      ]}
      examples={[
        {
          title: "Máscara personalizada",
          description: "Para fechas, códigos o cualquier patrón con dígitos.",
          preview: (
            <div className="max-w-xs space-y-3">
              <MaskedInput mask="custom" pattern="##/##/####" value="" onChange={() => {}} placeholder="DD/MM/AAAA" />
              <MaskedInput mask="custom" pattern="###-###-####" value="" onChange={() => {}} placeholder="Código de operación" />
            </div>
          ),
          code: `<MaskedInput mask="custom" pattern="##/##/####" value={date} onChange={setDate} />`,
        },
        {
          title: "Deshabilitado",
          description: "Muestra NIT formateado en modo solo lectura.",
          preview: (
            <div className="max-w-xs">
              <MaskedInput mask="nit" value="900.123.456-7" onChange={() => {}} disabled />
            </div>
          ),
          code: `<MaskedInput mask="nit" value="900.123.456-7" onChange={() => {}} disabled />`,
        },
      ]}
    />
  );
}
