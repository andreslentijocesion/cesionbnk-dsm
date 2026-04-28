import axe from 'axe-core';

/**
 * Runs axe-core on a container and throws a readable error if violations found.
 * Color-contrast is disabled — requires real CSS, not available in jsdom.
 */
export async function checkA11y(container: HTMLElement): Promise<void> {
  const results = await axe.run(container, {
    rules: {
      'color-contrast': { enabled: false },
    },
  });

  if (results.violations.length === 0) return;

  const messages = results.violations
    .map((v) => {
      const nodes = v.nodes.map((n) => `  - ${n.html}`).join('\n');
      return `[${v.id}] ${v.help}\n${nodes}`;
    })
    .join('\n\n');

  throw new Error(`Accessibility violations found:\n\n${messages}`);
}
