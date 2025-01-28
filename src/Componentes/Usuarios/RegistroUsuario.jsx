import '../../Estilos/estilosRU.css'
import {useRef,useState} from "react";
import InputdTipos from '../General/InputdTipos';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario(props){
    let navegar=useNavigate();
    /*Referencias a los inputs*/
    let refcamposFormulario={
        nombreu:useRef(),
        nombrereal:useRef(),
        email:useRef(),
        password:useRef(),
        conpassword:useRef()
    }
    /*Estado de los errores*/
    let [errores,setErrores]=useState({
        nombreu:'',
        nombrereal:'',
        email:'',
        password:'',
        conpassword:''
    });

    /*Estado del mensaje de éxito*/
    let [mensajeEstado, setMensajeEstado]=useState('');
    let refMensajeEstado=useRef();
    const aplicarEstiloError=(campo,color)=>{
        campo.current.style.border="2px solid "+color;
    };
    
    let formularioUsuario=useRef();

    const validarRegistro=()=>{
        let nuevosErrores={...errores}; //Clonar el objeto
        let validosCampos=true;
        //Validar nombre de usuario
        if(refcamposFormulario.nombreu.current.value===""){
            nuevosErrores.nombreu="El nombre de usuario es obligatorio";
            refcamposFormulario.nombreu.current.style.border="2px solid red"
            aplicarEstiloError(refcamposFormulario.nombreu,"red");
            validosCampos=false;
        }else{
            nuevosErrores.nombreu="";
            aplicarEstiloError(refcamposFormulario.nombreu,"green");
        }
  
        //Validar nombre completo
        if(refcamposFormulario.nombrereal.current.value==="") {
            nuevosErrores.nombrereal="El nombre completo es obligatorio";
            aplicarEstiloError(refcamposFormulario.nombrereal,"red");
            validosCampos=false;
        }else{
            nuevosErrores.nombrereal="";
            aplicarEstiloError(refcamposFormulario.nombrereal,"green");
        }
  
        //Validar correo electrónico(contiene al menos un @)
        let email=refcamposFormulario.email.current.value;
        if(email===""){
            nuevosErrores.email="El correo electrónico es obligatorio";
            aplicarEstiloError(refcamposFormulario.email,"red");
            validosCampos=false;
        }else if(email.indexOf('@')===-1){
            nuevosErrores.email="El correo electrónico debe contener un '@'";
            aplicarEstiloError(refcamposFormulario.email,"red");
            validosCampos=false;
        }else{
            nuevosErrores.email="";
            aplicarEstiloError(refcamposFormulario.email,"green");
        }
  
      // Validar contraseña (mínimo 8 caracteres)
      let passwordvalor=refcamposFormulario.password.current.value;
      if(passwordvalor===""){
        nuevosErrores.password="La contraseña es obligatoria";
        validosCampos=false;
        aplicarEstiloError(refcamposFormulario.password,"red");
      }else if(passwordvalor.length<8){
        nuevosErrores.password="La contraseña debe tener al menos 8 caracteres";
        aplicarEstiloError(refcamposFormulario.password,"red");
        validosCampos=false;
      }else{
        /*nuevosErrores.password="";
        aplicarEstiloError(refcamposFormulario.password,"green");*/
        let tieneMinuscula=false;
        let tieneMayuscula=false;
        let tieneNumero=false;
        let tieneEspecial=false;
        let camCont=true;
        for(let i=0;i<passwordvalor.length;i++){
            let char=passwordvalor[i];
            if(char>='a' && char<='z')tieneMinuscula=true;
            if(char>='A' && char<='Z')tieneMayuscula=true;
            if(char>='0' && char<='9')tieneNumero=true;
            if(['!','@','#','$','%','^','&','*'].includes(char)) tieneEspecial=true;
        }

        if(!tieneMinuscula){
            nuevosErrores.password="La contraseña debe contener al menos una letra minúscula";
            camCont=false;
        }else if(!tieneMayuscula){
            nuevosErrores.password="La contraseña debe contener al menos una letra mayúscula";
            camCont=false;
        }else if(!tieneNumero){
            nuevosErrores.password="La contraseña debe contener al menos un número";
            camCont=false;
        }else if(!tieneEspecial){
            nuevosErrores.password="La contraseña debe contener al menos un carácter especial";
            camCont=false;
        }

        if(camCont){
            nuevosErrores.password="";
            aplicarEstiloError(refcamposFormulario.password,"green");

        }else{
            aplicarEstiloError(refcamposFormulario.password,"red");
            validosCampos=false;
        }
        
        

      }
  
      // Validar confirmación de contraseña (debe coincidir con la contraseña)
      let confPasswordvalor=refcamposFormulario.conpassword.current.value;
      if(confPasswordvalor===""){
        nuevosErrores.conpassword="Se debe confirmar la contraseña";
        aplicarEstiloError(refcamposFormulario.conpassword,"red");
        validosCampos=false;
      }else if(confPasswordvalor!==passwordvalor) {
        nuevosErrores.conpassword="Las contraseñas no coinciden";
        aplicarEstiloError(refcamposFormulario.conpassword,"red");
        validosCampos=false;
      }else{
        nuevosErrores.conpassword="";
        aplicarEstiloError(refcamposFormulario.conpassword,"green");
      }
  
      setErrores(nuevosErrores); // Actualizamos el estado con los errores
      return validosCampos;

    }

    async function ControlRegistro(evento){
        evento.preventDefault(); 
        if(validarRegistro()){
            /*setMensajeExito("¡Registro exitoso!");
*/
            const nuevoUsuario={
                nomComp:refcamposFormulario.nombrereal.current.value,
                nomUsuario:refcamposFormulario.nombreu.current.value,
                emailUsuario:refcamposFormulario.email.current.value,
                contrasenia:refcamposFormulario.password.current.value,
            }
            await fetch('http://localhost:3030/api/usuarios',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            })
            .then((response) => response.json())
            .then((resultado) =>{
                console.log(resultado);
                if(resultado.error){
                     console.log(`Error: ${resultado.error}`);
                    setMensajeEstado(resultado.error);
                    refMensajeEstado.current.style.backgroundColor="#e91919d5";
                    aplicarEstiloError(refcamposFormulario.nombrereal,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.nombreu,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.email,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.password,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.conpassword,"#ced4da");
                }else if(resultado.idUsuario){
                    setMensajeEstado("¡Registro exitoso!");
                    refMensajeEstado.current.style.backgroundColor="#316e25";
                    aplicarEstiloError(refcamposFormulario.nombrereal,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.nombreu,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.email,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.password,"#ced4da");
                    aplicarEstiloError(refcamposFormulario.conpassword,"#ced4da");
                }
                setTimeout(() => {
                    setMensajeEstado("");
                    formularioUsuario.current.reset();
                    
                },1000);
            });


        }else{
           /* setMensajeEstado("Error revise los campos...!");
            setTimeout(() => {
                setMensajeEstado("");
                setErrores({
                    nombreu: '',
                    nombrereal: '',
                    email: '',
                    password: '',
                    conpassword: ''
                });
                aplicarEstiloError(refcamposFormulario.nombrereal,"#ced4da");
                aplicarEstiloError(refcamposFormulario.nombreu,"#ced4da");
                aplicarEstiloError(refcamposFormulario.email,"#ced4da");
                aplicarEstiloError(refcamposFormulario.password,"#ced4da");
                aplicarEstiloError(refcamposFormulario.conpassword,"#ced4da");
            },1000);*/
        }
    }

    return(
        <div className="Registro">
            <header>
                <h1>Crear una cuenta</h1>
            </header>
            
            <main id="mainRegistro">
                <form onSubmit={ControlRegistro} ref={formularioUsuario}>
                    <fieldset>
                        
                        <InputdTipos
                            idinput="nombreu"
                            tipo="text"
                            placeholder="Username"
                            TextLabel="Nombre de usuario:"
                            error={errores.nombreu}
                            referencia={refcamposFormulario.nombreu}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="nombrereal"
                            tipo="text"
                            placeholder="Nombre completo"
                            TextLabel="Nombre:"
                            error={errores.nombrereal}
                            referencia={refcamposFormulario.nombrereal}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="email"
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            TextLabel="Correo electrónico:"
                            error={errores.email}
                            referencia={refcamposFormulario.email}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="password"
                            tipo="password"
                            placeholder="********"
                            TextLabel="Contraseña:"
                            error={errores.password}
                            referencia={refcamposFormulario.password}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="confpassword"
                            tipo="password"
                            placeholder="********"
                            TextLabel="Confirmar contraseña:"
                            error={errores.conpassword}
                            referencia={refcamposFormulario.conpassword}
                        ></InputdTipos>
 
                        <div className="botones">
                            <p id="Cambiar_IS" onClick={()=>navegar('/login-usuario')}>Iniciar Sesión</p>
                            <button type="submit" onClick={ControlRegistro}>Registrar</button>
                        </div>
                        <div id="mensajeEstado">
                            <p ref={refMensajeEstado}>{mensajeEstado}</p>
                        </div>
            

                    </fieldset>
                </form>
            </main>
        </div>
    );
}
export default RegistroUsuario;