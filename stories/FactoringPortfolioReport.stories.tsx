import type { Meta, StoryObj } from '@storybook/react';
import { FactoringPortfolioReport } from '../components/patterns/factoring-portfolio-report';

const meta: Meta<typeof FactoringPortfolioReport> = {
  title: 'DSM/Patterns/FactoringPortfolioReport',
  component: FactoringPortfolioReport,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringPortfolioReport>;
export const Default: Story = {};
