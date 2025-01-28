import RegistroUsuario from './Componentes/Usuarios/RegistroUsuario'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Componentes/Usuarios/Login';
import RegistroCor from './Componentes/Usuarios/RegistroCor';
/*Articulos*/
import VObtenerArticulos from './Componentes/Articulos/VObtenerArticulos';
import VObtenerArticulo from './Componentes/Articulos/VObtenerArticulo';
import VCrearArticulo from './Componentes/Articulos/VCrearArticulo';
import VBorrarArticulo from './Componentes/Articulos/VBorrarArticulo';
/*Usuarios*/
import VObtenerUsuarios from './Componentes/Usuarios/VObtenerUsuarios';
import VObtenerUsuario from './Componentes/Usuarios/VObtenerUsuario';
import VBorrarUsuario from './Componentes/Usuarios/VBorrarUsuario';
/*Clientes*/
import VObtenerClientes from './Componentes/Clientes/VObtenerClientes';
import VObtenerCliente from './Componentes/Clientes/VObtenerCliente';
import VCrearCliente from './Componentes/Clientes/VCrearCliente';
import VBorrarCliente from './Componentes/Clientes/VBorrarCliente';
import VCrearUsuario from './Componentes/Usuarios/VCrearUsuario';

import Navegador from './Componentes/General/Navegador';
function App() {
  return (
    <div>
      <Routes>
      <Route path='/ejemplo/navegacion' element={<Navegador/>}/>


      {/*Rutas para articulos*/}
      <Route path='/articulos/obtenerTodos' element={<VObtenerArticulos/>}/>
      <Route path='/articulos/obtenerID' element={<VObtenerArticulo/>}/>
      <Route path='/articulos/crear' element={<VCrearArticulo/>}/>
      <Route path='/articulos/actualizar' element={<VCrearArticulo/>}/>
      <Route path='/articulos/borrar' element={<VBorrarArticulo/>}/>

      {/*Rutas para usuarios*/}
      <Route path='/usuarios/obtenerTodos' element={<VObtenerUsuarios/>}/>
      <Route path='/usuarios/obtenerID' element={<VObtenerUsuario/>}/>
      <Route path='/usuarios/crear' element={<VCrearUsuario/>}/>
      <Route path='/usuarios/actualizar' element={<VCrearUsuario/>}/>
      <Route path='/usuarios/borrar' element={<VBorrarUsuario/>}/>
      {/*Rutas para clientes*/}
      <Route path='/clientes/obtenerTodos' element={<VObtenerClientes/>}/>
      <Route path='/clientes/obtenerID' element={<VObtenerCliente/>}/>
      <Route path='/clientes/crear' element={<VCrearCliente/>}/>
      <Route path='/clientes/actualizar' element={<VCrearCliente/>}/>
      <Route path='/clientes/borrar' element={<VBorrarCliente/>}/>


      {/*Rutas para Login*/}
      <Route path='/registro-usuario' element={<RegistroUsuario/>}></Route>
      <Route path='/login-usuario' element={<Login/>}></Route>
      <Route path='/inicio/:id' element={<RegistroCor/>}></Route>
      <Route path='*' element={<Navigate to='/articulos/obtenerTodos' />}></Route>
    </Routes>
    
    </div>


  )
}
/*<Route path='/registro-clientes' element={<RegistroCliente/>}></Route>*/
export default App
