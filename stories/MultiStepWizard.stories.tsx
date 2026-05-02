import type { Meta, StoryObj } from '@storybook/react';
import { MultiStepWizard } from '../components/patterns/multistepwizard';

const meta: Meta<typeof MultiStepWizard> = {
  title: 'DSM/Patterns/MultiStepWizard',
  component: MultiStepWizard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MultiStepWizard>;

export const Default: Story = {};
