import { useState } from "react";
import ojo from '../../imagenes/ojo.png';
import ojoAbierto from '../../imagenes/ojo-abierto.png';


function InputdTipos(props){
    const [mostrarClave,setMostrarClave]=useState(false);
    const alternarVisibilidad=()=>{
        setMostrarClave(!mostrarClave);
    };
    
    return(
        <div className={props.ocultar?"OcultarElementos":"grupoform"}>
             <label htmlFor={props.idinput}>{props.TextLabel}</label>
             <input name={props.idinput} id={props.idinput} 
             type={props.tipo==="password" && mostrarClave ? "text" :props.tipo}
             placeholder={props.placeholder} required
             ref={props.referencia}
             className={props.clase || ""}
            ></input>
            {props.error && <span className="mensaje_error">{props.error}</span>}
            {props.tipo==="password" && (
            <div id={"boton_"+props.idinput}
                onClick={alternarVisibilidad}>
                {mostrarClave?<img src={ojo} alt="Mostrar" style={{ width: "20px", height: "20px" }}></img> 
                : <img src={ojoAbierto} alt="Ocultar" style={{ width: "20px", height: "20px" }}></img> }
            </div>
            )}

            
        </div>
        
    );

}
export default InputdTipos;