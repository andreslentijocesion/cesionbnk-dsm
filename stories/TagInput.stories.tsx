import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from '../components/ui/taginput';

const meta: Meta<typeof TagInput> = {
  title: 'DSM/Primitives/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'radio', options: ['default', 'secondary', 'outline'] },
    max:         { control: 'number' },
    disabled:    { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: { value: ['Factoring', 'Cesión'], placeholder: 'Agregar etiqueta…', disabled: false },
  decorators: [
    (Story, ctx) => {
      const [tags, setTags] = useState<string[]>(ctx.args.value ?? []);
      return <div className="max-w-sm"><Story args={{ ...ctx.args, value: tags, onChange: setTags }} /></div>;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {};

export const ConLimite: Story = {
  args: { value: ['Tag 1', 'Tag 2'], max: 3, placeholder: 'Máx. 3 etiquetas' },
};

export const Variantes: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <TagInput value={['Default']}   onChange={() => {}} variant="default" />
      <TagInput value={['Secondary']} onChange={() => {}} variant="secondary" />
      <TagInput value={['Outline']}   onChange={() => {}} variant="outline" />
    </div>
  ),
};
