import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true,
})

export const login = async (username,email,password) => {
    try {
        const response = await api.post("/auth/login", {username,email,password})
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const register = async (username,email,password) => {
    try {
        const response = await api.post("/auth/register", {username,email,password})
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const check = async () => {
    try {
        const response = await api.get("/auth/check")
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export const logout = async () => {
    try {
        const response = await api.post("/auth/logout")
        return response.data
    } catch (error) {
        console.log(error);
    }
}

