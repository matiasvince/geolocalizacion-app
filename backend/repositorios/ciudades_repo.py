from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from backend.modelos.ciudades_modelos import CiudadesBd, CiudadSinId

class CiudadesRepositorio():
    def get_all(self, session: Session):
        return session.execute(select(CiudadesBd)).scalars().all()

    def ciudad_por_id(self, id:int, session:Session):
        return session.execute(select(CiudadesBd).where(CiudadesBd.id == id)).scalar()

    def ciudades_por_nombre(self, nombre:str, session:Session):
        return session.execute(select(CiudadesBd).where(column('nombre').ilike(f'{nombre}%'))).scalars().all()

    def agregar(self, datos: CiudadSinId, session:Session):
        instancia_bd = CiudadesBd(nombre= datos.nombre, descripcion= datos.descripcion, id_provincia= datos.id_provincia, id_pais= datos.id_pais)
        session.add(instancia_bd)
        session.commit()
        return instancia_bd

    def borrar(self, id: int, session:Session):
        instancia_bd = session.get(CiudadesBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Ciudad no encontrado')
        try:
            session.delete(instancia_bd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar el ciudad.')
        
    def actualizar(self, id:int, datos:CiudadSinId, session:Session):
        instancia_bd = session.get(CiudadesBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Ciudad no encontrado')
        
        try:
            instancia_bd.nombre = datos.nombre
            instancia_bd.descripcion = datos.descripcion
            instancia_bd.id_provincia = datos.id_provincia
            instancia_bd.id_pais = datos.id_pais
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede modificar el ciudad.')
