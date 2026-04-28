/**
 * CommentThread — Internal notes and comments for operations, cedents, debtors
 * Supports internal/public visibility, replies, and timestamps.
 * @layer patterns
 */
import { useState } from "react";
import { Send, Lock, Globe, Reply, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

import { cn } from "../ui/utils";

export type CommentVisibility = "internal" | "public";

export interface Comment {
  id: string;
  author: string;
  /** Initials for avatar fallback */
  initials: string;
  content: string;
  timestamp: string;
  visibility: CommentVisibility;
  /** ID of parent comment if this is a reply */
  replyTo?: string;
  replyToAuthor?: string;
}

export interface CommentThreadProps {
  comments: Comment[];
  /** Current user's display name */
  currentUser?: string;
  currentUserInitials?: string;
  onAddComment?: (content: string, visibility: CommentVisibility) => void;
  onDeleteComment?: (id: string) => void;
  /** Show visibility toggle in composer */
  allowPublic?: boolean;
  className?: string;
}

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div className={cn(
      "flex-shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-2xs font-bold text-primary",
      className
    )}>
      {initials}
    </div>
  );
}

export function CommentThread({
  comments,
  currentUser = "Tú",
  currentUserInitials = "TU",
  onAddComment,
  onDeleteComment,
  allowPublic = false,
  className,
}: CommentThreadProps) {
  const [draft, setDraft] = useState("");
  const [visibility, setVisibility] = useState<CommentVisibility>("internal");
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const handleSubmit = () => {
    if (!draft.trim()) return;
    onAddComment?.(draft.trim(), visibility);
    setDraft("");
    setReplyingTo(null);
  };

  const topLevel = comments.filter((c) => !c.replyTo);
  const getReplies = (id: string) => comments.filter((c) => c.replyTo === id);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Comment list */}
      {comments.length === 0 ? (
        <div className="py-8 flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Send className="h-4 w-4 opacity-40" />
          </div>
          <p className="text-sm">Sin comentarios aún</p>
        </div>
      ) : (
        <div className="space-y-3">
          {topLevel.map((comment) => {
            const replies = getReplies(comment.id);
            return (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  onReply={() => setReplyingTo(comment)}
                  onDelete={onDeleteComment}
                  currentUser={currentUser}
                />
                {replies.length > 0 && (
                  <div className="ml-9 mt-2 space-y-2 border-l-2 border-border pl-3">
                    {replies.map((r) => (
                      <CommentItem
                        key={r.id}
                        comment={r}
                        onDelete={onDeleteComment}
                        currentUser={currentUser}
                        isReply
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Composer */}
      {onAddComment && (
        <div className="border-t border-border pt-3 space-y-2">
          {replyingTo && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-md px-3 py-1.5">
              <Reply className="h-3.5 w-3.5" />
              <span>Respondiendo a <strong>{replyingTo.author}</strong></span>
              <button onClick={() => setReplyingTo(null)} className="ml-auto hover:text-foreground">
                <span aria-label="Cancelar respuesta">✕</span>
              </button>
            </div>
          )}
          <div className="flex gap-2 items-start">
            <Avatar initials={currentUserInitials} />
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Escribe un comentario..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-[72px] resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
                }}
              />
              <div className="flex items-center justify-between gap-2">
                {allowPublic ? (
                  <div className="flex items-center rounded-lg border border-border bg-muted p-0.5 gap-0.5">
                    {(["internal", "public"] as CommentVisibility[]).map((v) => (
                      <button
                        key={v}
                        onClick={() => setVisibility(v)}
                        className={cn(
                          "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
                          visibility === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {v === "internal" ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                        {v === "internal" ? "Interno" : "Público"}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Nota interna</span>
                  </div>
                )}
                <Button
                  size="sm"
                  className="h-8 text-xs"
                  disabled={!draft.trim()}
                  onClick={handleSubmit}
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Comentar
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pl-9">⌘+Enter para enviar</p>
        </div>
      )}
    </div>
  );
}

function CommentItem({
  comment,
  onReply,
  onDelete,
  currentUser,
  isReply = false,
}: {
  comment: Comment;
  onReply?: () => void;
  onDelete?: (id: string) => void;
  currentUser: string;
  isReply?: boolean;
}) {
  const isOwn = comment.author === currentUser;

  return (
    <div className="flex gap-2.5 group">
      <Avatar initials={comment.initials} className={isReply ? "h-6 w-6 text-2xs" : undefined} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-xs font-semibold text-foreground">{comment.author}</span>
          {comment.visibility === "internal" && (
            <Badge variant="outline" className="text-xs">
              <Lock className="h-2.5 w-2.5" /> Interno
            </Badge>
          )}
          {comment.replyToAuthor && (
            <span className="text-xs text-muted-foreground">→ {comment.replyToAuthor}</span>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{comment.timestamp}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{comment.content}</p>
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onReply && !isReply && (
            <button
              onClick={onReply}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="h-3 w-3" /> Responder
            </button>
          )}
          {isOwn && onDelete && (
            <button
              onClick={() => onDelete(comment.id)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
