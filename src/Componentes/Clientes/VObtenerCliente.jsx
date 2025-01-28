import { useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import ClienteCard from "./ClienteCard";
import { getClienteID } from "../../services/ApiClientes";



function VObtenerCliente(){
    let campoID=useRef();
    const [cliente, setCliente]=useState(null);
    const [mensajeEstado, setMensajeEstado]=useState("");

    const buscarID=async()=>{
        getClienteID(campoID.current.value)
        .then((data) => {
            console.log(data);
            setMensajeEstado("");
            setCliente(data);
        })
        .catch((error) => {
            console.error("Error al obtener el cliente..!");
            setCliente(null);
            setMensajeEstado("No se pudo obtener el cliente. Por favor, verifica el ID e intenta nuevamente.")
        });

       
    
    }

    return(
        <div>
            <InicioGeneral mactivo='clientes' submactivo='getID'></InicioGeneral>
            <div className="getID_contenedor" style={estilos}>
                <label htmlFor="id" style={estilosLabel}>ID Cliente:</label>
                <input id="id" type="number" placeholder="1,2,3,4....." min={1}
                    ref={campoID} onChange={buscarID}         
                />
            </div>
            {cliente && (
                <div style={estilosClienteCard}>
                    <ClienteCard cliente={cliente} ></ClienteCard>
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
const estilosClienteCard = {
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

export default VObtenerCliente;