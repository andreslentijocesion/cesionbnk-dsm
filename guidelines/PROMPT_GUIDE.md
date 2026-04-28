# PROMPT GUIDE - Generacion de Paginas DSM

## Estructura Estandar de Paginas del DSM (v0.0.4+)

Todas las paginas del Design System Manager (DSM) deben seguir la **estructura estandar** usando `ComponentShowcase`:

```
Header -> Preview (Preview | Code tabs) -> Props -> Examples
```

### Formato de una pagina DSM tipica

```tsx
import { ComponentShowcase } from "../components/ui/component-showcase";
import { MiComponente } from "../components/ui/mi-componente";

export function MiComponentePage() {
  return (
    <ComponentShowcase
      title="Mi Componente"
      description="Descripcion clara y concisa. Incluye contexto de uso si es relevante."
      category="Forms | Layout | Actions | Feedback | Navigation | Data Display"
      
      preview={
        <MiComponente prop1="value" />
      }
      
      code={`import { MiComponente } from "@/components/ui/mi-componente";

function Demo() {
  return <MiComponente prop1="value" />;
}`}
      
      props={[
        {
          name: "prop1",
          type: "string",
          default: '"default"',
          description: "Descripcion del prop.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback cuando el valor cambia.",
          required: true,
        },
      ]}
      
      examples={[
        {
          title: "Variante Ejemplo",
          description: "Descripcion de este caso de uso",
          preview: <MiComponente variant="secondary" />,
          code: `<MiComponente variant="secondary" />`,
        },
      ]}
    />
  );
}
```

### Props de ComponentShowcase

| Prop | Tipo | Requerido | Descripcion |
|------|------|-----------|-------------|
| `title` | `string` | Si | Nombre del componente |
| `description` | `string` | Si | Descripcion + contexto de uso |
| `category` | `string` | No | Categoria del componente |
| `preview` | `ReactNode` | Si | Vista previa interactiva |
| `code` | `string` | Si | Codigo fuente del preview |
| `props` | `Array<PropDef>` | No | Documentacion de API |
| `examples` | `Array<Example>` | No | Variaciones adicionales |

### Reglas

1. **NO usar** props `usage` ni `usageCode` - fueron eliminados en v0.0.4.
2. **Absorber** cualquier texto de "como usar" directamente en `description`.
3. **Siempre** incluir `preview` + `code` como minimo.
4. **Props** deben documentar al menos: name, type, description.
5. **Examples** son opcionales pero recomendados para componentes con multiples variantes.

### Excepciones

**No hay excepciones.** Desde v0.2.0, el 100% de las 120 paginas del DSM usan `ComponentShowcase`.

Para paginas con contenido complejo (formularios self-contained, dashboards, aggregation pages), se usa el patron de extraer la logica a una funcion interna (`*Content` / `*Demo`) y envolver con `ComponentShowcase` en el export principal.

---

## Plantillas de Prompts para IA

### Crear pagina DSM nueva

```
Crea una pagina DSM para el componente [NombreComponente] ubicado en [ruta].
Usa ComponentShowcase con la estructura estandar:
- title, description (incluye contexto de uso), category
- preview interactivo con el componente real
- code con el import correcto
- props documentando toda la API publica
- al menos 2 examples mostrando variantes principales
```

### Migrar pagina legacy a ComponentShowcase

```
Migra [NombrePage] al formato estandar ComponentShowcase:
1. Extrae la descripcion actual del header
2. Si tiene seccion Usage, absorbe el texto en description
3. Mueve el preview principal a preview=
4. Mueve el codigo a code=
5. Documenta props en props=
6. Mueve ejemplos adicionales a examples=
7. Elimina cualquier prop usage/usageCode
```

### Checklist de validacion

- [ ] Usa `ComponentShowcase` (todas las paginas sin excepcion)
- [ ] `description` incluye contexto de uso (sin seccion Usage separada)
- [ ] `preview` muestra el componente funcionando
- [ ] `code` tiene imports correctos con `@/components/...`
- [ ] `props` documenta la API publica completa
- [ ] Sin props `usage` ni `usageCode`
- [ ] Cada `key` en listas es unico
- [ ] Imports reales del componente (no mocks)

---

*Ultima actualizacion: March 5, 2026 — v0.2.1 (factoring references removed)*