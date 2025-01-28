const baseURL="http://localhost:3030/api";

async function fetchApi(endpoint,options={}) {
    //console.log(await fetch(`${baseURL}${endpoint}`,options)+"hola")
    const response=await fetch(`${baseURL}${endpoint}`,options);
    console.log(response)
    if(!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return await response.json();
}

export function getAllUsuarios() {
    return fetchApi('/usuarios');
}

export function getUsuarioID(id) {
    return fetchApi(`/usuarios/${id}`);
}

export function postUsuario(usuario) {
    return fetchApi('/usuarios',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(usuario)
    });
}

export function putUsuario(id,usuario) {
    return fetchApi(`/usuarios/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(usuario)
    });
}

export function deleteUsuario(id) {
    return fetchApi(`/usuarios/${id}`,{method:'DELETE'});
}
