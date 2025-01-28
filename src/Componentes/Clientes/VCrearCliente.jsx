import { useEffect, useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import InputdTipos from "../General/InputdTipos";
import '../../Estilos/estilosRU.css'
import { getAllClientes, postCliente, putCliente } from "../../services/ApiClientes";
import { useLocation } from "react-router-dom";

function VCrearCliente(){
    const location=useLocation();console.log(location);
    const vactual=(location.pathname==='/clientes/crear'?true:false);
    
    const [clientes, setClientes] = useState([]);
    const [recargar, setRecargar]=useState(false);
    const [objSeleccionado, setObjSeleccionado]=useState(null);
    const [mostInp, setMostInp]=useState(false);

    useEffect(() => {
        if(!vactual){
            getAllClientes()
            .then((data)=>{
                setClientes(data);
            })   
            .catch(error => {
                console.error("Error al obtener los clientes...!", error);
            });
        }
    }, [vactual,recargar]);
    
    
    useEffect(() => {
        if(refFormulario.current){
            refFormulario.current.reset();
        }
        setMostInp(false);
        setErrores({
            cedulaCliente: { mensaje: '', clase: 'bordeNormal' },
            nomCliente: { mensaje: '', clase: 'bordeNormal' },
            telCelular: { mensaje: '', clase: 'bordeNormal' },
            direccion: { mensaje: '', clase: 'bordeNormal' },
            email: { mensaje: '', clase: 'bordeNormal' },           
        });
        setObjSeleccionado(null);
    }, [location.pathname]);

    let refFormulario=useRef();
    let [mensajeEstado, setMensajeEstado]=useState({mensaje:'',clase:''});
    let refcamposFormulario={
        cedulaCliente: useRef(),
        nomCliente: useRef(),
        telCelular: useRef(),
        direccion: useRef(),
        email: useRef(),
    }

    let [errores, setErrores]=useState({
        cedulaCliente: { mensaje: '', clase:'bordeNormal'},
        nomCliente: { mensaje: '', clase:'bordeNormal'},
        telCelular: { mensaje: '', clase:'bordeNormal'},
        direccion: { mensaje: '', clase:'bordeNormal'},
        email: { mensaje: '', clase:'bordeNormal'},
    });

    const registrar=()=>{
        if(validarCampos()){
            const nuevoObjeto={
                cedulaCliente: refcamposFormulario.cedulaCliente.current.value,
                nomCliente: refcamposFormulario.nomCliente.current.value,
                telCelular: refcamposFormulario.telCelular.current.value,
                direccion: refcamposFormulario.direccion.current.value,
                email: refcamposFormulario.email.current.value,
            }
            if(vactual){
                postCliente(nuevoObjeto)
                .then((data) => {
                    console.log(data); 
                    setMensajeEstado({mensaje:"Registrado con éxito..!",clase:"mensajeEstadoC"});
                })
                .catch((error) => {
                    console.error("Error al guardar ...!");
                    setErrores({
                        cedulaCliente: { mensaje: '', clase: 'bordeError'},
                        nomCliente: { mensaje: '', clase: 'bordeError'},
                        telCelular: { mensaje: '', clase: 'bordeError'},
                        direccion: { mensaje: '', clase: 'bordeError'},
                        email: { mensaje: '', clase: 'bordeError'},
                    });
                    setMensajeEstado({mensaje:"No se pudo registrar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        cedulaCliente: { mensaje: '', clase:'bordeNormal'},
                        nomCliente: { mensaje: '', clase:'bordeNormal'},
                        telCelular: { mensaje: '', clase:'bordeNormal'},
                        direccion: { mensaje: '', clase:'bordeNormal'},
                        email: { mensaje: '', clase:'bordeNormal'},
                    });
                    
                },1000);  
            }else{
                nuevoObjeto.idCliente=objSeleccionado.idCliente;
                putCliente(nuevoObjeto.idCliente,nuevoObjeto)  
                .then((data) => {
                    console.log(data);
                    setMensajeEstado({mensaje:"Actualizado con éxito..!",clase:"mensajeEstadoC"});
                    setTimeout(()=>setRecargar(!recargar),1000);
                })
                .catch((error) => {
                    console.error("Error al actualizar...!");
                    setErrores({
                        cedulaCliente: { mensaje: '', clase: 'bordeError'},
                        nomCliente: { mensaje: '', clase: 'bordeError'},
                        telCelular: { mensaje: '', clase: 'bordeError'},
                        direccion: { mensaje: '', clase: 'bordeError'},
                        email: { mensaje: '', clase: 'bordeError'},
                    });
                    setMensajeEstado({mensaje:"No se pudo actualizar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        cedulaCliente: { mensaje: '', clase:'bordeNormal'},
                        nomCliente: { mensaje: '', clase:'bordeNormal'},
                        telCelular: { mensaje: '', clase:'bordeNormal'},
                        direccion: { mensaje: '', clase:'bordeNormal'},
                        email: { mensaje: '', clase:'bordeNormal'},
                    });
                    setMostInp(false);
                    
                },1000); 

            }
        }
       


    }
    const validarCampos=()=>{
        let validosCampos=true;
        let nuevosErrores={...errores};
        let cedula=refcamposFormulario.cedulaCliente.current.value;
        if(cedula===""){
            nuevosErrores.cedulaCliente={ mensaje:'La cédula es obligatoria', clase: 'bordeError' };
            validosCampos=false;
        }else if(cedula.length!==10 || isNaN(cedula)){
            nuevosErrores.cedulaCliente={ mensaje:'La cédula debe tener 10 dígitos numéricos', clase: 'bordeError' };
            validosCampos=false;
        }else{
            nuevosErrores.cedulaCliente={mensaje:'',clase:'bordeCorrecto'};
        }

        if(refcamposFormulario.nomCliente.current.value===""){
            nuevosErrores.nomCliente={mensaje:'El nombre es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.nomCliente={mensaje:'',clase:'bordeCorrecto'};
        }

        let telCelular=refcamposFormulario.telCelular.current.value;
        if(telCelular===""){
            nuevosErrores.telCelular={mensaje:'El teléfono celular es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else if(telCelular.length!==10||isNaN(telCelular)){
            nuevosErrores.telCelular={mensaje:'El teléfono debe tener 10 dígitos numéricos',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.telCelular={mensaje:'',clase:'bordeCorrecto'};
        }

        if(refcamposFormulario.direccion.current.value===""){
            nuevosErrores.direccion={mensaje:'La dirección es obligatoria',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.direccion={mensaje:'',clase:'bordeCorrecto'};
        }

        let email=refcamposFormulario.email.current.value;
        if(email===""){
            nuevosErrores.email={mensaje:'El email es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else if(email.indexOf('@')===-1){
            nuevosErrores.email={mensaje:'El email debe contener el símbolo "@"',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.email={mensaje:'',clase:'bordeCorrecto'};
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
            const clienteSeleccionado=clientes.find((cliente) => cliente.idCliente===Id);
            setObjSeleccionado(clienteSeleccionado);
            refcamposFormulario.cedulaCliente.current.value=clienteSeleccionado.cedulaCliente;
            refcamposFormulario.nomCliente.current.value=clienteSeleccionado.nomCliente;
            refcamposFormulario.telCelular.current.value=clienteSeleccionado.telCelular;
            refcamposFormulario.direccion.current.value=clienteSeleccionado.direccion;
            refcamposFormulario.email.current.value=clienteSeleccionado.email;
        }else{
            setMostInp(false);
            refFormulario.current.reset();
        }
    }
        
    return(
        <div>
            <InicioGeneral mactivo='clientes' submactivo={vactual?'create':'update'}></InicioGeneral>
            <div className="Registro">
                
                <form ref={refFormulario}>
                    <fieldset>
                        {!vactual && (
                            <div className="selectContenedor">
                                <label htmlFor="select">Seleccionar un cliente:</label>
                                <select id="select" onChange={seleccionCMB}>
                                    <option value={-1}>Selecciona un cliente</option>
                                    {clientes.map((cliente,index) => (
                                            <option key={index} value={cliente.idCliente}>
                                                {cliente.cedulaCliente}
                                            </option>
                                    ))}


                                </select>

                            </div>

                        )}
                        <InputdTipos
                            idinput="cedulaCliente"
                            tipo="text"
                            placeholder="Cédula"
                            TextLabel="Cédula cliente:"
                            error={errores.cedulaCliente.mensaje}
                            referencia={refcamposFormulario.cedulaCliente}
                            clase={errores.cedulaCliente.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="nomCliente"
                            tipo="text"
                            placeholder="Nombre"
                            TextLabel="Nombre cliente:"
                            error={errores.nomCliente.mensaje}
                            referencia={refcamposFormulario.nomCliente}
                            clase={errores.nomCliente.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="telCelular"
                            tipo="text"
                            placeholder="Teléfono celular"
                            TextLabel="Teléfono celular:"
                            error={errores.telCelular.mensaje}
                            referencia={refcamposFormulario.telCelular}
                            clase={errores.telCelular.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="direccion"
                            tipo="text"
                            placeholder="Dirección"
                            TextLabel="Dirección:"
                            error={errores.direccion.mensaje}
                            referencia={refcamposFormulario.direccion}
                            clase={errores.direccion.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="email"
                            tipo="email"
                            placeholder="Email"
                            TextLabel="Email:"
                            error={errores.email.mensaje}
                            referencia={refcamposFormulario.email}
                            clase={errores.email.clase}
                            ocultar={vactual || mostInp ? false : true}
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
export default VCrearCliente;