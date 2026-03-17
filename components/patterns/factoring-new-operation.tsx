import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import {
  CheckCircle2, Building2, FileText, Calculator, ClipboardCheck,
  ChevronLeft, ChevronRight, Upload, AlertCircle, Info,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepState {
  // Step 1 — Cedente
  cedente: string;
  nitCedente: string;
  contactoCedente: string;
  emailCedente: string;
  bancoCedente: string;
  cuentaCedente: string;
  // Step 2 — Factura
  numeroFactura: string;
  deudor: string;
  nitDeudor: string;
  valorNominal: string;
  fechaEmision: string;
  fechaVencimiento: string;
  descripcion: string;
  // Step 3 — Condiciones
  tasa: string;
  plazo: string;
  // Step 4 — (read-only review)
}

const STEPS = [
  { id: 0, label: "Cedente",    icon: Building2,      desc: "Empresa cedente" },
  { id: 1, label: "Factura",    icon: FileText,       desc: "Datos de la factura" },
  { id: 2, label: "Condiciones",icon: Calculator,     desc: "Tasa y plazo" },
  { id: 3, label: "Confirmación",icon: ClipboardCheck, desc: "Revisar y enviar" },
];

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

// ─── Step Indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        const Icon    = step.icon;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all text-xs font-semibold",
                done   ? "border-primary bg-primary text-primary-foreground" :
                active ? "border-primary bg-background text-primary" :
                         "border-muted-foreground/25 bg-muted text-muted-foreground"
              )}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              <span className={cn(
                "text-[10px] font-medium text-center leading-tight max-w-[64px] hidden sm:block",
                active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-2 mb-5 transition-colors",
                i < current ? "bg-primary" : "bg-muted-foreground/20"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Field ─────────────────────────────────────────────────────────────────────

function Field({ label, required, error, hint, children }: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground flex items-center gap-1"><Info className="h-3 w-3" />{hint}</p>}
      {error && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" />{error}</p>}
    </div>
  );
}

// ─── Steps ─────────────────────────────────────────────────────────────────────

function Step1({ data, set }: { data: StepState; set: (k: keyof StepState, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Razón social del cedente" required error={!data.cedente ? "Campo requerido" : undefined}>
          <Input placeholder="Ej: Construcciones Andina S.A." value={data.cedente} onChange={(e) => set("cedente", e.target.value)} className={cn(!data.cedente && "border-destructive/50")} />
        </Field>
        <Field label="NIT" required hint="Sin dígito de verificación" error={!data.nitCedente ? "Campo requerido" : undefined}>
          <Input placeholder="800.234.567" value={data.nitCedente} onChange={(e) => set("nitCedente", e.target.value)} className={cn(!data.nitCedente && "border-destructive/50")} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre del contacto" required>
          <Input placeholder="Ej: Juan Pérez" value={data.contactoCedente} onChange={(e) => set("contactoCedente", e.target.value)} />
        </Field>
        <Field label="Correo electrónico" required>
          <Input type="email" placeholder="contacto@empresa.com" value={data.emailCedente} onChange={(e) => set("emailCedente", e.target.value)} />
        </Field>
      </div>
      <Separator />
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cuenta para desembolso</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Banco" required>
          <Select value={data.bancoCedente} onValueChange={(v) => set("bancoCedente", v)}>
            <SelectTrigger><SelectValue placeholder="Seleccionar banco" /></SelectTrigger>
            <SelectContent>
              {["Bancolombia", "Banco de Bogotá", "Davivienda", "BBVA", "Banco Popular", "Banco de Occidente"].map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Número de cuenta" required>
          <Input placeholder="0000-0000-0000" value={data.cuentaCedente} onChange={(e) => set("cuentaCedente", e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

function Step2({ data, set }: { data: StepState; set: (k: keyof StepState, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Número de factura" required>
          <Input placeholder="Ej: FACT-2025-001" value={data.numeroFactura} onChange={(e) => set("numeroFactura", e.target.value)} />
        </Field>
        <Field label="Valor nominal (COP)" required hint="Valor total de la factura sin descuentos">
          <Input
            placeholder="0"
            value={data.valorNominal}
            onChange={(e) => set("valorNominal", e.target.value.replace(/\D/g, ""))}
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Empresa deudora (pagador)" required>
          <Input placeholder="Ej: Ecopetrol S.A." value={data.deudor} onChange={(e) => set("deudor", e.target.value)} />
        </Field>
        <Field label="NIT del deudor" required>
          <Input placeholder="900.123.456" value={data.nitDeudor} onChange={(e) => set("nitDeudor", e.target.value)} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Fecha de emisión" required>
          <Input type="date" value={data.fechaEmision} onChange={(e) => set("fechaEmision", e.target.value)} />
        </Field>
        <Field label="Fecha de vencimiento" required>
          <Input type="date" value={data.fechaVencimiento} onChange={(e) => set("fechaVencimiento", e.target.value)} />
        </Field>
      </div>
      <Field label="Descripción del bien o servicio" hint="Breve descripción de lo facturado">
        <Textarea
          placeholder="Ej: Servicios de desarrollo de software para plataforma de gestión..."
          rows={3}
          value={data.descripcion}
          onChange={(e) => set("descripcion", e.target.value)}
        />
      </Field>
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/70 transition-colors">
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Adjuntar factura (PDF)</p>
        <p className="text-xs text-muted-foreground">Arrastra el archivo aquí o haz clic para seleccionar</p>
        <Badge variant="neutral-soft-outline" className="text-xs">PDF · máx. 10 MB</Badge>
      </div>
    </div>
  );
}

function Step3({ data, set }: { data: StepState; set: (k: keyof StepState, v: string) => void }) {
  const nominal = Number(data.valorNominal) || 0;
  const tasa    = Number(data.tasa) || 0;
  const plazo   = Number(data.plazo) || 0;
  const descuento    = nominal * (tasa / 100) * (plazo / 30);
  const desembolso   = nominal - descuento;
  const comision     = desembolso * 0.002;
  const netoCedente  = desembolso - comision;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tasa de descuento (% MV)" required hint="Porcentaje mensual vencido">
          <Input
            type="number" min={0} max={10} step={0.1}
            placeholder="Ej: 1.8"
            value={data.tasa}
            onChange={(e) => set("tasa", e.target.value)}
          />
        </Field>
        <Field label="Plazo (días)" required>
          <Select value={data.plazo} onValueChange={(v) => set("plazo", v)}>
            <SelectTrigger><SelectValue placeholder="Seleccionar plazo" /></SelectTrigger>
            <SelectContent>
              {[30, 45, 60, 90, 120].map((d) => (
                <SelectItem key={d} value={String(d)}>{d} días</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Simulación financiera */}
      {nominal > 0 && tasa > 0 && plazo > 0 && (
        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
          <div className="px-4 py-2.5 bg-muted border-b border-border">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Simulación financiera</p>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { label: "Valor nominal de la factura",    value: COP(nominal),     highlight: false },
              { label: `Descuento (${tasa}% MV × ${plazo}d)`, value: `- ${COP(descuento)}`, highlight: false, muted: true },
              { label: "Valor a desembolsar",            value: COP(desembolso),  highlight: false },
              { label: "Comisión de gestión (0.2%)",     value: `- ${COP(comision)}`,  highlight: false, muted: true },
              { label: "Neto para el cedente",           value: COP(netoCedente), highlight: true },
            ].map((row) => (
              <div key={row.label} className={cn("flex items-center justify-between px-4 py-2.5", row.highlight && "bg-primary/5")}>
                <span className={cn("text-sm", row.muted ? "text-muted-foreground" : "text-foreground", row.highlight && "font-semibold")}>
                  {row.label}
                </span>
                <span className={cn("text-sm font-mono tabular-nums", row.muted ? "text-muted-foreground" : "text-foreground", row.highlight && "font-bold text-primary")}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 bg-muted border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3 w-3 flex-shrink-0" />
              Tasa efectiva anual estimada: <strong className="text-foreground">{(((1 + tasa / 100) ** 12) - 1).toFixed(1)}% EA</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Step4({ data }: { data: StepState }) {
  const nominal = Number(data.valorNominal) || 0;
  const tasa    = Number(data.tasa) || 0;
  const plazo   = Number(data.plazo) || 0;

  const sections = [
    {
      title: "Cedente",
      rows: [
        ["Empresa",  data.cedente      || "—"],
        ["NIT",      data.nitCedente   || "—"],
        ["Contacto", data.contactoCedente || "—"],
        ["Banco",    data.bancoCedente  || "—"],
        ["Cuenta",   data.cuentaCedente || "—"],
      ],
    },
    {
      title: "Factura",
      rows: [
        ["N.° Factura",       data.numeroFactura    || "—"],
        ["Deudor",            data.deudor           || "—"],
        ["NIT deudor",        data.nitDeudor        || "—"],
        ["Valor nominal",     nominal ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(nominal) : "—"],
        ["Fecha emisión",     data.fechaEmision     || "—"],
        ["Fecha vencimiento", data.fechaVencimiento || "—"],
      ],
    },
    {
      title: "Condiciones",
      rows: [
        ["Tasa de descuento", tasa  ? `${tasa}% MV`  : "—"],
        ["Plazo",             plazo ? `${plazo} días` : "—"],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-warning/40 bg-warning/5 px-4 py-3 flex gap-2.5">
        <Info className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
        <p className="text-sm text-warning">
          Al confirmar, la operación pasará a <strong>revisión por el comité de crédito</strong>. Recibirás notificación en un plazo máximo de 24 horas hábiles.
        </p>
      </div>
      {sections.map((s) => (
        <div key={s.title} className="rounded-lg border border-border overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b border-border">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.title}</p>
          </div>
          <div className="divide-y divide-border/40">
            {s.rows.map(([k, v]) => (
              <div key={k} className="flex px-4 py-2 text-sm">
                <span className="text-muted-foreground w-44 flex-shrink-0">{k}</span>
                <span className="text-foreground font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const initialState: StepState = {
  cedente: "", nitCedente: "", contactoCedente: "", emailCedente: "",
  bancoCedente: "", cuentaCedente: "",
  numeroFactura: "", deudor: "", nitDeudor: "", valorNominal: "",
  fechaEmision: "", fechaVencimiento: "", descripcion: "",
  tasa: "", plazo: "",
};

export function FactoringNewOperation() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof StepState, v: string) => setData((d) => ({ ...d, [k]: v }));

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <Card className="border shadow-sm max-w-lg mx-auto">
        <CardContent className="py-12 flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-success/15 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Operación radicada</h3>
            <p className="text-sm text-muted-foreground">
              Tu solicitud fue enviada al comité de crédito.<br />
              Folio asignado: <strong className="font-mono text-foreground">FCT-2025-009</strong>
            </p>
          </div>
          <Badge variant="warning-soft-outline">En revisión</Badge>
          <Button variant="outline" onClick={() => { setStep(0); setData(initialState); setSubmitted(false); }} className="mt-2">
            Nueva operación
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="px-6 pt-5 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base">Nueva operación de factoring</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Paso {step + 1} de {STEPS.length} · {STEPS[step].desc}</p>
          </div>
          <Badge variant="secondary-soft-outline" className="text-xs">Borrador</Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-1.5" />
        </div>
        <StepIndicator current={step} />
      </CardHeader>

      <Separator />

      <CardContent className="px-6 py-5">
        {step === 0 && <Step1 data={data} set={set} />}
        {step === 1 && <Step2 data={data} set={set} />}
        {step === 2 && <Step3 data={data} set={set} />}
        {step === 3 && <Step4 data={data} />}
      </CardContent>

      <Separator />

      <div className="px-6 py-4 flex items-center justify-between bg-muted/30">
        <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
        </Button>
        <span className="text-xs text-muted-foreground hidden sm:block">
          {step < 3 ? "Complete los campos requeridos (*) para continuar" : "Revise la información antes de confirmar"}
        </span>
        {step < 3 ? (
          <Button size="sm" onClick={() => setStep((s) => Math.min(3, s + 1))}>
            Siguiente <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button size="sm" onClick={() => setSubmitted(true)}>
            <CheckCircle2 className="h-4 w-4 mr-1.5" /> Confirmar y radicar
          </Button>
        )}
      </div>
    </Card>
  );
}
