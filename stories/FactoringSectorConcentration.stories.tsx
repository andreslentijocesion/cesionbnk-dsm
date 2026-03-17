import type { Meta, StoryObj } from '@storybook/react';
import { FactoringSectorConcentration } from '../components/patterns/factoring-sector-concentration';

const meta: Meta<typeof FactoringSectorConcentration> = {
  title: 'DSM/Patterns/FactoringSectorConcentration',
  component: FactoringSectorConcentration,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FactoringSectorConcentration>;
export const Default: Story = {};
