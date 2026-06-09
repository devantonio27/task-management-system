const BASE_URL = import.meta.env.VITE_API_URL;

export async function getTarefas() {
  const res = await fetch(`${BASE_URL}/tarefas`);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}

export async function criarTarefa(titulo) {
  const res = await fetch(`${BASE_URL}/tarefas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail?.[0]?.msg || "Erro ao criar tarefa");
  }
  return res.json();
}

export async function atualizarTarefa(id, dados) {
  const res = await fetch(`${BASE_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail || "Erro ao atualizar tarefa");
  }
  return res.json();
}

export async function removerTarefa(id) {
  const res = await fetch(`${BASE_URL}/tarefas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao remover tarefa");
  return res.json();
}
