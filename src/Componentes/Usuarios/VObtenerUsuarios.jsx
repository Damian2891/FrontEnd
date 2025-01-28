import { getAllUsuarios } from "../../services/ApiUsuarios";
import InicioGeneral from "../General/InicioGeneral";
import { useEffect, useState } from "react";
import UsuarioCard from "./UsuarioCard";
function VObtenerUsuarios(){
    const [usuarios,setUsuarios]=useState(null);
    const [cargando, setCargando]=useState(true);

    useEffect(() => {
        getAllUsuarios().then((data)=>{
            setUsuarios(data);
        })
        .catch((error) => {
            console.error("Error al obtener los usuarios", error);
        })
        .finally(()=>{
            setCargando(false);
        });
    }, []);
    
    return(
        <div>
            <InicioGeneral mactivo="usuarios" submactivo="getAll" />
            <div className="flex flex-wrap justify-around">
                {
                (!cargando?
                    usuarios.length>0 ? (
                        usuarios.map((usuario,index) => (
                            <UsuarioCard key={index} usuario={usuario} />
                        ))
                    ):(
                        <p>No hay usuarios para mostrar...!</p>
                    )
                    :null
                )
                }

            </div>            
        </div>
    );

}
export default VObtenerUsuarios;