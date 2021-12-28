import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import PaisesListado from "./componentes/paises/PaisesListado";
import PaisesFormulario from "./componentes/paises/PaisesFormulario";
import ProvinciasListado from "./componentes/provincias/ProvinciasListado";
import ProvinciasFormulario from "./componentes/provincias/ProvinciasFormulario";
import CiudadesListado from "./componentes/ciudades/CiudadesListado";
import CiudadesFormulario from "./componentes/ciudades/CiudadesFormulario";

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">APP-GEOLOCALIZACION</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Paises</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to='/paises' className="dropdown-item">Listado de paises</Link></li>
                                    <li><Link to='/paises/nuevo' className="dropdown-item">Crear pais</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Provincias</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to='/provincias' className="dropdown-item">Listado de provincias</Link></li>
                                    <li><Link to='/provincias/nuevo' className="dropdown-item">Crear provincia</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Ciudades</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to='/ciudades' className="dropdown-item">Listado de ciudades</Link></li>
                                    <li><Link to='/ciudades/nuevo' className="dropdown-item">Crear ciudad</Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>

            </nav>

            <Switch>
                <Route path='/paises' exact component={PaisesListado} />
                <Route path='/paises/nuevo' component={PaisesFormulario} />
                <Route path='/paises/:idPais' component={PaisesFormulario} />

                <Route path='/provincias' exact component={ProvinciasListado} />
                <Route path='/provincias/nuevo' component={ProvinciasFormulario} />
                <Route path='/provincias/:idProvincia' component={ProvinciasFormulario} />

                <Route path='/ciudades' exact component={CiudadesListado} />
                <Route path='/ciudades/nuevo' component={CiudadesFormulario} />
                <Route path='/ciudades/:idCiudades' component={CiudadesFormulario} />

                <Route path='/'>
                    <Redirect to='/paises' />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterComponent;