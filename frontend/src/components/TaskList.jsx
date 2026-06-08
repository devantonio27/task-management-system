import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";
import "./TaskList.css";

export default function TaskList({ tarefas, loading, onToggle, onAtualizar, onRemover }) {
  if (loading) {
    return (
      <div className="task-list__loading">
        <div className="task-list__loading-dots">
          <span /><span /><span />
        </div>
        <p>Carregando tarefas...</p>
      </div>
    );
  }

  if (tarefas.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="task-list">
      {tarefas.map((tarefa) => (
        <TaskItem
          key={tarefa.id}
          tarefa={tarefa}
          onToggle={onToggle}
          onAtualizar={onAtualizar}
          onRemover={onRemover}
        />
      ))}
    </div>
  );
}
