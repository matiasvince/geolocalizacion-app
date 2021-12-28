from pydantic import BaseModel
from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey

class CiudadesBd(Base):
    __tablename__ = 'ciudades'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(120), nullable=False)
    descripcion = Column(String(300))
    id_provincia = Column(ForeignKey('provincias.id'))
    id_pais = Column(ForeignKey('paises.id'))

class CiudadSinId(BaseModel):
    nombre: str
    descripcion: str
    id_provincia: int
    id_pais: int
    
    class Config:
        orm_mode = True

class CiudadesApi(CiudadSinId):
    id: int