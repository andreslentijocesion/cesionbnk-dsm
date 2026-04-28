/**
 * Accessibility tests — axe-core
 *
 * Each test renders a component and asserts zero WCAG violations.
 * Color contrast is disabled (requires real CSS rendering, not jsdom).
 * Everything else — ARIA roles, labels, focus management — is verified.
 */
import { describe, it } from 'vitest';
import { checkA11y } from '../utils/axe';
import { render } from '../utils/render';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Label } from '../../components/ui/Label';

describe('Accessibility — axe-core', () => {
  // ── Button ──────────────────────────────────────────────────────────────

  it('Button/default has no violations', async () => {
    const { container } = render(<Button>Submit</Button>);
    await checkA11y(container);
  });

  it('Button/icon-only with aria-label has no violations', async () => {
    const { container } = render(
      <Button size="icon" aria-label="Close dialog">×</Button>
    );
    await checkA11y(container);
  });

  it('Button/disabled has no violations', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    await checkA11y(container);
  });

  it.each(['destructive', 'success', 'warning', 'info'] as const)(
    'Button/variant="%s" has no violations',
    async (variant) => {
      const { container } = render(<Button variant={variant}>{variant}</Button>);
      await checkA11y(container);
    }
  );

  // ── Input ────────────────────────────────────────────────────────────────

  it('Input with label has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter full name" />
      </div>
    );
    await checkA11y(container);
  });

  it('Input/disabled with label has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" disabled />
      </div>
    );
    await checkA11y(container);
  });

  it('Input/required with label has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input id="phone" type="tel" required aria-required="true" />
      </div>
    );
    await checkA11y(container);
  });

  it('Input/invalid with aria-describedby has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="url-field">URL</Label>
        <Input
          id="url-field"
          type="url"
          aria-invalid="true"
          aria-describedby="url-error"
        />
        <span id="url-error" role="alert">Invalid URL format</span>
      </div>
    );
    await checkA11y(container);
  });

  // ── Badge ────────────────────────────────────────────────────────────────

  it('Badge/default has no violations', async () => {
    const { container } = render(<Badge>Active</Badge>);
    await checkA11y(container);
  });

  it.each(['destructive', 'success', 'warning', 'info'] as const)(
    'Badge/variant="%s" has no violations',
    async (variant) => {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      await checkA11y(container);
    }
  );

  // ── Label ────────────────────────────────────────────────────────────────

  it('Label associated with input has no violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" />
      </div>
    );
    await checkA11y(container);
  });

  // ── Form pattern ────────────────────────────────────────────────────────

  it('Form field group (label + input + error) has no violations', async () => {
    const { container } = render(
      <form>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            aria-invalid="true"
            aria-describedby="username-error"
          />
          <p id="username-error" role="alert">Username is required</p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    );
    await checkA11y(container);
  });
});
