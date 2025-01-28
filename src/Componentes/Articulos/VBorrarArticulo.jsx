import InicioGeneral from "../General/InicioGeneral";
import { deleteArticulo, getAllArticulos } from "../../services/ApiArticulos";
import { useEffect, useState } from "react";
import '../../Estilos/borrar.css'

function VBorrarArticulo(){
    const [articulos,setArticulos]=useState([]);
    const [recargar, setRecargar]=useState(false);
    const [cargando, setCargando]=useState(true);
    //Llamada a la API para obtener los artículos cuando el componente se monta
    useEffect(() => {
        getAllArticulos().then((data)=>{
            setArticulos(data); // Actualizamos el estado con los artículos
        })        
        .catch((error) => {
            console.error("Error al obtener los articulos", error);
        })
        .finally(()=>{
            setCargando(false);
        });
    }, [recargar]);//Dependemos de recargar, por lo que se volverá a ejecutar cuando recargar cambie
    
    const eliminar=(elemento)=>{
        deleteArticulo(elemento.id)
        .then((data) => {
            console.log(data); // Imprime los datos si la promesa se resuelve correctamente
            setRecargar(!recargar); 
        })
        .catch((error) => {
            console.error("Error al obtener el artículo:");
        });

    }

    return(
        <div>
            <InicioGeneral mactivo='articulos' submactivo='delete'></InicioGeneral>
            <div className="borrarContenedor">
            {!cargando && (
                <table id="tablaBorarrar">
                    <thead>
                    <tr className="tablaCabeceras">
                        <th></th>
                        <th>Título</th>
                        <th>Cuerpo:</th>
                        <th>Usuario:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articulos.length > 0 ? (
                        articulos.map((elemento, index) => (
                        <tr className="tablaDetalles" key={index}>
                            <td>
                            <span id="eliminar" onClick={() => eliminar(elemento)}>
                                X
                            </span>
                            </td>
                            <td>{elemento.titulo}</td>
                            <td>{elemento.cuerpo}</td>
                            <td>{elemento.usuario}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="4">No existen artículos para eliminar...!</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );

}
export default VBorrarArticulo;