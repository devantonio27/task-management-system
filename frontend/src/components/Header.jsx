import "./Header.css";

export default function Header({ total, concluidas, pendentes }) {
  const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
        <h1 className="header__title">Tarefas</h1>
      </div>

      <div className="header__stats">
        <div className="stat stat--total">
          <span className="stat__number">{total}</span>
          <span className="stat__label">Total</span>
        </div>
        <div className="stat stat--done">
          <span className="stat__number">{concluidas}</span>
          <span className="stat__label">Feitas</span>
        </div>
        <div className="stat stat--pending">
          <span className="stat__number">{pendentes}</span>
          <span className="stat__label">Pendentes</span>
        </div>
      </div>

      {total > 0 && (
        <div className="header__progress">
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${porcentagem}%` }}
            />
          </div>
          <span className="progress-bar__text">{porcentagem}%</span>
        </div>
      )}
    </header>
  );
}
