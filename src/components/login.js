import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoUsuario = {          
                nombre,
                password      
        };

        try {
            const response = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirigir a /usuarios tras registro exitoso
                navigate('/listausuarios');
            } else {
                setError(data.message || 'Error al registrar usuario');
            }
        } catch (err) {
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
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
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <br/>

            No tengo cuenta, <Link to= "/registro">ir registrarme</Link>
        </div>
    );
};

export default Login;
