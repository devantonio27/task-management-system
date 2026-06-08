import { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onCriar }) {
  const [titulo, setTitulo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = titulo.trim();

    if (trimmed.length < 3) {
      setErro("O título deve ter pelo menos 3 caracteres");
      return;
    }
    if (trimmed.length > 100) {
      setErro("O título deve ter no máximo 100 caracteres");
      return;
    }

    try {
      setEnviando(true);
      setErro("");
      await onCriar(trimmed);
      setTitulo("");
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__input-wrapper">
        <input
          id="task-input"
          type="text"
          className="task-form__input"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (erro) setErro("");
          }}
          disabled={enviando}
          maxLength={100}
          autoComplete="off"
        />
        <button
          id="task-submit"
          type="submit"
          className="task-form__button"
          disabled={enviando || titulo.trim().length < 3}
        >
          {enviando ? (
            <span className="task-form__spinner" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>
      {erro && <p className="task-form__error">{erro}</p>}
    </form>
  );
}
