import '../Estilos/estilosRU.css'
import {useRef,useState} from "react";
import InputdTipos from './General/InputdTipos';
import { useNavigate } from 'react-router-dom';

function RegistroCliente(props){
    let navegar=useNavigate();
    /*Referencias a los inputs*/
    let refcamposFormulario={
        refCedulaCliente:useRef(),
        refNomCliente:useRef(),
        refTelCelular:useRef(),
        refDireccion:useRef(),
        refEmail:useRef(),
        

    }

    /*Estado de los errores*/
    let [errores,setErrores]=useState({
        errorCedulaCliente:'',
        errorNomCliente:'',
        errorTelCelular:'',
        errorDireccion:'',
        errorEmail:'',
    });

    /*Estado del mensaje de éxito*/
    let [mensajeEstado, setMensajeEstado]=useState('');   
    let formularioCliente=useRef();
    let refMensajeEstado=useRef();
    


    return(
        <div id="Registro">
            <header>
                <h1>Registrar un cliente</h1>
            </header>
            
            <main id="mainRegistro">
                <form  ref={formularioCliente}>
                    <fieldset>
                        
                        <InputdTipos
                            idinput="cedulaCliente"
                            tipo="text"
                            placeholder="Cédula"
                            TextLabel="cedulaCliente:"
                            error={errores.errorCedulaCliente}
                            referencia={refcamposFormulario.refCedulaCliente}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="nomCliente"
                            tipo="text"
                            placeholder="nomCliente"
                            TextLabel="Nombre:"
                            error={errores.errorNomCliente}
                            referencia={refcamposFormulario.refNomCliente}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="telCelular"
                            tipo="telCelular"
                            placeholder="ejemplo@gmail.com"
                            TextLabel="Correo electrónico:"
                            error={errores.errorTelCelular}
                            referencia={refcamposFormulario.refTelCelular}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="direccion"
                            tipo="direccion"
                            placeholder="Av. Morán Valverde"
                            TextLabel="Dirección:"
                            error={errores.errorDireccion}
                            referencia={refcamposFormulario.refDireccion}
                        ></InputdTipos>
                        <InputdTipos
                            idinput="email"
                            tipo="email"
                            placeholder="ejemplo@gmail.com"
                            TextLabel="Correo electrónico:"
                            error={errores.errorEmail}
                            referencia={refcamposFormulario.refEmail}
                        ></InputdTipos>
 
                       
                        <button type="submit" style={{margin:"0px auto",display: "block"}} >Registrar</button>
                        <div id="mensajeEstado">
                            <p ref={refMensajeEstado}>{mensajeEstado}</p>
                        </div>
            

                    </fieldset>
                </form>
            </main>
        </div>
    );
}

export default RegistroCliente;