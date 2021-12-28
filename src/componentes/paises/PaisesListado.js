import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const PaisesListado = () => {

    const [paises, setPaises] = useState([]);
    const nombreInputRef = useRef();

    const history = useHistory();

    useEffect(() => {
        obtenerPaises();
    }, []);

    const eliminarPais = (index) => {
        axios.delete(`http://localhost:8000/paises/${index}`)
            .then(() => {
                alert('El pais se elimino');
                obtenerPaises();
            })
            .catch(() => alert('Hubo un error al eliminar el pais. Posiblemente haya una provincia o una ciudad referenciada'));
    }

    const obtenerPaises = () => {
        axios.get('http://127.0.0.1:8000/paises/')
            .then((response) => {
                setPaises(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const buscarPaises = () => {
        var nombre = nombreInputRef.current.value;
        axios.get(`http://127.0.0.1:8000/paises/buscar/${nombre}`)
            .then((response) => {
                setPaises(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="d-flex bd-highlight mt-3">
                <h1 className="p-2 w-100 bd-highlight ms-4">PAISES</h1>
                <input ref={nombreInputRef} className="align-self-center form-control w-25 me-2" type="text" placeholder='Buscar por nombre'
                    aria-describedby="inputGroup-sizing-default"/>
                <button type="button" className="align-self-center btn btn-success me-1" onClick={() => buscarPaises()}>Buscar</button>
                <button type="button" className="align-self-center btn btn-danger me-4" onClick={() => obtenerPaises()}>X</button>
            </div>

            <div className="container">
                <div className="justify-center mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cantidad de habitantes</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paises.map((pais) => {
                                return <>
                                    <tr style={{ listStyle: 'none' }}>
                                        <th>{pais.id}</th>
                                        <td>{pais.nombre}</td>
                                        <td>{pais.cantidad_habitantes}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning" onClick={() => eliminarPais(pais.id)}>Eliminar</button>
                                            <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => history.push(`/paises/${pais.id}`)}>Editar</button>
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


export default PaisesListado;