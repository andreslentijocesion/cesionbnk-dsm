import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { DateNavigator, type DateRange } from "../components/ui/DateNavigator";
import { Card, CardContent } from "../components/ui/Card";

function DateNavigatorDemo() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-4 max-w-2xl">
      <DateNavigator value={range} onChange={setRange} />
      {range && (
        <Card>
          <CardContent className="p-4 text-sm space-y-1">
            <p className="font-medium text-foreground">Período seleccionado: <span className="text-primary">{range.label}</span></p>
            <p className="text-muted-foreground text-xs">
              Desde {range.from.toLocaleDateString("es-CO")} hasta {range.to.toLocaleDateString("es-CO")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function DateNavigatorPage() {
  return (
    <ComponentShowcase
      title="Date Navigator"
      description="Selector de período para filtrar dashboards y reportes. Presets: Hoy, Semana, Mes, Trimestre, Año. Incluye flechas de navegación para ir al período anterior/siguiente."
      category="Forms"
      atomicLevel="Molecule"
      preview={<DateNavigatorDemo />}
      code={`import { DateNavigator, type DateRange } from "@/components/ui/DateNavigator"
import { useState } from "react"

export function Demo() {
  const [range, setRange] = useState<DateRange>()
  return (
    <DateNavigator
      value={range}
      onChange={setRange}
    />
  )
}`}
      props={[
        { name: "value",          type: "DateRange",     description: "Rango activo controlado (from, to, preset, label).", required: false },
        { name: "onChange",       type: "(range: DateRange) => void", description: "Callback al cambiar período.", required: false },
        { name: "presets",        type: "DatePreset[]",  description: "Presets disponibles. Default: ['today','week','month','quarter','year'].", required: false },
        { name: "showNavigation", type: "boolean",       description: "Muestra flechas prev/next. Default: true.", required: false },
      ]}
      examples={[
        {
          title: "Solo mes y trimestre",
          description: "Versión compacta para paneles de control.",
          preview: (
            <DateNavigator presets={["month", "quarter", "year"]} />
          ),
          code: `<DateNavigator presets={["month", "quarter", "year"]} />`,
        },
        {
          title: "Sin navegación",
          description: "Solo selección de preset, sin flechas.",
          preview: (
            <DateNavigator showNavigation={false} />
          ),
          code: `<DateNavigator showNavigation={false} />`,
        },
      ]}
    />
  );
}
