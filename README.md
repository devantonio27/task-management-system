# ✅ Tarefas — Gerenciador de Tarefas Full Stack

<div align="center">

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Um gerenciador de tarefas moderno e elegante, construído com FastAPI e React.**

</div>

---

## 📋 Sobre o Projeto

**Tarefas** é uma aplicação Full Stack para gerenciamento de tarefas (to-do list) com uma interface dark mode premium e uma API REST robusta. O projeto foi desenvolvido com foco em simplicidade, performance e uma experiência visual de alta qualidade.

### ✨ Funcionalidades

- ➕ **Criar tarefas** com validação (3–100 caracteres)
- ✏️ **Editar título** inline com double-click
- ✅ **Marcar como concluída** com checkbox animado
- 🗑️ **Remover tarefas** com animação de saída
- 📊 **Contadores em tempo real** (total, feitas, pendentes)
- 📈 **Barra de progresso** animada
- 🌙 **Dark mode** com design glassmorphism
- 📱 **Layout responsivo** (mobile-first)
- ⚡ **Micro-animações** em todas as interações

---

## 🏗️ Arquitetura

```
todo-app/
├── backend/          ← API REST (FastAPI + SQLAlchemy + SQLite)
├── frontend/         ← Interface (React + Vite + Vanilla CSS)
└── README.md
```

### Fluxo de Dados

```
Usuário → Componente React → useTarefas Hook → api.js Service → FastAPI Backend → SQLite
```

O frontend se comunica com o backend via requisições HTTP (fetch API). O estado é gerenciado localmente com React Hooks, sem dependências externas de gerenciamento de estado.

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Python** | 3.x | Linguagem principal |
| **FastAPI** | — | Framework web assíncrono |
| **SQLAlchemy** | — | ORM para banco de dados |
| **SQLite** | — | Banco de dados local |
| **Pydantic** | — | Validação de dados |
| **Uvicorn** | — | Servidor ASGI |

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 19.x | Biblioteca de UI |
| **Vite** | 8.x | Build tool e dev server |
| **Vanilla CSS** | — | Estilização com variáveis CSS |
| **Google Fonts (Inter)** | — | Tipografia moderna |

---

## 🚀 Como Executar

### Pré-requisitos

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 2. Configurar o Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\Activate.ps1
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install fastapi sqlalchemy uvicorn

# Iniciar o servidor (porta 8000)
uvicorn main:app --reload
```

O backend estará disponível em: **http://localhost:8000**

### 3. Configurar o Frontend

```bash
# Em outro terminal, a partir da raiz do projeto
cd frontend

# Instalar dependências
npm install

# Iniciar o dev server (porta 5173)
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

---

## 📡 API REST — Endpoints

A API roda em `http://localhost:8000` e possui documentação interativa em:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Rotas Disponíveis

| Método | Endpoint | Descrição | Corpo da Requisição |
|--------|----------|-----------|---------------------|
| `GET` | `/` | Health check | — |
| `GET` | `/tarefas` | Listar todas as tarefas | — |
| `POST` | `/tarefas` | Criar nova tarefa | `{ "titulo": "string" }` |
| `PUT` | `/tarefas/{id}` | Atualizar tarefa | `{ "titulo": "string", "concluida": bool }` |
| `DELETE` | `/tarefas/{id}` | Remover tarefa | — |

### Exemplos com cURL

```bash
# Listar tarefas
curl http://localhost:8000/tarefas

# Criar tarefa
curl -X POST http://localhost:8000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar React"}'

# Marcar como concluída
curl -X PUT http://localhost:8000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar React", "concluida": true}'

# Remover tarefa
curl -X DELETE http://localhost:8000/tarefas/1
```

### Modelo de Dados — Tarefa

```json
{
  "id": 1,
  "titulo": "Estudar React",
  "concluida": false
}
```

| Campo | Tipo | Regras |
|-------|------|--------|
| `id` | `integer` | Auto-incremento, chave primária |
| `titulo` | `string` | Obrigatório, 3–100 caracteres |
| `concluida` | `boolean` | Padrão: `false` |

---

## 📁 Estrutura do Projeto

### Backend

```
backend/
├── main.py          # Endpoints da API + CORS
├── models.py        # Modelo SQLAlchemy (Tarefa)
├── schemas.py       # Schemas Pydantic (validação)
├── database.py      # Configuração do banco (SQLite)
├── tarefas.db       # Banco de dados SQLite (gerado automaticamente)
└── venv/            # Ambiente virtual Python
```

### Frontend

```
frontend/
├── index.html                # HTML principal com SEO
├── package.json              # Dependências e scripts
├── vite.config.js            # Configuração do Vite
├── public/
│   └── favicon.svg           # Ícone personalizado
└── src/
    ├── main.jsx              # Entry point (ReactDOM)
    ├── App.jsx               # Componente raiz
    ├── App.css               # Design system (tokens, reset, tema)
    ├── services/
    │   └── api.js            # Camada de abstração da API
    ├── hooks/
    │   └── useTarefas.js     # Custom hook (estado + CRUD)
    └── components/
        ├── Header.jsx        # Título, contadores, barra de progresso
        ├── Header.css
        ├── TaskForm.jsx      # Input de criação com validação
        ├── TaskForm.css
        ├── TaskList.jsx      # Container da lista + loading state
        ├── TaskList.css
        ├── TaskItem.jsx      # Card da tarefa (toggle, edit, delete)
        ├── TaskItem.css
        ├── EmptyState.jsx    # Estado vazio com ilustração
        └── EmptyState.css
```

---

## 🎨 Design

O frontend utiliza um design **dark mode premium** com:

- **Paleta de cores**: tons de violeta/índigo sobre fundo escuro
- **Glassmorphism**: cards com `backdrop-filter: blur` e bordas translúcidas
- **Micro-animações**:
  - `slideIn` / `slideOut` ao criar/remover tarefas
  - `checkPop` ao marcar checkbox
  - `float` na ilustração do estado vazio
  - `loadBounce` nos dots de carregamento
- **Tipografia**: fonte Inter (Google Fonts) com pesos variados
- **Responsivo**: breakpoint em 600px para adaptação mobile

### Variáveis CSS Principais

```css
--bg: #0f0f1a;
--accent: #6366f1;
--accent-light: #818cf8;
--success: #34d399;
--warning: #fbbf24;
--danger: #ef4444;
--glass: rgba(255, 255, 255, 0.04);
```

---

## 🧩 Arquitetura Frontend

### Camada de Serviço (`services/api.js`)

Centraliza todas as chamadas HTTP. Se a URL base mudar, só é necessário alterar um arquivo.

### Custom Hook (`hooks/useTarefas.js`)

Encapsula toda a lógica de estado e operações CRUD:
- **Estado**: `tarefas`, `loading`, `error`
- **Ações**: `criar()`, `atualizar()`, `toggleConcluida()`, `remover()`
- **Derivados**: `totalConcluidas`, `totalPendentes`

### Componentes

Cada componente é responsável apenas pela sua **apresentação**. A lógica de negócio fica no hook, garantindo desacoplamento e facilidade de manutenção.

---

## 📝 Licença

Este projeto é de uso livre para fins educacionais e pessoais.

---

<div align="center">

Feito com 💜 usando **FastAPI** + **React**

</div>
