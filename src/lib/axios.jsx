import axios from "axios";

const api=axios.create({
    //baseURL: "http://localhost:3030/api",
    baseURL:"https://backendpractica-zmzq.onrender.com/api"
});

export default api;