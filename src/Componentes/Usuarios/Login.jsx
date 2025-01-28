import '../../Estilos/estilosRU.css'
import { useRef, useState } from "react";
import InputdTipos from '../General/InputdTipos';
import { useNavigate } from 'react-router-dom';
//import Usuarios from "../Datos/datos.json";

function Login(props){
    let navegar=useNavigate();
    /*Referencias a los inputs*/
    let mensajeRef=useRef();
    let refcamposFormulario={
        nombreu:useRef(),
        password:useRef()
    }
    /*Estado de los errores*/
    let [errores,setErrores]=useState({
        nombreu:'',
        password:'',
    });

    /*Estado del mensaje de éxito*/
    let [mensajeExito, setMensajeExito]=useState('');
    const aplicarEstiloError=(campo,color)=>{
        campo.current.style.border="2px solid "+color;
    };

    async function validarInicio(){
        let nombreUsuario=refcamposFormulario.nombreu.current.value;
        let contrasena=refcamposFormulario.password.current.value;
        let validosCampos=true;
        let nuevosErrores={...errores}; //Clonar el objeto
        if(nombreUsuario===""){
            nuevosErrores.nombreu="El nombre de usuario es obligatorio";
            refcamposFormulario.nombreu.current.style.border="2px solid red"
            aplicarEstiloError(refcamposFormulario.nombreu,"red");
            validosCampos=false;

        }else{
            nuevosErrores.nombreu="";
            aplicarEstiloError(refcamposFormulario.nombreu,"green");
            mensajeRef.current.style.display="block";
        }

        if(contrasena===""){
            nuevosErrores.password="La contraseña es obligatoria";
            validosCampos=false;
            aplicarEstiloError(refcamposFormulario.password,"red");

        }else{
            nuevosErrores.password="";
            aplicarEstiloError(refcamposFormulario.password,"green");
            mensajeRef.current.style.display="block";
        }
        
        if(validosCampos){
            
            setErrores(nuevosErrores); 
            let usuario=await buscarUsuario(nombreUsuario);
            console.log(usuario);
            
            if(usuario!=null){
                if(usuario.contrasenia===contrasena){
                    setMensajeExito("¡Inicio de sesión exitoso!");
                    setTimeout(() => {
                        //props.setVentAct('vloginexito');
                        navegar('/inicio/'+usuario.idUsuario);
                    },1000);
                }else{
                    setMensajeExito("¡Error en las credenciales!");
                    mensajeRef.current.style.background="red";
                    aplicarEstiloError(refcamposFormulario.nombreu,"red");
                    aplicarEstiloError(refcamposFormulario.password,"red");
                    setTimeout(() => {
                        setMensajeExito(true);
                        mensajeRef.current.style.background="none";
                        mensajeRef.current.style.display="none";
                        aplicarEstiloError(refcamposFormulario.nombreu,"black");
                        aplicarEstiloError(refcamposFormulario.password,"black");
                        refcamposFormulario.nombreu.current.value="";
                        refcamposFormulario.password.current.value="";
    
                    },1000);
                }
            }else{
                setMensajeExito("¡Error no existe el usuario!");
                mensajeRef.current.style.background = "red";
                aplicarEstiloError(refcamposFormulario.nombreu,"red");
                aplicarEstiloError(refcamposFormulario.password,"red");
                setTimeout(() => {
                    mensajeRef.current.style.background="none";
                    mensajeRef.current.style.display="none";
                    aplicarEstiloError(refcamposFormulario.nombreu,"black");
                    aplicarEstiloError(refcamposFormulario.password,"black");
                    refcamposFormulario.nombreu.current.value="";
                    refcamposFormulario.password.current.value="";

                },1000);


            }


        }else{
            setErrores(nuevosErrores); 
        }

    }
    function buscarUsuario(nombreUsuario){
            return fetch('http://localhost:3030/api/usuarios',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify(nuevoUsuario),
            })
            .then((response) => response.json())
            .then((resultado) =>{
                console.log(resultado);
                const usuario=resultado.find(usuario => usuario.nomUsuario === nombreUsuario);
                console.log(usuario)
                return usuario || null;
            })
            .catch(error => {
                console.error('Error al buscar el usuario:', error);
                return null;
            });
    }
    
    return(
        <div className="Registro">
            <header>
                <h1>Iniciar Sesión</h1>
            </header>
            <main id="mainLogin">
            <form>
                    <fieldset>
                        <legend>LOGIN</legend>
                        <InputdTipos
                            idinput="nombreu"
                            tipo="text"
                            placeholder="Username"
                            TextLabel="Nombre de usuario:"
                            error={errores.nombreu}
                            referencia={refcamposFormulario.nombreu}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="password"
                            tipo="password"
                            placeholder="********"
                            TextLabel="Contraseña:"
                            error={errores.password}
                            referencia={refcamposFormulario.password}
                        ></InputdTipos> 
                        <div className="botones login">
                            <p id="Cambiar_IS" onClick={()=>navegar("registro-usuario")}>Regresar....</p>
                            <button type="button" onClick={validarInicio}>Iniciar Sesión</button>
                        </div>
                        {
                            <div  ref={mensajeRef}>
                                <p id="mensajeEstado">{mensajeExito}</p>
                            </div>
                        }

                    </fieldset>
                </form>

            </main>
        
        </div>

    );
}
export default Login;