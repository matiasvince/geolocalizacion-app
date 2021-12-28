import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const PaisesFormulario = () => {
    const idInputRef = useRef();
    const nombreInputRef = useRef();
    const cantidad_habitantesInputRef = useRef();

    const history = useHistory();
    const { idPais } = useParams();

    useEffect(() => {
        if (idPais) {
            axios.get(`http://127.0.0.1:8000/paises/${idPais}`)
                .then((response) => {
                    const pais = response.data;

                    // idInputRef.current.value = pais.id;
                    nombreInputRef.current.value = pais.nombre;
                    cantidad_habitantesInputRef.current.value = pais.cantidad_habitantes;
                })
        }
    }, [idPais]);


    const nuevo = () => {
        return {
            nombre: nombreInputRef.current.value,
            cantidad_habitantes: cantidad_habitantesInputRef.current.value
        }
    }

    const edit = () => {
        return {
            id: idPais,
            nombre: nombreInputRef.current.value,
            cantidad_habitantes: cantidad_habitantesInputRef.current.value
        }
    }

    const agregarPais = () => {
        console.log('entro')
        const pais = nuevo();
        axios.post('http://localhost:8000/paises/', pais)
            .then(() => {
                console.log('aca')
                alert("Se agrego correctamente");
                history.push('/paises/');
            })
            .catch(() => alert("Hubo un error al agregar el pais."));
    }

    const editarPais = () => {
        const pais = edit();
        axios.put(`http://localhost:8000/paises/${pais.id}`, pais)
            .then(() => {
                alert('Se edito correctamente');
                history.push('/paises/')
            })
            .catch(() => alert('Hubo un error al editar el pais'));
    }

    return (
        <>
            <div className="container">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-auto bg-light pt-4 pb-5 ps-5 pe-5">
                    <h1 className="text-center mb-4">PAIS</h1>
                        {/* <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">ID</span>
                            <input ref={idInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div> */}
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            <input ref={nombreInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Cantidad de habitantes</span>
                            <input ref={cantidad_habitantesInputRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <button className="btn btn-success w-100 mt-4" onClick={idPais != null ? editarPais : agregarPais}>
                            {idPais != null ? 'Editar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaisesFormulario;