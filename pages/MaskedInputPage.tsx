import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { MaskedInput } from "../components/ui/masked-input";
import { Label } from "../components/ui/label";

function MaskedInputDemo() {
  const [rut, setRut] = useState("123456789");
  const [phone, setPhone] = useState("56912345678");
  const [bank, setBank] = useState("1234567890123456");

  return (
    <div className="space-y-5 max-w-sm">
      <div className="space-y-1.5">
        <Label>RUT</Label>
        <MaskedInput mask="rut" value={rut} onChange={(v) => setRut(v)} />
        <p className="text-xs text-muted-foreground">
          Valor: {rut || "—"} ·{" "}
          {rut.replace(/\D/g, "").length >= 7 && (
            <span className={rut.endsWith("-K") || /\d$/.test(rut) ? "text-success" : "text-muted-foreground"}>
              válido
            </span>
          )}
        </p>
      </div>
      <div className="space-y-1.5">
        <Label>Teléfono (Chile)</Label>
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
      description="Input con formateo automático para RUT (formato chileno con validación de dígito verificador), teléfono (+56) y número de cuenta bancaria. Formatea mientras el usuario escribe."
      category="Forms"
      atomicLevel="Atom"
      preview={<MaskedInputDemo />}
      code={`import { MaskedInput } from "@/components/ui/masked-input"
import { useState } from "react"

export function Demo() {
  const [rut, setRut] = useState("")
  return (
    <MaskedInput
      mask="rut"
      value={rut}
      onChange={(formatted) => setRut(formatted)}
    />
  )
}`}
      props={[
        { name: "mask",           type: '"rut" | "phone" | "bank-account" | "custom"', description: "Tipo de máscara. Default: rut." },
        { name: "value",          type: "string",   description: "Valor formateado actual." },
        { name: "onChange",       type: "(formatted: string, raw: string) => void", description: "Callback con el valor formateado y el valor sin formato." },
        { name: "pattern",        type: "string",   description: "Máscara personalizada: # = dígito (ej. '##/##/####'). Solo para mask='custom'.", required: false },
        { name: "showValidation", type: "boolean",  description: "Muestra borde verde/rojo para validación de RUT. Default: true.", required: false },
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
          description: "Muestra RUT formateado en modo solo lectura.",
          preview: (
            <div className="max-w-xs">
              <MaskedInput mask="rut" value="12.345.678-9" onChange={() => {}} disabled />
            </div>
          ),
          code: `<MaskedInput mask="rut" value="12.345.678-9" onChange={() => {}} disabled />`,
        },
      ]}
    />
  );
}
