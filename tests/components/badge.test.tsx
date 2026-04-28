import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/render';
import { Badge } from '../../components/ui/badge';

describe('Badge', () => {
  it('renders with text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it.each([
    'default', 'secondary', 'outline', 'neutral',
    'destructive', 'success', 'warning', 'info',
  ] as const)('renders variant "%s" without crashing', (variant) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant)).toBeInTheDocument();
  });

  it('renders as <span> by default', () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText('Label').tagName).toBe('SPAN');
  });

  it('renders as a link with asChild', () => {
    render(
      <Badge asChild>
        <a href="/status">Status</a>
      </Badge>
    );
    expect(screen.getByRole('link', { name: 'Status' })).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Badge className="my-badge">Test</Badge>);
    expect(screen.getByText('Test')).toHaveClass('my-badge');
  });
});
