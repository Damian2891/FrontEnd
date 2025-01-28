import api from "../lib/axios";
const ruta="/articulos";
export async function getAllArticulos(){
    const {data}=await api.get(ruta);
    console.log(data);
    return data;
}
export async function getArticuloID(id){
    const {data}=await api.get(ruta+"/"+id);
    console.log(data);
    return data;
}
export async function postArticulo(articulo){
    const {data}=await api.post(ruta,articulo);
    console.log(data);
    return data;
}
export async function putArticulo(id,articulo){
    const {data}=await api.put(ruta+"/"+id,articulo);
    console.log(data);
    return data;
}

export async function deleteArticulo(id){
    const {data}=await api.delete(ruta+"/"+id);
    console.log(data);
    return data;
}