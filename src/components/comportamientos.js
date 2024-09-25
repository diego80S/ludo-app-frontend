import React , { useState, useEffect } from "react";

export const Usuario = () => {
    //const url = "http://localhost:8000/api/v1/comportamientos"
    
    const [usuarios, setUsuarios] = useState([]);

  
  
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/comportamientos?id=1", {
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
    }, []);
    

    
    return <div>
        <p>tipo de comportamiento: {usuarios.tipo}</p>
        <p>descripcion: {usuarios.descripcion}</p>
        <p>id: {usuarios.id}</p>
    </div>
}