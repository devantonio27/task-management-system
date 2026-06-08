from pydantic import BaseModel, Field


class TarefaCreate(BaseModel):
    titulo: str = Field(
        min_length=3,
        max_length=100
    )


class TarefaUpdate(BaseModel):
    titulo: str = Field(
        min_length=3,
        max_length=100
    )
    concluida: bool

class TarefaResponse(BaseModel):
    id: int
    titulo: str
    concluida: bool

    class Config:
        from_attributes = True