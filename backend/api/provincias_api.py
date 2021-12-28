from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.repositorios.provincias_repo import ProvinciasRepositorio
from backend.modelos.provincias_modelos import ProvinciaSinId, ProvinciasApi
from db import get_session
from typing import List

provincias_router = APIRouter(prefix='/provincias', tags=['Provincias'])
repo = ProvinciasRepositorio()

@provincias_router.get('/', response_model=List[ProvinciasApi])
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)

@provincias_router.get('/{id}')
def get_by_id(id: int, s:Session = Depends(get_session)):
    cat = repo.provincia_por_id(id, s)
    if cat is None:
        raise HTTPException(status_code=404, detail='Provincia no encontrado')
    return cat

@provincias_router.get('/buscar/{nombre}')
def get_by_nombre(nombre:str, s:Session = Depends(get_session)):
    return repo.provincias_por_nombre(nombre, s)

@provincias_router.post('/', response_model=ProvinciasApi)
def agregar(datos: ProvinciaSinId, s:Session = Depends(get_session)):
    provincia = repo.agregar(datos, s)
    return provincia

@provincias_router.delete('/{id}')
def borrar(id: int, s:Session = Depends(get_session)):
    repo.borrar(id, s)
    return "Se eliminó correctamente"

@provincias_router.put('/{id}', response_model=ProvinciasApi)
def actualizar(id:int, datos:ProvinciaSinId, s:Session = Depends(get_session)):
    return repo.actualizar(id, datos, s)