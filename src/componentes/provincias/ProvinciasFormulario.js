import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const ProvinciasFormulario = () => {
    // const idInputRef = useRef();
    const nombreInputRef = useRef();
    const descripcionInputRef = useRef();
    const id_paisInputRef = useRef();

    const history = useHistory();
    const { idProvincia } = useParams();

    useEffect(() => {
        if (idProvincia) {
            axios.get(`http://localhost:8000/provincias/${idProvincia}`)
                .then((response) => {
                    const provincia = response.data;

                    // idInputRef.current.value = provincia.id;
                    nombreInputRef.current.value = provincia.nombre;
                    descripcionInputRef.current.value = provincia.descripcion;
                    id_paisInputRef.current.value = provincia.id_pais;
                })
        }
    }, [idProvincia]);


    const nuevo = () => {
        return {
            // id: idInputRef.current.value,
            nombre: nombreInputRef.current.value,
            descripcion: descripcionInputRef.current.value,
            id_pais: id_paisInputRef.current.value
        }
    }

    const edit = () => {
        return {
            id: idProvincia,
            nombre: nombreInputRef.current.value,
            descripcion: descripcionInputRef.current.value,
            id_pais: id_paisInputRef.current.value
        }
    }

    const agregarProvincia = () => {
        const provincia = nuevo();
        axios.post('http://localhost:8000/provincias/', provincia)
            .then(() => {
                alert("Se agrego correctamente");
                history.push('/provincias');
            })
            .catch(() => alert("Hubo un error al agregar la provincia. Posiblemente no exista el id del pais"));
    }

    const editarProvincia = () => {
        const provincia = edit();
        axios.put(`http://localhost:8000/provincias/${provincia.id}`, provincia)
            .then(() => {
                alert('Se edito correctamente');
                history.push('/provincias')
            })
            .catch(() => alert('Hubo un error al editar la provincia'));
    }

    return (
        <>
            <div className="container">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-auto bg-light pt-4 pb-5 ps-5 pe-5">
                    <h1 className="text-center mb-4">PROVINCIA</h1>
                        {/* <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
                            <input ref={idInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /><br />
                        </div> */}
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            <input ref={nombreInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /><br />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Descripción</span>
                            <input ref={descripcionInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /><br />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID País</span>
                            <input ref={id_paisInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" /><br />
                        </div>
                        <button className="btn btn-success w-100 mt-4" onClick={idProvincia != null ? editarProvincia : agregarProvincia}>
                            {idProvincia != null ? 'Editar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProvinciasFormulario;