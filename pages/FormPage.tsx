import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { toast } from "sonner";

// ── Validation schema ───────────────────────────────────────────────────────

const formSchema = z.object({
  // Cedente
  empresa:   z.string().min(3,  { message: "Mínimo 3 caracteres." }),
  rut:       z.string().regex(/^\d{1,8}-[\dkK]$/, { message: "Formato inválido. Ej: 12345678-9" }),
  email:     z.string().email({ message: "Email inválido." }),
  telefono:  z.string().regex(/^\+?\d{8,15}$/, { message: "Teléfono inválido." }).optional().or(z.literal("")),

  // Operación
  tipo:      z.string({ required_error: "Selecciona un tipo de operación." }),
  monto:     z.coerce.number({ invalid_type_error: "Ingresa un monto válido." })
               .min(1_000_000, { message: "Monto mínimo: $1.000.000." })
               .max(5_000_000_000, { message: "Monto máximo: $5.000M." }),
  plazo:     z.coerce.number().min(1).max(365, { message: "Máximo 365 días." }),
  deudor:    z.string().min(3, { message: "Mínimo 3 caracteres." }),

  // Configuración
  observaciones: z.string().max(500, { message: "Máximo 500 caracteres." }).optional(),
  terminos:      z.boolean().refine((v) => v === true, {
                   message: "Debes aceptar los términos para continuar.",
                 }),
});

type FormValues = z.infer<typeof formSchema>;

// ── Form component ──────────────────────────────────────────────────────────

function NuevaOperacionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empresa: "", rut: "", email: "", telefono: "",
      tipo: undefined, monto: undefined, plazo: 60, deudor: "",
      observaciones: "", terminos: false,
    },
  });

  function onSubmit(values: FormValues) {
    toast.success("Operación registrada", {
      description: `${values.empresa} · $${values.monto.toLocaleString("es-CL")} · ${values.plazo} días`,
    });
    console.log(values);
  }

  const charCount = form.watch("observaciones")?.length ?? 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">

        {/* ── Datos del cedente ── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Datos del cedente</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Empresa que cede las facturas.</p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Razón social <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Construcciones Andina S.A." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="12345678-9" {...field} />
                  </FormControl>
                  <FormDescription>Sin puntos, con guión.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de contacto <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contacto@empresa.cl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+56912345678" {...field} />
                  </FormControl>
                  <FormDescription>Opcional. Incluye código de país.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Datos de la operación ── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Datos de la operación</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Parámetros financieros de la cesión.</p>
          </div>
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de operación <span className="text-destructive">*</span></FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="factoring">Factoring</SelectItem>
                      <SelectItem value="confirming">Confirming</SelectItem>
                      <SelectItem value="leasing">Leasing</SelectItem>
                      <SelectItem value="credito-directo">Crédito directo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deudor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deudor (pagador) <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Banco de Bogotá S.A." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto nominal (CLP) <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1000000}
                      placeholder="185000000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription>Valor bruto de las facturas cedidas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plazo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plazo (días) <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={365}
                      placeholder="60"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription>Días desde desembolso hasta vencimiento.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ── Observaciones y términos ── */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Configuración adicional</h3>
          </div>
          <Separator />

          <FormField
            control={form.control}
            name="observaciones"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingresa notas adicionales sobre la operación..."
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormDescription>Comentarios internos para el equipo de análisis.</FormDescription>
                  <span className="text-xs text-muted-foreground">{charCount}/500</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terminos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Acepto los términos y condiciones <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormDescription>
                    Declaro que la información proporcionada es verídica y autorizo el proceso de verificación crediticia.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit">Registrar operación</Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpiar formulario
          </Button>
        </div>
      </form>
    </Form>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function FormPage() {
  return (
    <ComponentShowcase
      title="Form"
      description="Formularios accesibles construidos con React Hook Form y validación Zod. Agrupa campos por secciones, muestra mensajes de error inline, descripciones de ayuda, contadores de caracteres y manejo de estado de envío."
      category="Forms"
      atomicLevel="Pattern"
      preview={<NuevaOperacionForm />}
      code={`import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  empresa: z.string().min(3),
  rut:     z.string().regex(/^\\d{1,8}-[\\dkK]$/),
  email:   z.string().email(),
  tipo:    z.string(),
  monto:   z.coerce.number().min(1_000_000),
  plazo:   z.coerce.number().min(1).max(365),
  terminos: z.boolean().refine((v) => v === true),
})

export function NuevaOperacionForm() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { ... } })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
        <FormField
          control={form.control}
          name="empresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón social</FormLabel>
              <FormControl><Input placeholder="Construcciones Andina S.A." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ... more fields ... */}
        <Button type="submit">Registrar operación</Button>
      </form>
    </Form>
  )
}`}
      props={[
        { name: "Form",            type: "Component", description: "Proveedor de contexto del formulario (FormProvider de react-hook-form)." },
        { name: "FormField",       type: "Component", description: "Conecta un campo al contexto. Requiere control, name y render." },
        { name: "FormItem",        type: "Component", description: "Contenedor de campo con espaciado y accesibilidad ARIA." },
        { name: "FormLabel",       type: "Component", description: "Label accesible asociado al FormItem." },
        { name: "FormControl",     type: "Component", description: "Wrapper que propaga id y aria-* al input hijo." },
        { name: "FormDescription", type: "Component", description: "Texto de ayuda asociado al campo (aria-describedby)." },
        { name: "FormMessage",     type: "Component", description: "Muestra el mensaje de error de Zod inline bajo el campo." },
      ]}
      examples={[]}
    />
  );
}
