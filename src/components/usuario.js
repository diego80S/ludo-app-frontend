import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export const Usuario = () => {
    const { id } = useParams(); // Captura el ID de la URL
    const [usuario, setUsuario] = useState(null);
    const [button, setButton] = useState(false);
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("")


    useEffect(() => {
        fetchUsuario();
    }, [id]); // Ejecuta el efecto cada vez que cambie el 'id'




    const fetchUsuario = () => {
        fetch(`http://localhost:8000/api/v1/usuarios/${id}`)
            .then(response => response.json())
            .then(data => {
                setUsuario(data);
                setNombre(data.nombre); // Inicializa el nombre con el existente
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    if (!usuario) {
        return <div>Cargando usuario...</div>;
    }

    const handleButton = () => {
        setButton(prevButton => !prevButton); // Alternar el estado del botón
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoUsuario = {
            usuario: {
                nombre
            },
        };

        try {
            const response = await fetch(`http://localhost:8000/api/v1/usuarios/${id}`, {
                method: 'PUT', // Cambia a PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });

            if (response.ok) {
                // Redirigir a /listaUsuarios tras la actualización exitosa
                const data = await response.json();
                setMessage(data.message)
                fetchUsuario()
                setButton(false)
            } else {
                const data = await response.json();
                setError(data.message || 'Error al actualizar usuario');
            }
        } catch (err) {
            setError('Error en la conexión con el servidor');
        }
    };

    const handleCloseMessage = () => {
        setMessage(""); // Oculta el aviso
        console.log(message)
    };

    return (
        <div>

            {message && (
                <div>
                    <p>{message}</p>
                    <button onClick={handleCloseMessage}>Cerrar aviso</button> {/* Botón para cerrar el aviso */}
                </div>
            )}

            <h2>Detalles del Usuario</h2>
            <p>ID: {usuario.id}</p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
            <button onClick={handleButton}>{button ? 'Cancelar' : 'Editar Información'}</button>

            {button && ( // Mostrar el formulario solo si button es verdadero
                <div>
                    <h2>Actualizar Información</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                          
                        </div>
                        <button type="submit" >Actualizar</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar errores */}
                </div>
            )}
        </div>
    );
};

