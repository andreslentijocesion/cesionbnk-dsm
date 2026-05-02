import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommentThread, type Comment } from '../components/patterns/comment-thread';

const initialComments: Comment[] = [
  { id: '1', author: 'Ana Valdés',      initials: 'AV', content: 'Cedente verificado. Score: 720.',       timestamp: 'Hace 2 días', visibility: 'internal' },
  { id: '2', author: 'Carlos Riquelme', initials: 'CR', content: 'Deuda confirmada con Banco de Bogotá.', timestamp: 'Hace 1 día',  visibility: 'internal' },
  { id: '3', author: 'María González',  initials: 'MG', content: 'Esperando firma del gerente.',          timestamp: 'Hace 3 h',    visibility: 'internal', replyTo: '2', replyToAuthor: 'Carlos Riquelme' },
];

// Wrapping in a stateful component to make the story interactive
function InteractiveThread({ allowPublic = false }: { allowPublic?: boolean }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  return (
    <div className="max-w-lg">
      <CommentThread
        comments={comments}
        currentUser="Tú"
        currentUserInitials="TU"
        allowPublic={allowPublic}
        onAddComment={(content, visibility) =>
          setComments((prev) => [...prev, {
            id: String(Date.now()), author: 'Tú', initials: 'TU',
            content, timestamp: 'Ahora', visibility,
          }])
        }
        onDeleteComment={(id) =>
          setComments((prev) => prev.filter((c) => c.id !== id))
        }
      />
    </div>
  );
}

const meta: Meta = {
  title: 'DSM/Patterns/CommentThread',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <InteractiveThread />,
};

export const ConVisibilidadPublica: Story = {
  render: () => <InteractiveThread allowPublic />,
};

export const SoloLectura: Story = {
  render: () => (
    <div className="max-w-lg">
      <CommentThread comments={initialComments} currentUser="Tú" currentUserInitials="TU" />
    </div>
  ),
};
