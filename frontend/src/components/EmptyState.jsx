import "./EmptyState.css";

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </div>
      <h3 className="empty-state__title">Nenhuma tarefa ainda</h3>
      <p className="empty-state__description">
        Crie sua primeira tarefa usando o campo acima.<br />
        Organize seu dia de forma simples e eficiente.
      </p>
    </div>
  );
}
