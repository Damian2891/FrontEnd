import { useEffect, useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import InputdTipos from "../General/InputdTipos";
import '../../Estilos/estilosRU.css'
import { getAllArticulos, postArticulo, putArticulo } from "../../services/ApiArticulos";
import { useLocation } from "react-router-dom";
function VCrearArticulo(){
    const location=useLocation();console.log(location);
    const vactual=(location.pathname==='/articulos/crear'?true:false);
    
    const [articulos,setArticulos]=useState([]);
    const [recargar, setRecargar]=useState(false);
    const [objSeleccionado, setObjSeleccionado]=useState(null);
    const [mostInp, setMostInp]=useState(false);
    //Llamada a la API para obtener los artículos cuando el componente se monta
    useEffect(() => {
        if(!vactual){
            getAllArticulos()
            .then((data)=>{
                setArticulos(data); // Actualizamos el estado con los artículos
            })   
            .catch(error => {
                console.error("Error al obtener los artículos ", error);
            });
        }
    }, [vactual,recargar]);
    
    useEffect(() => {
        if(refFormulario.current){
            refFormulario.current.reset();
        }
        setMostInp(false);
        setErrores({
            titulo: { mensaje: '', clase: 'bordeNormal' },
            cuerpo: { mensaje: '', clase: 'bordeNormal' },
            usuario: { mensaje: '', clase: 'bordeNormal' },
        });
        setObjSeleccionado(null);
    }, [location.pathname]);

    let refFormulario=useRef();
    let [mensajeEstado, setMensajeEstado]=useState({mensaje:'',clase:''});
    let refcamposFormulario={
            titulo:useRef(),
            cuerpo:useRef(),
            usuario:useRef(),
        }
        /*Estado de los errores*/
        let [errores, setErrores]=useState({
            titulo: { mensaje: '', clase: 'bordeNormal' }, 
            cuerpo: { mensaje: '', clase: 'bordeNormal' },
            usuario: { mensaje: '', clase: 'bordeNormal' },
        });
    const registrar=()=>{
        if(validarCampos()){
            const nuevoObjeto={
                titulo:refcamposFormulario.titulo.current.value,
                cuerpo:refcamposFormulario.cuerpo.current.value,
                usuario:refcamposFormulario.usuario.current.value
            }
            if(vactual){
                postArticulo(nuevoObjeto)
                .then((data) => {
                    console.log(data); // Imprime los datos si la promesa se resuelve correctamente
                    setMensajeEstado({mensaje:"Registrado con éxito..!",clase:"mensajeEstadoC"});
                })
                .catch((error) => {
                    console.error("Error al guardar ...!");
                    setErrores({
                        titulo: { mensaje: '', clase: 'bordeError' }, 
                        cuerpo: { mensaje: '', clase: 'bordeError' },
                        usuario: { mensaje: '', clase: 'bordeError' },
                    });
                    setMensajeEstado({mensaje:"No se pudo registrar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        titulo: { mensaje: '', clase: 'bordeNormal' }, 
                        cuerpo: { mensaje: '', clase: 'bordeNormal' },
                        usuario: { mensaje: '', clase: 'bordeNormal' },
                    });
                    
                },1000);  
            }else{
                nuevoObjeto.id=objSeleccionado.id;
                putArticulo(nuevoObjeto.id,nuevoObjeto)  
                .then((data) => {
                    console.log(data); // Imprime los datos si la promesa se resuelve correctamente
                    setMensajeEstado({mensaje:"Actualizado con éxito..!",clase:"mensajeEstadoC"});
                    setTimeout(()=>setRecargar(!recargar),1000);
                })
                .catch((error) => {
                    console.error("Error al actualizar...!");
                    setErrores({
                        titulo: { mensaje: '', clase: 'bordeError' }, 
                        cuerpo: { mensaje: '', clase: 'bordeError' },
                        usuario: { mensaje: '', clase: 'bordeError' },
                    });
                    setMensajeEstado({mensaje:"No se pudo actualizar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        titulo: { mensaje: '', clase: 'bordeNormal' }, 
                        cuerpo: { mensaje: '', clase: 'bordeNormal' },
                        usuario: { mensaje: '', clase: 'bordeNormal' },
                    });
                    setMostInp(false);
                    
                },1000); 

            }
        }
       


    }
    const validarCampos=()=>{
        let validosCampos=true;
        let nuevosErrores={...errores};
        if(refcamposFormulario.titulo.current.value===""){
            nuevosErrores.titulo={mensaje:'El título es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.titulo={mensaje:'',clase:'bordeCorrecto'};
        }
        if(refcamposFormulario.cuerpo.current.value===""){
            nuevosErrores.cuerpo={mensaje:'La descripción es obligatoria',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.cuerpo={mensaje:'',clase:'bordeCorrecto'};
        }
        if(refcamposFormulario.usuario.current.value===""){
            nuevosErrores.usuario={mensaje:'El encargado es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.usuario={mensaje:'',clase:'bordeCorrecto'};
        }
        setErrores(nuevosErrores);
        return validosCampos;
    };

    /*Actualizar Usuarios*/
    const seleccionCMB=(evento)=>{
        const Id=parseInt(evento.target.value);
        console.log(Id);

        if(Id!==-1){
            setMostInp(true);
            const articuloSeleccionado=articulos.find((articulo) => articulo.id === Id);
            setObjSeleccionado(articuloSeleccionado);
            refcamposFormulario.titulo.current.value=articuloSeleccionado.titulo;
            refcamposFormulario.cuerpo.current.value=articuloSeleccionado.cuerpo;
            refcamposFormulario.usuario.current.value=articuloSeleccionado.usuario;
        }else{
            setMostInp(false);
            refFormulario.current.reset();
        }
    }
        
    return(
        <div>
            <InicioGeneral mactivo='articulos' submactivo={vactual?'create':'update'}></InicioGeneral>
            <div className="Registro">
                
                <form ref={refFormulario}>
                    <fieldset>
                        {!vactual && (
                            <div className="selectContenedor">
                                <label htmlFor="select">Seleccionar artículo:</label>
                                <select id="select" onChange={seleccionCMB}>
                                    <option value={-1}>Selecciona un artículo</option>
                                    {articulos.map((articulo,index) => (
                                            <option key={index} value={articulo.id}>
                                                {articulo.titulo}
                                            </option>
                                    ))}


                                </select>

                            </div>

                        )}
                        <InputdTipos
                            idinput="titulo"
                            tipo="text"
                            placeholder="Titulo"
                            TextLabel="Titulo artículo:"
                            error={errores.titulo.mensaje}
                            referencia={refcamposFormulario.titulo}
                            clase={errores.titulo.clase} 
                            ocultar={vactual || mostInp?false:true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="cuerpo"
                            tipo="text"
                            placeholder="Descripción"
                            TextLabel="Descripción:"
                            error={errores.cuerpo.mensaje}
                            referencia={refcamposFormulario.cuerpo}
                            clase={errores.cuerpo.clase}
                            ocultar={vactual || mostInp?false:true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="usuario"
                            tipo="text"
                            placeholder="Encargado"
                            TextLabel="Encargado:"
                            error={errores.usuario.mensaje}
                            referencia={refcamposFormulario.usuario}
                            clase={errores.usuario.clase}
                            ocultar={vactual || mostInp?false:true}
                        ></InputdTipos>
                        <div  className={(vactual || mostInp)?"boton ":"OcultarElementos "} >
                            <button type="button" onClick={registrar}>{vactual?'Registrar':'Actualizar'}</button>
                        </div>
                        <div className={mensajeEstado.clase}>
                            <p >{mensajeEstado.mensaje}</p>
                        </div>


                    </fieldset>
                </form>
            </div>
        </div>
    );

}
export default VCrearArticulo;