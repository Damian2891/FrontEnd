import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RegistroCor(){
    let navegar=useNavigate();
    let {id}=useParams();  
    let [datosUsuario,setDatosUsuario]=useState({})
    async function getUsuario(){  
        fetch('http://localhost:3030/api/usuarios/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(nuevoUsuario),
        })
        .then((response) => response.json())
        .then((resultado) =>{
            console.log(resultado);
            setDatosUsuario(resultado);
        })
        .catch(error => {
            console.error('Error al leer los datos...!');
            return null;
        });

        
    }
    //Llama a getUsuario cuando el componente se monta
    useEffect(() => {
        getUsuario();
    }, []); //El array vacío asegura que esto solo se ejecute al montarse el componente

    return(
        <div className="botones">
            <h1>Bienvenido {datosUsuario?datosUsuario.nomComp:"Usuario desconocido"}, haz iniciado sesión.......!</h1>
            <button onClick={()=>navegar('login-usuario')}>Regresar.......</button>

        </div>

    );

}
export default RegistroCor;