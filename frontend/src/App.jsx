import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTarefas } from "./hooks/useTarefas";

function App() {
  const {
    tarefas,
    loading,
    error,
    criar,
    atualizar,
    toggleConcluida,
    remover,
    totalConcluidas,
    totalPendentes,
  } = useTarefas();

  return (
    <div className="app">
      <Header
        total={tarefas.length}
        concluidas={totalConcluidas}
        pendentes={totalPendentes}
      />

      <TaskForm onCriar={criar} />

      {error && (
        <div className="app__error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <TaskList
        tarefas={tarefas}
        loading={loading}
        onToggle={toggleConcluida}
        onAtualizar={atualizar}
        onRemover={remover}
      />
    </div>
  );
}

export default App;
