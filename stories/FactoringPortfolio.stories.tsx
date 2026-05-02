import type { Meta, StoryObj } from '@storybook/react';
import { FactoringPortfolioTable } from '../components/patterns/factoringportfoliotable';

const meta: Meta<typeof FactoringPortfolioTable> = {
  title: 'DSM/Patterns/FactoringPortfolio',
  component: FactoringPortfolioTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringPortfolioTable>;
export const Default: Story = {};
