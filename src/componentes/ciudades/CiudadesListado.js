import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const CiudadesListado = () => {

    const [ciudades, setCiudades] = useState([]);
    const nombreInputRef = useRef();

    const history = useHistory();

    useEffect(() => {
        obtenerCiudades();
    }, []);

    const eliminarCiudad = (index) => {
        axios.delete(`http://localhost:8000/ciudades/${index}`)
            .then(() => {
                alert('La ciudad se elimino');
                obtenerCiudades();
            })
            .catch(() => alert('Hubo un error al eliminar la ciudad.'));
    }

    const obtenerCiudades = () => {
        axios.get('http://localhost:8000/ciudades')
            .then((response) => {
                setCiudades(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const buscarCiudades = () => {
        var nombre = nombreInputRef.current.value;
        axios.get(`http://127.0.0.1:8000/ciudades/buscar/${nombre}`)
            .then((response) => {
                setCiudades(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="d-flex bd-highlight mt-3">
                <h1 className="p-2 w-100 bd-highlight ms-4">CIUDADES</h1>
                <input ref={nombreInputRef} className="align-self-center form-control w-25 me-2" type="text" placeholder='Buscar por nombre'
                    aria-describedby="inputGroup-sizing-default" />
                <button type="button" className="align-self-center btn btn-success me-1" onClick={() => buscarCiudades()}>Buscar</button>
                <button type="button" className="align-self-center btn btn-danger me-4" onClick={() => obtenerCiudades()}>X</button>
            </div>
            <div className="container">
                <div className="justify-center mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">ID provincia</th>
                                <th scope="col">ID Pais</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ciudades.map((ciudad) => {
                                return <>
                                    <tr style={{ listStyle: 'none' }}>
                                        <th>{ciudad.id}</th>
                                        <td>{ciudad.nombre}</td>
                                        <td>{ciudad.descripcion}</td>
                                        <td>{ciudad.id_provincia}</td>
                                        <td>{ciudad.id_pais}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={() => history.push(`/ciudades/${ciudad.id}`)}>Editar</button>
                                            <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => eliminarCiudad(ciudad.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                </>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default CiudadesListado;