import { useState } from "react";
import "./TaskItem.css";

export default function TaskItem({ tarefa, onToggle, onAtualizar, onRemover }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [removendo, setRemovendo] = useState(false);

  const handleEditar = async () => {
    const trimmed = titulo.trim();
    if (trimmed.length >= 3 && trimmed !== tarefa.titulo) {
      await onAtualizar(tarefa.id, {
        titulo: trimmed,
        concluida: tarefa.concluida,
      });
    } else {
      setTitulo(tarefa.titulo);
    }
    setEditando(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEditar();
    if (e.key === "Escape") {
      setTitulo(tarefa.titulo);
      setEditando(false);
    }
  };

  const handleRemover = async () => {
    setRemovendo(true);
    // Wait for exit animation
    setTimeout(async () => {
      await onRemover(tarefa.id);
    }, 300);
  };

  return (
    <div
      className={`task-item ${tarefa.concluida ? "task-item--done" : ""} ${removendo ? "task-item--removing" : ""}`}
      id={`task-${tarefa.id}`}
    >
      <button
        className="task-item__check"
        onClick={() => onToggle(tarefa)}
        aria-label={tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
      >
        <div className={`task-item__checkbox ${tarefa.concluida ? "task-item__checkbox--checked" : ""}`}>
          {tarefa.concluida && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </button>

      {editando ? (
        <input
          className="task-item__edit"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onBlur={handleEditar}
          onKeyDown={handleKeyDown}
          maxLength={100}
          autoFocus
        />
      ) : (
        <span
          className="task-item__titulo"
          onDoubleClick={() => setEditando(true)}
          title="Clique duas vezes para editar"
        >
          {tarefa.titulo}
        </span>
      )}

      <button
        className="task-item__delete"
        onClick={handleRemover}
        aria-label="Remover tarefa"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      </button>
    </div>
  );
}
