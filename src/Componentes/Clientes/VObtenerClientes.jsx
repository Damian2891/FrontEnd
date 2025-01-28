import { getAllClientes } from "../../services/ApiClientes";
import InicioGeneral from "../General/InicioGeneral";

import ClienteCard from "./ClienteCard";
import { useEffect, useState } from "react";
function VObtenerClientes(){
    const [clientes,setClientes]=useState(null);
    const [cargando, setCargando]=useState(true);
    //Llamada a la API para obtener los artículos cuando el componente se monta
    useEffect(() => {
        getAllClientes().then((data)=>{
            setClientes(data);
        })
        .catch((error) => {
            console.error("Error al obtener los clientes", error);
        })
        .finally(()=>{
            setCargando(false);
        });
    }, []);//El segundo parámetro vacío asegura que solo se ejecute una vez cuando se monta el componente
    
    return(
        <div>
            <InicioGeneral mactivo="clientes" submactivo="getAll" />
            <div className="flex flex-wrap justify-around">
                {
                (!cargando?
                    clientes.length>0 ? (
                        clientes.map((cliente,index) => (
                            <ClienteCard key={index} cliente={cliente} />
                        ))
                    ):(
                        <p>No hay clientes para mostrar...!</p>
                    )
                    :null
                )
                }

            </div>            
        </div>
    );

}
export default VObtenerClientes;