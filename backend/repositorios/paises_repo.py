from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from backend.modelos.paises_modelos import PaisesBd, PaisSinId

class PaisesRepositorio():
    def get_all(self, session: Session):
        return session.execute(select(PaisesBd)).scalars().all()

    def pais_por_id(self, id:int, session:Session):
        return session.execute(select(PaisesBd).where(PaisesBd.id == id)).scalar()

    def paises_por_nombre(self, nombre:str, session:Session):
        return session.execute(select(PaisesBd).where(column('nombre').ilike(f'{nombre}%'))).scalars().all()

    def agregar(self, datos: PaisSinId, session:Session):
        instancia_bd = PaisesBd(nombre= datos.nombre, cantidad_habitantes= datos.cantidad_habitantes)
        session.add(instancia_bd)
        session.commit()
        return instancia_bd

    def borrar(self, id: int, session:Session):
        instancia_bd = session.get(PaisesBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Pais no encontrado')
        try:
            session.delete(instancia_bd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar el pais. Posiblemente esté referenciada por otro registro')
        
    def actualizar(self, id:int, datos:PaisSinId, session:Session):
        instancia_bd = session.get(PaisesBd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Pais no encontrado')
        
        try:
            instancia_bd.nombre = datos.nombre
            instancia_bd.cantidad_habitantes = datos.cantidad_habitantes
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede modificar el pais.')
