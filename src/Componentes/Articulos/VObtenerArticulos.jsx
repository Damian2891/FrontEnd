import InicioGeneral from "../General/InicioGeneral";
import { getAllArticulos } from "../../services/ApiArticulos";
import ArticuloCard from "./ArticuloCard";
import { useEffect, useState } from "react";
function VObtenerArticulos(){
    const [articulos,setArticulos]=useState([]);
    const [cargando, setCargando]=useState(true);
    //Llamada a la API para obtener los artículos cuando el componente se monta
    useEffect(() => {
        getAllArticulos().then((data)=>{
            setArticulos(data); // Actualizamos el estado con los artículos
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
            <InicioGeneral mactivo="articulos" submactivo="getAll" />
            <div className="flex flex-wrap justify-around">
                {(!cargando?
                    articulos.length > 0 ? (
                        articulos.map((articulo,index) => (
                            <ArticuloCard key={index} articulo={articulo} />
                        ))
                    ):(<p>No hay artículos disponibles.</p>)
                    :null
                )
                }
            </div>            
        </div>
    );

}
export default VObtenerArticulos;