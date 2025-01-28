import InicioGeneral from "../General/InicioGeneral";
import { useEffect, useState } from "react";
import '../../Estilos/borrar.css'
import { deleteCliente, getAllClientes } from "../../services/ApiClientes";

function VBorrarCliente(){
    const [clientes,setClientes]=useState([]);
    const [recargar, setRecargar]=useState(false);
    const [cargando, setCargando]=useState(true);


    //Llamada a la API para obtener los artículos cuando el componente se monta
    useEffect(() => {
        getAllClientes()
        .then((data)=>{
            setClientes(data); 
        })        
        .catch((error) => {
            console.error("Error al obtener los clientes...!", error);
        })
        .finally(()=>{
            setCargando(false);
        });
    }, [recargar]);//Dependemos de recargar, por lo que se volverá a ejecutar cuando recargar cambie
    
    const eliminar=(elemento)=>{
        deleteCliente(elemento.idCliente)
        .then((data) => {
            console.log(data); // Imprime los datos si la promesa se resuelve correctamente
            setRecargar(!recargar); 
        })
        .catch((error) => {
            console.error("Error al obtener el cliente..!");
        });

    }

    return(
        <div>
            <InicioGeneral mactivo='clientes' submactivo='delete'></InicioGeneral>
            <div className="borrarContenedor">
            {!cargando && (
                <table id="tablaBorarrar">
                    <thead>
                    <tr className="tablaCabeceras">
                        <th></th>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((elemento, index) => (
                        <tr className="tablaDetalles" key={index}>
                            <td>
                            <span id="eliminar" onClick={() => eliminar(elemento)}>
                                X
                            </span>
                            </td>
                            <td>{elemento.cedulaCliente}</td>
                            <td>{elemento.nomCliente}</td>
                            <td>{elemento.telCelular}</td>
                            <td>{elemento.direccion}</td>
                            <td>{elemento.email}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="6">No existen clientes para eliminar...!</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );

}
export default VBorrarCliente;