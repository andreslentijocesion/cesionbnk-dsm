import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { 
  Box, 
  Code, 
  Palette,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { PageTransition, FadeInView, StaggerContainer, StaggerItem } from "../components/ui/PageTransition";
import { InlineSpinner, ButtonLoading } from "../components/ui/LoadingOverlay";
import { 
  SkeletonTable, 
  SkeletonCardGrid,
  SkeletonForm,
  SkeletonList,
  SkeletonKpiCardGroup,
  SkeletonDashboard
} from "../components/ui/SkeletonVariants";
import { useLoadingState, useAsyncOperation, useGlobalLoading } from "../hooks/useLoadingState";
import { CodeBlock } from "../components/ui/CodeBlock";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";

/**
 * AnimationSystemContent
 * Reusable animation system content (without header or PageTransition wrapper).
 * Used by both AnimationSystemPage and the consolidated view in AnimationsPage.
 */
export function AnimationSystemContent() {
  const [showSkeletons, setShowSkeletons] = useState<string | null>(null);
  const { isLoading: buttonLoading, startLoading, stopLoading } = useLoadingState({
    delay: 0,
    minDuration: 1500,
  });
  const { execute, isLoading: asyncLoading, data, error } = useAsyncOperation<{ message: string }>();
  const { startGlobalLoading, stopGlobalLoading, isGlobalLoading } = useGlobalLoading();

  const handleButtonLoading = () => {
    startLoading();
    setTimeout(stopLoading, 2000);
  };

  const handleAsyncOperation = () => {
    execute(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { message: "Data loaded successfully!" };
    });
  };

  const handleGlobalLoading = () => {
    startGlobalLoading("Processing operation...");
    setTimeout(stopGlobalLoading, 2000);
  };

  const toggleSkeleton = (type: string) => {
    setShowSkeletons(showSkeletons === type ? null : type);
    if (showSkeletons !== type) {
      setTimeout(() => setShowSkeletons(null), 3000);
    }
  };

  return (
    <Tabs defaultValue="components" className="w-full">
      <TabsList className="grid w-full grid-cols-4 max-w-lg">
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="hooks">Hooks</TabsTrigger>
        <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
        <TabsTrigger value="css">CSS Utilities</TabsTrigger>
      </TabsList>

      {/* COMPONENTS TAB */}
      <TabsContent value="components" className="space-y-6">
        {/* PageTransition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="size-5 text-primary" />
              PageTransition
            </CardTitle>
            <CardDescription>
              Wrapper for pages with automatic enter/exit animation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Variant: "page" (default)</h4>
                <PageTransition variant="page" className="p-4 border rounded-lg bg-card">
                  <p className="text-sm">Fade + slight slide (best for full pages)</p>
                </PageTransition>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Variant: "fade"</h4>
                <PageTransition variant="fade" className="p-4 border rounded-lg bg-muted">
                  <p className="text-sm">Solo fade in/out</p>
                </PageTransition>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Variant: "scale"</h4>
                <PageTransition variant="scale" className="p-4 border rounded-lg bg-accent">
                  <p className="text-sm">Fade + scale (best for modals)</p>
                </PageTransition>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              code={`import { PageTransition } from '@/components/ui/PageTransition';

function MyPage() {
  return (
    <PageTransition variant="page">
      <h1>My Page</h1>
      <p>Content with automatic animation</p>
    </PageTransition>
  );
}`}
            />
          </CardContent>
        </Card>

        {/* FadeInView */}
        <Card>
          <CardHeader>
            <CardTitle>FadeInView</CardTitle>
            <CardDescription>
              Component that animates when entering the viewport (scroll)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FadeInView>
                <Card className="p-4 bg-card">
                  <p className="text-sm">Appears with fade on scroll</p>
                </Card>
              </FadeInView>

              <FadeInView delay={0.2}>
                <Card className="p-4 bg-muted">
                  <p className="text-sm">With delay of 0.2s</p>
                </Card>
              </FadeInView>
            </div>

            <CodeBlock
              language="tsx"
              code={`import { FadeInView } from '@/components/ui/PageTransition';

<FadeInView delay={0.2}>
  <Card>Appears when you scroll</Card>
</FadeInView>`}
            />
          </CardContent>
        </Card>

        {/* StaggerContainer */}
        <Card>
          <CardHeader>
            <CardTitle>StaggerContainer + StaggerItem</CardTitle>
            <CardDescription>
              For animating lists with stagger (sequential) effect
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <StaggerItem key={i}>
                  <Card className="p-4 text-center bg-muted">
                    <p className="font-semibold">Item {i}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <CodeBlock
              language="tsx"
              code={`import { StaggerContainer, StaggerItem } from '@/components/ui/PageTransition';

<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.name}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>`}
            />
          </CardContent>
        </Card>

        {/* InlineSpinner */}
        <Card>
          <CardHeader>
            <CardTitle>InlineSpinner</CardTitle>
            <CardDescription>Small spinner for inline use</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <InlineSpinner size="sm" />
                <span className="text-sm">Small</span>
              </div>
              <div className="flex items-center gap-2">
                <InlineSpinner size="md" />
                <span className="text-sm">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <InlineSpinner size="lg" />
                <span className="text-sm">Large</span>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              code={`import { InlineSpinner } from '@/components/ui/LoadingOverlay';

<InlineSpinner size="md" />`}
            />
          </CardContent>
        </Card>

        {/* ButtonLoading */}
        <Card>
          <CardHeader>
            <CardTitle>ButtonLoading</CardTitle>
            <CardDescription>Loading state for buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleButtonLoading} disabled={buttonLoading}>
              <ButtonLoading isLoading={buttonLoading} loadingText="Sending...">
                Submit Form
              </ButtonLoading>
            </Button>

            <CodeBlock
              language="tsx"
              code={`import { ButtonLoading } from '@/components/ui/LoadingOverlay';

<Button onClick={handleSubmit} disabled={isLoading}>
  <ButtonLoading isLoading={isLoading} loadingText="Sending...">
    Submit
  </ButtonLoading>
</Button>`}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* HOOKS TAB */}
      <TabsContent value="hooks" className="space-y-6">
        {/* useLoadingState */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="size-5 text-primary" />
              useLoadingState
            </CardTitle>
            <CardDescription>
              Hook for local loading states with delays and minimum duration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted">
              <p className="text-sm mb-4">
                <strong>Features:</strong>
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <strong>delay</strong>: Don't show if operation completes before Xms (prevents flashes)</li>
                <li>• <strong>minDuration</strong>: Show for minimum Xms (prevents flickering)</li>
                <li>• <strong>onStart/onEnd</strong>: Optional callbacks</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button onClick={handleButtonLoading} disabled={buttonLoading}>
                {buttonLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Test Loading (1.5s minimum)
              </Button>
              <p className="text-xs text-muted-foreground">
                With 300ms delay and 1500ms minimum duration
              </p>
            </div>

            <CodeBlock
              language="tsx"
              code={`import { useLoadingState } from '@/hooks/useLoadingState';

function MyComponent() {
  const { isLoading, showLoading, startLoading, stopLoading } = useLoadingState({
    delay: 300,        // Don't show if operation completes before 300ms
    minDuration: 500,  // Show for minimum 500ms
  });

  const handleSubmit = async () => {
    startLoading();
    try {
      await api.submit();
    } finally {
      stopLoading();
    }
  };
}`}
            />
          </CardContent>
        </Card>

        {/* useAsyncOperation */}
        <Card>
          <CardHeader>
            <CardTitle>useAsyncOperation</CardTitle>
            <CardDescription>
              Automatic loading for async operations with error handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Button onClick={handleAsyncOperation} disabled={asyncLoading}>
                {asyncLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Load Data
              </Button>

              {data && (
                <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-success-on-subtle" />
                    <p className="text-sm font-medium">{data.message}</p>
                  </div>
                </Card>
              )}

              {error && (
                <Card className="p-4 bg-destructive/10 border-destructive/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-4 text-destructive" />
                    <p className="text-sm font-medium">{error.message}</p>
                  </div>
                </Card>
              )}
            </div>

            <CodeBlock
              language="tsx"
              code={`import { useAsyncOperation } from '@/hooks/useLoadingState';

function DataFetcher() {
  const { execute, isLoading, data, error } = useAsyncOperation();

  const fetchData = () => {
    execute(async () => {
      const response = await fetch('/api/data');
      return response.json();
    });
  };

  return (
    <>
      <Button onClick={fetchData} disabled={isLoading}>
        Load Data
      </Button>
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}`}
            />
          </CardContent>
        </Card>

        {/* useGlobalLoading */}
        <Card>
          <CardHeader>
            <CardTitle>useGlobalLoading</CardTitle>
            <CardDescription>
              Global loading that covers the entire screen (LoadingOverlay)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGlobalLoading} disabled={isGlobalLoading}>
              {isGlobalLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Show Global Loading
            </Button>

            <CodeBlock
              language="tsx"
              code={`import { useGlobalLoading } from '@/hooks/useLoadingState';

function MyComponent() {
  const { startGlobalLoading, stopGlobalLoading } = useGlobalLoading();

  const handleBigOperation = async () => {
    startGlobalLoading("Processing data...");
    try {
      await bigOperation();
    } finally {
      stopGlobalLoading();
    }
  };
}`}
            />
          </CardContent>
        </Card>

        {/* useScrollToTop */}
        <Card>
          <CardHeader>
            <CardTitle>useScrollToTop</CardTitle>
            <CardDescription>
              Automatic scroll to top when the component mounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page uses <code className="px-1.5 py-0.5 rounded bg-muted text-xs">useScrollToTop()</code> automatically.
              Every time you load it, it scrolls to the top.
            </p>

            <CodeBlock
              language="tsx"
              code={`import { useScrollToTop } from '@/hooks/usePageTransition';

function MyPage() {
  useScrollToTop(); // Scroll to top on mount
  
  return <div>Content</div>;
}`}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* SKELETONS TAB */}
      <TabsContent value="skeletons" className="space-y-6">
        {/* SkeletonTable */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonTable</CardTitle>
            <CardDescription>Skeleton for data tables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('table')}
            >
              {showSkeletons === 'table' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'table' && (
              <div className="fade-in">
                <SkeletonTable rows={5} columns={4} showHeader />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonTable } from '@/components/ui/SkeletonVariants';

<SkeletonTable rows={5} columns={4} showHeader />`}
            />
          </CardContent>
        </Card>

        {/* SkeletonCard */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonCard & SkeletonCardGrid</CardTitle>
            <CardDescription>Skeleton for individual cards or grids</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('cards')}
            >
              {showSkeletons === 'cards' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'cards' && (
              <div className="fade-in">
                <SkeletonCardGrid count={6} columns={3} />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonCard, SkeletonCardGrid } from '@/components/ui/SkeletonVariants';

// Single card
<SkeletonCard hasImage lines={3} />

// Grid of cards
<SkeletonCardGrid count={6} columns={3} />`}
            />
          </CardContent>
        </Card>

        {/* SkeletonForm */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonForm</CardTitle>
            <CardDescription>Skeleton for forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('form')}
            >
              {showSkeletons === 'form' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'form' && (
              <div className="fade-in">
                <SkeletonForm fields={4} hasSubmitButton />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonForm } from '@/components/ui/SkeletonVariants';

<SkeletonForm fields={4} hasSubmitButton />`}
            />
          </CardContent>
        </Card>

        {/* SkeletonList */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonList</CardTitle>
            <CardDescription>Skeleton for lists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('list')}
            >
              {showSkeletons === 'list' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'list' && (
              <div className="fade-in">
                <SkeletonList items={5} variant="detailed" />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonList } from '@/components/ui/SkeletonVariants';

<SkeletonList items={5} variant="detailed" />`}
            />
          </CardContent>
        </Card>

        {/* SkeletonKpiCard */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonKpiCard (Financial)</CardTitle>
            <CardDescription>Skeleton for system-specific KPI cards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('kpi')}
            >
              {showSkeletons === 'kpi' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'kpi' && (
              <div className="fade-in">
                <SkeletonKpiCardGroup count={4} />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonKpiCard, SkeletonKpiCardGroup } from '@/components/ui/SkeletonVariants';

// Single KPI card
<SkeletonKpiCard />

// Group of KPI cards
<SkeletonKpiCardGroup count={4} />`}
            />
          </CardContent>
        </Card>

        {/* SkeletonDashboard */}
        <Card>
          <CardHeader>
            <CardTitle>SkeletonDashboard</CardTitle>
            <CardDescription>Complete skeleton for dashboards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSkeleton('dashboard')}
            >
              {showSkeletons === 'dashboard' ? 'Hide' : 'Show'} Preview
            </Button>

            {showSkeletons === 'dashboard' && (
              <div className="fade-in">
                <SkeletonDashboard />
              </div>
            )}

            <CodeBlock
              language="tsx"
              code={`import { SkeletonDashboard } from '@/components/ui/SkeletonVariants';

<SkeletonDashboard />`}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* CSS UTILITIES TAB */}
      <TabsContent value="css" className="space-y-6">
        {/* Hover Effects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5 text-primary" />
              Hover Effects
            </CardTitle>
            <CardDescription>
              CSS classes for consistent hover effects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover-lift cursor-pointer p-6 text-center">
                <p className="text-sm font-medium">hover-lift</p>
                <p className="text-xs text-muted-foreground mt-1">Lifts + shadow</p>
              </Card>

              <Card className="hover-scale cursor-pointer p-6 text-center">
                <p className="text-sm font-medium">hover-scale</p>
                <p className="text-xs text-muted-foreground mt-1">Scale 1.02</p>
              </Card>

              <Card className="hover-brightness cursor-pointer p-6 text-center">
                <p className="text-sm font-medium">hover-brightness</p>
                <p className="text-xs text-muted-foreground mt-1">Brightness 1.1</p>
              </Card>
            </div>

            <CodeBlock
              language="tsx"
              code={`// Apply directly as className
<Card className="hover-lift">...</Card>
<Card className="hover-scale">...</Card>
<img className="hover-brightness" />`}
            />
          </CardContent>
        </Card>

        {/* Focus States */}
        <Card>
          <CardHeader>
            <CardTitle>Focus States</CardTitle>
            <CardDescription>Classes for visible focus (accessibility)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">focus-ring (outline)</p>
                <input 
                  type="text" 
                  placeholder="Tab to focus"
                  className="focus-ring px-4 py-2 border rounded-lg w-full"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">focus-ring-inset</p>
                <button className="focus-ring-inset px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                  Button with inset focus
                </button>
              </div>
            </div>

            <CodeBlock
              language="tsx"
              code={`<input className="focus-ring" />
<button className="focus-ring-inset">...</button>`}
            />
          </CardContent>
        </Card>

        {/* Animation Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Animation Classes</CardTitle>
            <CardDescription>CSS classes for simple animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="fade-in p-4 text-center bg-card">
                <p className="text-sm font-medium">fade-in</p>
              </Card>

              <Card className="slide-in-right p-4 text-center bg-muted">
                <p className="text-sm font-medium">slide-in-right</p>
              </Card>

              <Card className="zoom-in p-4 text-center bg-accent">
                <p className="text-sm font-medium">zoom-in</p>
              </Card>
            </div>

            <CodeBlock
              language="tsx"
              code={`<div className="fade-in">...</div>
<div className="slide-in-right">...</div>
<div className="zoom-in">...</div>`}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

/**
 * AnimationSystemPage
 * Complete documentation of the animation system:
 * - Components (PageTransition, LoadingOverlay, Skeleton variants)
 * - Hooks (useLoadingState, usePageTransition)
 * - CSS Utilities (hover effects, transitions)
 */
export function AnimationSystemPage() {
  return (
    <ComponentShowcase
      title="Animation System"
      description="Global animation system with layered architecture: Components (PageTransition, FadeInView, StaggerContainer, InlineSpinner, ButtonLoading), Hooks (useLoadingState, useAsyncOperation, useGlobalLoading, useScrollToTop), Skeleton Variants (Table, Card, Form, List, KPI, Dashboard), and CSS Utilities (hover-lift, hover-scale, focus-ring, fade-in, slide-in-right, zoom-in)."
      category="Design System"
      preview={<AnimationSystemContent />}
      code={`// Components
import { PageTransition, FadeInView, StaggerContainer, StaggerItem } from "@/components/ui/PageTransition";
import { InlineSpinner, ButtonLoading } from "@/components/ui/LoadingOverlay";
import { SkeletonTable, SkeletonCard, SkeletonForm, SkeletonDashboard } from "@/components/ui/SkeletonVariants";

// Hooks
import { useLoadingState, useAsyncOperation, useGlobalLoading } from "@/hooks/useLoadingState";
import { useScrollToTop } from "@/hooks/usePageTransition";

// Page Transition wrapper
<PageTransition variant="page"> {/* "page" | "fade" | "scale" */}
  <MyPage />
</PageTransition>

// Scroll-triggered fade
<FadeInView delay={0.2}>
  <Card>Appears on scroll</Card>
</FadeInView>

// Stagger children
<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.name}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>

// Loading hook
const { isLoading, startLoading, stopLoading } = useLoadingState({
  delay: 300,
  minDuration: 500,
});

// CSS classes: hover-lift, hover-scale, focus-ring, fade-in`}
      props={[
        { name: "PageTransition variant", type: "'page' | 'fade' | 'scale'", default: "'page'", description: "Animation variant for page-level transitions." },
        { name: "FadeInView delay", type: "number", default: "0", description: "Delay in seconds before the fade animation starts." },
        { name: "InlineSpinner size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Size of the inline spinner." },
        { name: "useLoadingState delay", type: "number", description: "Don't show loading if operation completes before this delay (ms)." },
        { name: "useLoadingState minDuration", type: "number", description: "Minimum time to show the loading state (ms)." },
        { name: "SkeletonTable rows/columns", type: "number", description: "Number of rows and columns for the skeleton table." },
      ]}
    />
  );
}