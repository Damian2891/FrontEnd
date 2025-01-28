import { Link } from 'react-router-dom';
import '../../Estilos/InicioGeneral.css';

function InicioGeneral({mactivo,submactivo}) {
    return (
        <div>
            <nav className='iGeneral_contenedor'>
                <Link to={'/articulos/obtenerTodos'} className={'iGeneral_elementos '+(mactivo==='articulos'?'activaM':'')}>Articulos</Link>
                <Link to={'/usuarios/obtenerTodos'} className={'iGeneral_elementos '+(mactivo==='usuarios'?'activaM':'')}>Usuarios</Link>
                <Link to={'/clientes/obtenerTodos'} className={'iGeneral_elementos '+(mactivo==='clientes'?'activaM':'')}>Clientes</Link>

            </nav>
            <nav className='sMenu_contenedor'>
                <Link to={'/'+mactivo+'/obtenerTodos'} className={'sMenu_elementos '+(submactivo==='getAll'? 'activaS':'')}>Obtener Todos</Link>
                <Link to={'/'+mactivo+'/obtenerID'} className={'sMenu_elementos '+(submactivo==='getID'? 'activaS':'')}>Obtener ID</Link>
                <Link to={'/'+mactivo+'/crear'} className={'sMenu_elementos '+(submactivo==='create'? 'activaS':'')}>Crear</Link>
                <Link to={'/'+mactivo+'/actualizar'} className={'sMenu_elementos '+(submactivo==='update'? 'activaS':'')}>Actualizar</Link>
                <Link to={'/'+mactivo+'/borrar'} className={'sMenu_elementos '+(submactivo==='delete'? 'activaS':'')}>Borrar</Link>
            </nav>
        </div>
    );
}

export default InicioGeneral;
