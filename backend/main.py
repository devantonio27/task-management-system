from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from dotenv import load_dotenv
import os

import models
import schemas
from database import engine, SessionLocal
from models import Tarefa

load_dotenv()

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"mensagem": "API funcionando!"}

@app.post("/tarefas", response_model=schemas.TarefaResponse)
def criar_tarefa(
    tarefa: schemas.TarefaCreate,
    db: Session = Depends(get_db)
):
    nova_tarefa = Tarefa(
        titulo=tarefa.titulo,
        concluida=False
    )

    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return nova_tarefa

@app.get(
    "/tarefas",
    response_model=list[schemas.TarefaResponse]
)
def listar_tarefas(
    db: Session = Depends(get_db)
):
    return db.query(Tarefa).all()

@app.put(
    "/tarefas/{tarefa_id}",
    response_model=schemas.TarefaResponse
)
def atualizar_tarefa(
    tarefa_id: int,
    dados: schemas.TarefaUpdate,
    db: Session = Depends(get_db)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == tarefa_id
    ).first()

    if not tarefa:
        raise HTTPException(
        status_code=404,
        detail="Tarefa não encontrada"
    )

    tarefa.titulo = dados.titulo
    tarefa.concluida = dados.concluida

    db.commit()
    db.refresh(tarefa)

    return tarefa 

@app.delete("/tarefas/{tarefa_id}")
def remover_tarefa(
    tarefa_id: int,
    db: Session = Depends(get_db)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == tarefa_id
    ).first()

    if not tarefa:
        raise HTTPException(
            status_code=404,
            detail="Tarefa não encontrada"
        )

    db.delete(tarefa)
    db.commit()

    return {"mensagem": "Tarefa removida"}