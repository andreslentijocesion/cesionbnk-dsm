# Testing — CESIONBNK DSM

## Stack

| Tool | Propósito |
|------|-----------|
| [Vitest](https://vitest.dev) | Test runner nativo de Vite |
| [React Testing Library](https://testing-library.com/react) | Render e interacción de componentes |
| [vitest-axe](https://github.com/chaance/vitest-axe) | WCAG via axe-core |
| [@testing-library/user-event](https://testing-library.com/user-event) | Simulación realista de input de usuario |

## Comandos

```bash
npm test               # Correr todos los tests una vez
npm run test:watch     # Modo watch (desarrollo)
npm run test:ui        # UI visual en el browser
npm run test:coverage  # Coverage report en /coverage
```

## Estructura

```
tests/
  setup.ts                        # Configuración global (jest-dom + axe matchers)
  utils/
    render.tsx                    # render() con ThemeProvider incluido
  components/
    button.test.tsx               # Comportamiento + props del Button
    input.test.tsx                # Comportamiento + props del Input
    badge.test.tsx                # Comportamiento + props del Badge
  a11y/
    primitives.a11y.test.tsx      # WCAG axe-core: Button, Input, Badge, Label
```

## Qué se testea

### Tests de comportamiento (`tests/components/`)
- Renderizado correcto sin crashes
- Todas las variantes y tamaños
- Estados: disabled, required, aria-invalid
- Interacciones: onClick, onChange, onBlur
- Forwarding de props (className, ref)

### Tests de accesibilidad (`tests/a11y/`)
- axe-core verifica: roles ARIA, labels, estructura semántica, jerarquía de headings
- Color-contrast deshabilitado (requiere CSS real, no disponible en jsdom)
- Patrones compuestos: campo con label + input + mensaje de error

## Agregar tests para un nuevo componente

1. Crea `tests/components/mi-componente.test.tsx`
2. Agrega casos axe en `tests/a11y/primitives.a11y.test.tsx`
3. Sigue el patrón: Rendering → Variants → States → Interactions → Accessibility

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/render';
import { MiComponente } from '../../components/ui/mi-componente';

describe('MiComponente', () => {
  it('renders without crashing', () => {
    render(<MiComponente />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

## Convenciones

- Un archivo de test por componente
- Describe blocks = nombre del componente
- Test names en inglés para consistencia con el codebase
- No testear CSS visual — para eso existe visual regression (Playwright, pendiente)
