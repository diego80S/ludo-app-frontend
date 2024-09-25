import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsuarios();
    }, []);


    const fetchUsuarios = () => {
        fetch("http://localhost:8000/api/v1/usuarios", {
            method: "GET",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                setUsuarios(json);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleEliminar = (id) => {
        fetch(`http://localhost:8000/api/v1/usuarios/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log(json);
                setMessage(json.message)
                fetchUsuarios();
            })
            .catch(error => console.error('Error fetching data:', error));


    }

    const handleUser = (id) => {
        navigate(`/listaUsuarios/${id}`)

        console.log(`aqui estamos con el id: ${id}`)
    }


    return <div>
        {message}
        <ul>
            {usuarios.map(usuario => (
                <div key={usuario.id} >
                    <li >{usuario.id}</li>
                    <li onClick={() => handleUser(usuario.id)}>{usuario.nombre}</li>
                    <li>{usuario.email}</li>
                    <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>

                    <hr />
                </div>
            ))}
        </ul>

    </div>
}