from pydantic import BaseModel
from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey

class ProvinciasBd(Base):
    __tablename__ = 'provincias'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(120), nullable=False)
    descripcion = Column(String(300))
    id_pais = Column(ForeignKey('paises.id'))

class ProvinciaSinId(BaseModel):
    nombre: str
    descripcion: str
    id_pais: int
    
    class Config:
        orm_mode = True

class ProvinciasApi(ProvinciaSinId):
    id: int