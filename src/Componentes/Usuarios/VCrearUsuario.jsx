import { useEffect, useRef, useState } from "react";
import InicioGeneral from "../General/InicioGeneral";
import InputdTipos from "../General/InputdTipos";
import '../../Estilos/estilosRU.css'
import { useLocation } from "react-router-dom";
import { getAllUsuarios, postUsuario, putUsuario } from "../../services/ApiUsuarios";

function VCrearUsuario(){
    
    const location=useLocation();console.log(location);
    const vactual=(location.pathname==='/usuarios/crear'?true:false);
    
    const [usuarios, setUsuarios]=useState([]);
    const [recargar, setRecargar]=useState(false);
    const [objSeleccionado, setObjSeleccionado]=useState(null);
    const [mostInp, setMostInp]=useState(false);

    useEffect(() => {
        if(!vactual){
            getAllUsuarios()
            .then((data)=>{
                setUsuarios(data);
            })   
            .catch(error => {
                console.error("Error al obtener los usuarios...!", error);
            });
        }
    }, [vactual,recargar]);
    
    
    useEffect(() => {
        if(refFormulario.current){
            refFormulario.current.reset();
        }
        setMostInp(false);
        setErrores({
            nomComp: { mensaje: '', clase: 'bordeNormal'},
            nomUsuario: { mensaje: '', clase: 'bordeNormal'},
            emailUsuario: { mensaje: '', clase: 'bordeNormal'},
            contrasenia: { mensaje: '', clase: 'bordeNormal'},         
        });
        setObjSeleccionado(null);
    }, [location.pathname]);

    let refFormulario=useRef();
    let [mensajeEstado, setMensajeEstado]=useState({mensaje:'',clase:''});
    let refcamposFormulario={
        nomComp: useRef(),
        nomUsuario: useRef(),
        emailUsuario: useRef(),
        contrasenia: useRef(),
    }

    let [errores, setErrores]=useState({
        nomComp: { mensaje: '', clase: 'bordeNormal' },
        nomUsuario: { mensaje: '', clase: 'bordeNormal' },
        emailUsuario: { mensaje: '', clase: 'bordeNormal' },
        contrasenia: { mensaje: '', clase: 'bordeNormal' },
    });

    const registrar=()=>{
        if(validarCampos()){
            const nuevoObjeto={
                nomComp: refcamposFormulario.nomComp.current.value,
                nomUsuario: refcamposFormulario.nomUsuario.current.value,
                emailUsuario: refcamposFormulario.emailUsuario.current.value,
                contrasenia: refcamposFormulario.contrasenia.current.value
            }
            if(vactual){
                postUsuario(nuevoObjeto)
                .then((data) => {
                    console.log(data); 
                    setMensajeEstado({mensaje:"Registrado con éxito..!",clase:"mensajeEstadoC"});
                })
                .catch((error) => {
                    console.error("Error al guardar ...!");
                    setErrores({
                        nomComp: { mensaje: '', clase: 'bordeError'},
                        nomUsuario: { mensaje: '', clase: 'bordeError'},
                        emailUsuario: { mensaje: '', clase: 'bordeError'},
                        contrasenia: { mensaje: '', clase: 'bordeError'}
                    });
                    setMensajeEstado({mensaje:"No se pudo registrar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        nomComp: { mensaje: '', clase:'bordeNormal'},
                        nomUsuario: { mensaje: '', clase:'bordeNormal'},
                        emailUsuario: { mensaje: '', clase:'bordeNormal'},
                        contrasenia: { mensaje: '', clase:'bordeNormal'}
                    });
                    
                },1000);  
            }else{
                nuevoObjeto.idUsuario=objSeleccionado.idUsuario;
                putUsuario(nuevoObjeto.idUsuario,nuevoObjeto)  
                .then((data) => {
                    console.log(data);
                    setMensajeEstado({mensaje:"Actualizado con éxito..!",clase:"mensajeEstadoC"});
                    setTimeout(()=>setRecargar(!recargar),1000);
                })
                .catch((error) => {
                    console.error("Error al actualizar...!");
                    setErrores({
                        nomComp: { mensaje: '', clase: 'bordeError'},
                        nomUsuario: { mensaje: '', clase: 'bordeError'},
                        emailUsuario: { mensaje: '', clase: 'bordeError'},
                        contrasenia: { mensaje: '', clase: 'bordeError'}
                    });
                    setMensajeEstado({mensaje:"No se pudo actualizar. Por favor intenta nuevamente...!",clase:"mensajeEstadoI"});
                }); 
                setTimeout(() => {
                    setMensajeEstado({mensaje:"",clase:""});
                    refFormulario.current.reset();
                    setErrores({
                        nomComp: { mensaje: '', clase:'bordeNormal'},
                        nomUsuario: { mensaje: '', clase:'bordeNormal'},
                        emailUsuario: { mensaje: '', clase:'bordeNormal'},
                        contrasenia: { mensaje: '', clase:'bordeNormal'}
                    });
                    setMostInp(false);
                    
                },1000); 

            }
        }
       


    }
    const validarCampos=()=>{
        let validosCampos=true;
        let nuevosErrores={...errores};

        let nomComp=refcamposFormulario.nomComp.current.value;
        if(nomComp===""){
            nuevosErrores.nomComp={mensaje:'El Nombre Completo es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.nomComp={mensaje:'',clase:'bordeCorrecto'};
        }
        
        let nomUsuario=refcamposFormulario.nomUsuario.current.value;
        if(nomUsuario===""){
            nuevosErrores.nomUsuario={mensaje:'El nombre de usuario es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.nomUsuario={mensaje:'',clase:'bordeCorrecto'};
        }

        let emailUsuario=refcamposFormulario.emailUsuario.current.value;
        if(emailUsuario===""){
            nuevosErrores.emailUsuario={mensaje:'El email es obligatorio',clase:'bordeError'};
            validosCampos=false;
        }else if(emailUsuario.indexOf('@')===-1){
            nuevosErrores.emailUsuario={mensaje:'El email debe contener el símbolo "@"',clase:'bordeError'};
            validosCampos=false;
        }else{
            nuevosErrores.emailUsuario={mensaje:'',clase:'bordeCorrecto'};
        }

        let passwordvalor=refcamposFormulario.contrasenia.current.value;
        let camCont=true;
        if(passwordvalor===""){
            console.log("aqui")
            nuevosErrores.contrasenia={mensaje:"La contraseña es obligatoria",clase:"bordeError"};
            validosCampos=false;
        }else if(passwordvalor.length<8){
            nuevosErrores.contrasenia={mensaje:"La contraseña debe tener al menos 8 caracteres",clase:"bordeError"};
            validosCampos=false;
        }else{
            let tieneMinuscula=false,tieneMayuscula=false,tieneNumero=false,tieneEspecial=false;
            for(let i=0;i<passwordvalor.length;i++){
                let char=passwordvalor[i];
                if(char>='a'&&char<='z')tieneMinuscula=true;
                if(char>='A'&&char<='Z')tieneMayuscula=true;
                if(char>='0'&&char<='9')tieneNumero=true;
                if(['!','@','#','$','%','^','&','*'].includes(char))tieneEspecial=true;
            }
            if(!tieneMinuscula){
                nuevosErrores.contrasenia={mensaje:"La contraseña debe contener al menos una letra minúscula",clase:"bordeError"};
                camCont=false;
            }else if(!tieneMayuscula){
                nuevosErrores.contrasenia={mensaje:"La contraseña debe contener al menos una letra mayúscula",clase:"bordeError"};
                camCont=false;
            }else if(!tieneNumero){
                nuevosErrores.contrasenia={mensaje:"La contraseña debe contener al menos un número",clase:"bordeError"};
                camCont=false;
            }else if(!tieneEspecial){
                nuevosErrores.contrasenia={mensaje:"La contraseña debe contener al menos un carácter especial",clase:"bordeError"};
                camCont=false;
            }else{
                nuevosErrores.contrasenia={mensaje:'',clase:'bordeCorrecto'};
            }
        }
        if(!camCont){
            validosCampos=false;
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
            const usuarioSeleccionado=usuarios.find((usuario) => usuario.idUsuario === Id);
            setObjSeleccionado(usuarioSeleccionado);
            refcamposFormulario.nomComp.current.value=usuarioSeleccionado.nomComp;
            refcamposFormulario.nomUsuario.current.value=usuarioSeleccionado.nomUsuario;
            refcamposFormulario.emailUsuario.current.value=usuarioSeleccionado.emailUsuario;
            refcamposFormulario.contrasenia.current.value=usuarioSeleccionado.contrasenia;
        }else{
            setMostInp(false);
            refFormulario.current.reset();
        }
    }
        
    return(
        <div>
            <InicioGeneral mactivo='usuarios' submactivo={vactual?'create':'update'}></InicioGeneral>
            <div className="Registro">
                
                <form ref={refFormulario}>
                    <fieldset>
                        {!vactual && (
                            <div className="selectContenedor">
                                <label htmlFor="select">Seleccionar un usuario:</label>
                                <select id="select" onChange={seleccionCMB}>
                                    <option value={-1}>Selecciona un usuario</option>
                                    {usuarios.map((usuario,index) => (
                                            <option key={index} value={usuario.idUsuario}>
                                                {usuario.nomUsuario}
                                            </option>
                                    ))}


                                </select>

                            </div>

                        )}
                        <InputdTipos
                            idinput="nomComp"
                            tipo="text"
                            placeholder="Nombre Completo"
                            TextLabel="Nombre Completo:"
                            error={errores.nomComp.mensaje}
                            referencia={refcamposFormulario.nomComp}
                            clase={errores.nomComp.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="nomUsuario"
                            tipo="text"
                            placeholder="Nombre de usuario"
                            TextLabel="Nombre de usuario:"
                            error={errores.nomUsuario.mensaje}
                            referencia={refcamposFormulario.nomUsuario}
                            clase={errores.nomUsuario.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="emailUsuario"
                            tipo="email"
                            placeholder="Email"
                            TextLabel="Email:"
                            error={errores.emailUsuario.mensaje}
                            referencia={refcamposFormulario.emailUsuario}
                            clase={errores.emailUsuario.clase}
                            ocultar={vactual || mostInp ? false : true}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="password"
                            tipo="password"
                            placeholder="Contraseña"
                            TextLabel="Contraseña:"
                            error={errores.contrasenia.mensaje}
                            referencia={refcamposFormulario.contrasenia}
                            clase={errores.contrasenia.clase}
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
export default VCrearUsuario;