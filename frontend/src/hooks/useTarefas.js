import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

export function useTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTarefas();
      setTarefas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const criar = async (titulo) => {
    const nova = await api.criarTarefa(titulo);
    setTarefas((prev) => [...prev, nova]);
  };

  const atualizar = async (id, dados) => {
    const atualizada = await api.atualizarTarefa(id, dados);
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? atualizada : t))
    );
  };

  const toggleConcluida = async (tarefa) => {
    await atualizar(tarefa.id, {
      titulo: tarefa.titulo,
      concluida: !tarefa.concluida,
    });
  };

  const remover = async (id) => {
    await api.removerTarefa(id);
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  const totalConcluidas = tarefas.filter((t) => t.concluida).length;
  const totalPendentes = tarefas.filter((t) => !t.concluida).length;

  return {
    tarefas,
    loading,
    error,
    criar,
    atualizar,
    toggleConcluida,
    remover,
    totalConcluidas,
    totalPendentes,
  };
}
