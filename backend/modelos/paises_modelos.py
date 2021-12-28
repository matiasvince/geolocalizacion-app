from pydantic import BaseModel
from db import Base
from sqlalchemy import Column, Integer, String

class PaisesBd(Base):
    __tablename__ = 'paises'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(120), nullable=False)
    cantidad_habitantes = Column(Integer)

class PaisSinId(BaseModel):
    nombre: str
    cantidad_habitantes: int
    
    class Config:
        orm_mode = True

class PaisesApi(PaisSinId):
    id: int