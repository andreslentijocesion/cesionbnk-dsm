import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/render';
import { Input } from '../../components/ui/Input';

describe('Input', () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });

  it('has data-slot="input"', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
  });

  // ── Sizes ──────────────────────────────────────────────────────────────

  it.each(['sm', 'default', 'lg', 'xl'] as const)('renders size "%s" without crashing', (size) => {
    render(<Input size={size} placeholder={size} />);
    expect(screen.getByPlaceholderText(size)).toBeInTheDocument();
  });

  // ── Types ──────────────────────────────────────────────────────────────

  it.each(['text', 'email', 'password', 'number', 'tel', 'url'] as const)(
    'renders type="%s" without crashing',
    (type) => {
      render(<Input type={type} />);
      // password and number aren't 'textbox' role, query by display value
      const inputs = document.querySelectorAll('input');
      expect(inputs.length).toBeGreaterThan(0);
    }
  );

  // ── States ─────────────────────────────────────────────────────────────

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('is required when required prop is set', () => {
    render(<Input required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('marks aria-invalid when aria-invalid is set', () => {
    render(<Input aria-invalid="true" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  // ── Controlled behavior ────────────────────────────────────────────────

  it('reflects controlled value', () => {
    render(<Input value="hello" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('fires onChange when user types', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('fires onBlur when input loses focus', () => {
    const onBlur = vi.fn();
    render(<Input onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('textbox'));
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it('associates with a label via id', () => {
    render(
      <>
        <label htmlFor="email-input">Email</label>
        <Input id="email-input" type="email" />
      </>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
});
