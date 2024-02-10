import axios from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_APP_BACKEND_SERVER
})