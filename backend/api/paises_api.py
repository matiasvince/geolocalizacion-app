from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.repositorios.paises_repo import PaisesRepositorio
from backend.modelos.paises_modelos import PaisSinId, PaisesApi
from db import get_session
from typing import List

paises_router = APIRouter(prefix='/paises', tags=['Paises'])
repo = PaisesRepositorio()

@paises_router.get('/', response_model=List[PaisesApi])
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)

@paises_router.get('/{id}')
def get_by_id(id: int, s:Session = Depends(get_session)):
    cat = repo.pais_por_id(id, s)
    if cat is None:
        raise HTTPException(status_code=404, detail='Pais no encontrado')
    return cat

@paises_router.get('/buscar/{nombre}')
def get_by_nombre(nombre:str, s:Session = Depends(get_session)):
    return repo.paises_por_nombre(nombre, s)

@paises_router.post('/', response_model=PaisesApi)
def agregar(datos: PaisSinId, s:Session = Depends(get_session)):
    pais = repo.agregar(datos, s)
    return pais

@paises_router.delete('/{id}')
def borrar(id: int, s:Session = Depends(get_session)):
    repo.borrar(id, s)
    return "Se eliminó correctamente"

@paises_router.put('/{id}', response_model=PaisesApi)
def actualizar(id:int, datos:PaisSinId, s:Session = Depends(get_session)):
    pais = repo.actualizar(id, datos, s)
    return pais