from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, SessionLocal
from models import Tarefa

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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
