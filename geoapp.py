from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from backend.api.paises_api import paises_router
from backend.api.provincias_api import provincias_router
from backend.api.ciudades_api import ciudades_router
import db
# from backend.modelos.paises_modelos import PaisesBd
# from backend.modelos.provincias_modelos import ProvinciasBd
# from backend.modelos.ciudades_modelos import CiudadesBd

app = FastAPI()
app.include_router(paises_router)
app.include_router(provincias_router)
app.include_router(ciudades_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# db.drop_all()
db.create_all()


if __name__ == '__main__':
    uvicorn.run("geoapp:app", reload=True)