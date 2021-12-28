from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from backend.modelos.provincias_modelos import ProvinciasBd, ProvinciaSinId

class ProvinciasRepositorio():
    def get_all(self, session: Session):
        return session.execute(select(ProvinciasBd)).scalars().all()

    def provincia_por_id(self, id:int, session:Session):
        return session.execute(select(ProvinciasBd).where(ProvinciasBd.id == id)).scalar()

    def provincias_por_nombre(self, nombre:str, session:Session):
        return session.execute(select(ProvinciasBd).where(column('nombre').ilike(f'{nombre}%'))).scalars().all()

    def agregar(self, datos: ProvinciaSinId, session:Session):
        instancia_bd = ProvinciasBd(nombre= datos.nombre, descripcion= datos.descripcion, id_pais= datos.id_pais)
        session.add(instancia_bd)
        session.commit()
        return instancia_bd

    def borrar(self, id: int, session:Session):
        instancia_bd = session.get(ProvinciasBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Provincia no encontrado')
        try:
            session.delete(instancia_bd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar el provincia.')
        
    def actualizar(self, id:int, datos:ProvinciaSinId, session:Session):
        instancia_bd = session.get(ProvinciasBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Provincia no encontrado')
        
        try:
            instancia_bd.nombre = datos.nombre
            instancia_bd.descripcion = datos.descripcion
            instancia_bd.id_pais = datos.id_pais
            session.commit()

            return instancia_bd
        except:
            raise HTTPException(status_code=400, detail='No se puede modificar el provincia.')
