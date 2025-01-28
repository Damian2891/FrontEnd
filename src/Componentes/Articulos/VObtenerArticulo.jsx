import { useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import { getArticuloID } from "../../services/ApiArticulos";
import ArticuloCard from "./ArticuloCard";
function VObtenerArticulo(){
    let campoID=useRef();
    const [articulo, setArticulo]=useState(null);
    const [mensajeEstado, setMensajeEstado]=useState("");

    const buscarID=async()=>{
        getArticuloID(campoID.current.value)
        .then((data) => {
            console.log(data); // Imprime los datos si la promesa se resuelve correctamente
            setMensajeEstado("");
            setArticulo(data);
        })
        .catch((error) => {
            console.error("Error al obtener el artículo:");
            setArticulo(null);
            setMensajeEstado("No se pudo obtener el artículo. Por favor, verifica el ID e intenta nuevamente.")
        });
    
    }

    return(
        <div>
            <InicioGeneral mactivo='articulos' submactivo='getID'></InicioGeneral>
            <div className="getID_contenedor" style={estilos}>
                <label htmlFor="id" style={estilosLabel}>ID artículo:</label>
                <input id="id" type="number" placeholder="1,2,3,4....." min={1}
                    ref={campoID} onChange={buscarID}         
                />
            </div>
            {articulo && (
                <div style={estilosArticuloCard}>
                    <ArticuloCard articulo={articulo} ></ArticuloCard>
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
const estilosArticuloCard = {
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

export default VObtenerArticulo;