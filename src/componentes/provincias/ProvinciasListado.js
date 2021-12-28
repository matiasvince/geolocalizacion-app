import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const ProvinciasListado = () => {

    const [provincias, setProvincias] = useState([]);
    const nombreInputRef = useRef();

    const history = useHistory();

    useEffect(() => {
        obtenerProvincias();
    }, []);

    const eliminarProvincia = (index) => {
        axios.delete(`http://localhost:8000/provincias/${index}`)
            .then(() => {
                alert('La provincia se elimino');
                obtenerProvincias();
            })
            .catch(() => alert('Hubo un error al eliminar la provincia. Posiblemente haya una ciudad referenciada'));
    }

    const obtenerProvincias = () => {
        axios.get('http://localhost:8000/provincias')
            .then((response) => {
                setProvincias(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const buscarProvincias = () => {
        var nombre = nombreInputRef.current.value;
        axios.get(`http://127.0.0.1:8000/provincias/buscar/${nombre}`)
            .then((response) => {
                setProvincias(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="d-flex bd-highlight mt-3">
                <h1 className="p-2 w-100 bd-highlight ms-4">PROVINCIAS</h1>
                <input ref={nombreInputRef} className="align-self-center form-control w-25 me-2" type="text" placeholder='Buscar por nombre'
                    aria-describedby="inputGroup-sizing-default"/>
                <button type="button" className="align-self-center btn btn-success me-1" onClick={() => buscarProvincias()}>Buscar</button>
                <button type="button" className="align-self-center btn btn-danger me-4" onClick={() => obtenerProvincias()}>X</button>
            </div>
            <div className="container">
                <div className="justify-center mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">ID Pais</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {provincias.map((provincia) => {
                                    return <>
                                        <tr style={{ listStyle: 'none' }}>
                                            <th>{provincia.id}</th>
                                            <td>{provincia.nombre}</td>
                                            <td>{provincia.descripcion}</td>
                                            <td>{provincia.id_pais}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning" onClick={() => eliminarProvincia(provincia.id)}>Eliminar</button>
                                                <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => history.push(`/provincias/${provincia.id}`)}>Editar</button>
                                            </td>
                                        </tr>
                                    </>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div></div>
        </>
    );
}


export default ProvinciasListado;