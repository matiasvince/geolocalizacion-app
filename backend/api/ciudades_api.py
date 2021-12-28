from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.repositorios.ciudades_repo import CiudadesRepositorio
from backend.modelos.ciudades_modelos import CiudadSinId, CiudadesApi
from db import get_session
from typing import List

ciudades_router = APIRouter(prefix='/ciudades', tags=['Ciudades'])
repo = CiudadesRepositorio()

@ciudades_router.get('/', response_model=List[CiudadesApi])
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)

@ciudades_router.get('/{id}')
def get_by_id(id: int, s:Session = Depends(get_session)):
    cat = repo.ciudad_por_id(id, s)
    if cat is None:
        raise HTTPException(status_code=404, detail='Ciudad no encontrado')
    return cat

@ciudades_router.get('/buscar/{nombre}')
def get_by_nombre(nombre:str, s:Session = Depends(get_session)):
    return repo.ciudades_por_nombre(nombre, s)

@ciudades_router.post('/', response_model=CiudadesApi)
def agregar(datos: CiudadSinId, s:Session = Depends(get_session)):
    ciudad = repo.agregar(datos, s)
    return ciudad

@ciudades_router.delete('/{id}')
def borrar(id: int, s:Session = Depends(get_session)):
    repo.borrar(id, s)
    return "Se eliminó correctamente"

@ciudades_router.put('/{id}', response_model=CiudadesApi)
def actualizar(id:int, datos:CiudadSinId, s:Session = Depends(get_session)):
    ciudad = repo.actualizar(id, datos, s)
    return ciudad