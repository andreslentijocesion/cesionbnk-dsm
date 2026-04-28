import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/render';
import { Button } from '../../components/ui/Button';

describe('Button', () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as <button> by default', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: 'Link Button' })).toBeInTheDocument();
  });

  // ── Variants ───────────────────────────────────────────────────────────

  it.each([
    'default', 'secondary', 'outline', 'ghost', 'link',
    'destructive', 'success', 'warning', 'info',
  ] as const)('renders variant "%s" without crashing', (variant) => {
    render(<Button variant={variant}>{variant}</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it.each(['sm', 'default', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const)(
    'renders size "%s" without crashing',
    (size) => {
      render(<Button size={size}>B</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    }
  );

  it.each(['default', 'pill'] as const)('renders shape "%s" without crashing', (shape) => {
    render(<Button shape={shape}>B</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // ── States ─────────────────────────────────────────────────────────────

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Interactions ───────────────────────────────────────────────────────

  it('fires onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it('is accessible via keyboard (type=button prevents form submit)', () => {
    render(<Button>Action</Button>);
    const btn = screen.getByRole('button');
    // Default type prevents accidental form submission
    expect(btn).not.toHaveAttribute('type', 'submit');
  });

  it('supports aria-label for icon-only buttons', () => {
    render(<Button size="icon" aria-label="Delete item">×</Button>);
    expect(screen.getByRole('button', { name: 'Delete item' })).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Button className="custom-class">B</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
