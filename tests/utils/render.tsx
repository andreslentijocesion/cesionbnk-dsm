import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../../components/providers/themeprovider';

function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function renderWithProviders(ui: ReactNode, options?: RenderOptions) {
  return render(ui, { wrapper: Providers, ...options });
}

export { renderWithProviders as render };
export * from '@testing-library/react';
