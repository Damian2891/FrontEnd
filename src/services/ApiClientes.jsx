import api from "../lib/axios";
const ruta="/clientes";
export async function getAllClientes(){
    const {data}=await api.get(ruta);
    console.log(data);
    return data;
}
export async function getClienteID(id){
    const {data}=await api.get(ruta+"/"+id);
    console.log(data);
    return data;
}
export async function postCliente(cliente){
    const {data}=await api.post(ruta,cliente);
    console.log(data);
    return data;
}
export async function putCliente(id,cliente){
    const {data}=await api.put(ruta+"/"+id,cliente);
    console.log(data);
    return data;
}

export async function deleteCliente(id){
    const {data}=await api.delete(ruta+"/"+id);
    console.log(data);
    return data;
}