import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const CiudadesFormulario = () => {
    const idInputRef = useRef();
    const nombreInputRef = useRef();
    const descripcionInputRef = useRef();
    const id_provinciaInputRef = useRef();
    const id_paisInputRef = useRef();

    const history = useHistory();
    const { idCiudades } = useParams();

    useEffect(() => {
        if (idCiudades) {
            axios.get(`http://localhost:8000/ciudades/${idCiudades}`)
                .then((response) => {
                    const ciudad = response.data;

                    // idInputRef.current.value = ciudad.id;
                    nombreInputRef.current.value = ciudad.nombre;
                    descripcionInputRef.current.value = ciudad.descripcion;
                    id_provinciaInputRef.current.value = ciudad.id_provincia;
                    id_paisInputRef.current.value = ciudad.id_pais;
                })
        }
    }, [idCiudades]);


    const nuevo = () => {
        return {
            // id: idInputRef.current.value,
            nombre: nombreInputRef.current.value,
            descripcion: descripcionInputRef.current.value,
            id_provincia: id_provinciaInputRef.current.value,
            id_pais: id_paisInputRef.current.value,
        }
    }

    
    const edit = () => {
        return {
            id: idCiudades,
            nombre: nombreInputRef.current.value,
            descripcion: descripcionInputRef.current.value,
            id_provincia: id_provinciaInputRef.current.value,
            id_pais: id_paisInputRef.current.value,
        }
    }

    const agregarCiudad = () => {
        const ciudad = nuevo();
        axios.post('http://localhost:8000/ciudades/', ciudad)
            .then(() => {
                alert("Se agrego correctamente");
                history.push('/ciudades');
            })
            .catch(() => alert("Hubo un error al agregar la ciudad."));
    }

    const editarCiudad = () => {
        const ciudad = edit();
        axios.put(`http://localhost:8000/ciudades/${ciudad.id}`, ciudad)
            .then(() => {
                alert('Se edito correctamente');
                history.push('/ciudades')
            })
            .catch(() => alert('Hubo un error al editar la ciudad.'));
    }

    return (
        <>
            <div className="container">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-auto bg-light pt-4 pb-5 ps-5 pe-5">
                        <h1 className="text-center mb-4">CIUDAD</h1>
                        {/* <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
                            <input ref={idInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div> */}
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            <input ref={nombreInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Descripción</span>
                            <input ref={descripcionInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID Provincia</span>
                            <input ref={id_provinciaInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID País</span>
                            <input ref={id_paisInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <button className="btn btn-success w-100 mt-4" onClick={idCiudades != null ? editarCiudad : agregarCiudad}>
                            {idCiudades != null ? 'Editar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CiudadesFormulario;