import InicioGeneral from "../General/InicioGeneral";
import { useEffect, useState } from "react";
import '../../Estilos/borrar.css'
import { deleteUsuario, getAllUsuarios } from "../../services/ApiUsuarios";

function VBorrarUsuario(){
    const [usuarios,setUsuarios]=useState([]);
    const [recargar, setRecargar]=useState(false);
    const [cargando, setCargando]=useState(true);

    useEffect(() => {
        getAllUsuarios()
        .then((data)=>{
            setUsuarios(data); 
        })        
        .catch((error) => {
            console.error("Error al obtener los usuarios...!", error);
        })
        .finally(()=>{
            setCargando(false);
        });
    }, [recargar]);//Dependemos de recargar, por lo que se volverá a ejecutar cuando recargar cambie
    
    const eliminar=(elemento)=>{
        deleteUsuario(elemento.idUsuario)
        .then((data) => {
            console.log(data); // Imprime los datos si la promesa se resuelve correctamente
            setRecargar(!recargar); 
        })
        .catch((error) => {
            console.error("Error al eliminar el usuario..!");
        });

    }

    return(
        <div>
            <InicioGeneral mactivo='usuarios' submactivo='delete'></InicioGeneral>
            <div className="borrarContenedor">
            {!cargando && (
                <table id="tablaBorarrar">
                    <thead>
                    <tr className="tablaCabeceras">
                        <th></th>
                        <th>Nombre</th>
                        <th>Nombre Usuario</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((elemento, index) => (
                        <tr className="tablaDetalles" key={index}>
                            <td>
                            <span id="eliminar" onClick={() => eliminar(elemento)}>
                                X
                            </span>
                            </td>
                            <td>{elemento.nomComp}</td>
                            <td>{elemento.nomUsuario}</td>
                            <td>{elemento.emailUsuario}</td>
                            <td>{elemento.contrasenia}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="5">No existen usuarios para eliminar...!</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );

}
export default VBorrarUsuario;