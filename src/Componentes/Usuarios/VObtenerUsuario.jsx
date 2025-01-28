import { useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import UsuarioCard from "./UsuarioCard";
import { getUsuarioID } from "../../services/ApiUsuarios";



function VObtenerUsuario(){
    let campoID=useRef();
    const [usuario, setUsuario]=useState(null);
    const [mensajeEstado, setMensajeEstado]=useState("");

    const buscarID=async()=>{
        getUsuarioID(campoID.current.value)
        .then((data) => {
            console.log(data);
            setMensajeEstado("");
            setUsuario(data);
        })
        .catch((error) => {
            console.error("Error al obtener el usuario..!"+error);
            setUsuario(null);
            setMensajeEstado("No se pudo obtener el usuario. Por favor, verifica el ID e intenta nuevamente.")
        });

       
    
    }

    return(
        <div>
            <InicioGeneral mactivo='usuarios' submactivo='getID'></InicioGeneral>
            <div className="getID_contenedor" style={estilos}>
                <label htmlFor="id" style={estilosLabel}>ID Usuario:</label>
                <input id="id" type="number" placeholder="1,2,3,4....." min={1}
                    ref={campoID} onChange={buscarID}         
                />
            </div>
            {usuario && (
                <div style={estilosUsuarioCard}>
                    <UsuarioCard usuario={usuario} />
                </div>
            )}
            <div id="mensajeEstado" style={{backgroundColor:"#e91919d5",margin:"50px auto",fontSize:"1.2rem"}}>
                <p>{mensajeEstado}</p>
            </div>

        </div>
    );

}
const estilos={
    display:'flex',
    justifyContent:'center'
}
const estilosUsuarioCard = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '20px'
};
const estilosLabel={
    fontSize: "1.5rem",
    color: "black",
    fontWeight: "bold"
}

export default VObtenerUsuario;