import { useState } from "react"
import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { CommentThread, type Comment } from "../components/patterns/comment-thread"
import { toast } from "sonner"

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Ana Valdés",
    initials: "AV",
    content: "Cedente verificado en DICOM. Sin antecedentes negativos en los últimos 24 meses. Score Equifax: 720.",
    timestamp: "Hace 2 días",
    visibility: "internal",
  },
  {
    id: "2",
    author: "Carlos Riquelme",
    initials: "CR",
    content: "Se validó la factura con el deudor Banco de Bogotá. Confirmaron que la deuda está vigente y será pagada dentro del plazo.",
    timestamp: "Hace 1 día",
    visibility: "internal",
  },
  {
    id: "3",
    author: "María González",
    initials: "MG",
    content: "Esperando firma del gerente para continuar con el desembolso.",
    timestamp: "Hace 3 horas",
    visibility: "internal",
    replyTo: "2",
    replyToAuthor: "Carlos Riquelme",
  },
];

function CommentThreadDemo() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const addComment = (content: string, visibility: "internal" | "public") => {
    const newComment: Comment = {
      id: String(Date.now()),
      author: "Tú",
      initials: "TU",
      content,
      timestamp: "Ahora",
      visibility,
    };
    setComments(prev => [...prev, newComment]);
    toast.success("Comentario agregado");
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
    toast.info("Comentario eliminado");
  };

  return (
    <div className="max-w-lg">
      <CommentThread
        comments={comments}
        currentUser="Tú"
        currentUserInitials="TU"
        onAddComment={addComment}
        onDeleteComment={deleteComment}
        allowPublic={false}
      />
    </div>
  );
}

export function CommentThreadPage() {
  return (
    <ComponentShowcase
      title="Comment Thread"
      description="Hilo de notas internas y comentarios para operaciones, cedentes y deudores. Soporta respuestas anidadas, visibilidad interna/pública y eliminación de comentarios propios."
      category="Patterns"
      atomicLevel="Organism"
      preview={<CommentThreadDemo />}
      code={`import { CommentThread } from "@/components/patterns/CommentThread"
import { useState } from "react"

const initialComments = [
  {
    id: "1",
    author: "Ana Valdés",
    initials: "AV",
    content: "Cedente verificado. Score: 720.",
    timestamp: "Hace 2 días",
    visibility: "internal",
  },
]

export function Demo() {
  const [comments, setComments] = useState(initialComments)

  return (
    <CommentThread
      comments={comments}
      currentUser="Ana Valdés"
      currentUserInitials="AV"
      onAddComment={(content, visibility) => {
        setComments(prev => [...prev, { id: Date.now().toString(), author: "Ana Valdés", initials: "AV", content, timestamp: "Ahora", visibility }])
      }}
      onDeleteComment={(id) => setComments(prev => prev.filter(c => c.id !== id))}
    />
  )
}`}
      props={[
        { name: "comments",             type: "Comment[]",   description: "Lista de comentarios a mostrar." },
        { name: "currentUser",          type: "string",      description: "Nombre del usuario actual (para mostrar botón de eliminar en sus comentarios).", required: false },
        { name: "currentUserInitials",  type: "string",      description: "Iniciales para el avatar del compositor.", required: false },
        { name: "onAddComment",         type: "(content, visibility) => void", description: "Callback al enviar un nuevo comentario.", required: false },
        { name: "onDeleteComment",      type: "(id: string) => void", description: "Callback al eliminar un comentario.", required: false },
        { name: "allowPublic",          type: "boolean",     description: "Muestra toggle Interno/Público en el compositor. Default: false.", required: false },
      ]}
      examples={[
        {
          title: "Solo lectura (sin compositor)",
          description: "Para mostrar el historial sin permitir agregar comentarios.",
          preview: (
            <div className="max-w-lg">
              <CommentThread
                comments={initialComments}
                currentUser="Tú"
                currentUserInitials="TU"
              />
            </div>
          ),
          code: `// Sin onAddComment = solo lectura
<CommentThread comments={comments} currentUser="Ana" currentUserInitials="AV" />`,
        },
        {
          title: "Con visibilidad pública",
          description: "Para casos donde los comentarios pueden ser visibles externamente.",
          preview: (
            <div className="max-w-lg">
              <CommentThread
                comments={[]}
                currentUser="Tú"
                currentUserInitials="TU"
                onAddComment={() => {}}
                allowPublic
              />
            </div>
          ),
          code: `<CommentThread allowPublic onAddComment={handleAdd} ... />`,
        },
      ]}
    />
  );
}
