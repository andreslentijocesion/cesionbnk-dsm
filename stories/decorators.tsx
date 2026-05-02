import React from 'react';
import { ThemeProvider } from '../components/providers/themeprovider';
import { LoadingProvider } from '../components/providers/loadingprovider';
import { HelpProvider } from '../components/help/helpprovider';
import { TransitionProvider } from '../components/providers/transitionprovider';
import { SidebarProvider } from '../components/ui/sidebar';

export const withGlobalProviders = (Story: any) => (
  <ThemeProvider>
    <LoadingProvider>
      <HelpProvider>
        <TransitionProvider>
          <SidebarProvider>
            <div className="p-8 bg-background min-h-screen text-foreground">
              <Story />
            </div>
          </SidebarProvider>
        </TransitionProvider>
      </HelpProvider>
    </LoadingProvider>
  </ThemeProvider>
);
