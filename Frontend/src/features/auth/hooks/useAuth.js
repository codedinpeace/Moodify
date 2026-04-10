import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register, check, logout } from "../api/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const {setUser, setLoading, setLoggedIn} = context

    const handleLogin = async (userData) => {
        try {
            setLoading(true)
            const data = await login(userData)
            setUser(data)
            setLoggedIn(true)
            setLoading(false)
            console.log("User logged In")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true)
            const data = await register(username, email, password)
            setUser(data)
            setLoggedIn(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleCheck = async () => {
        try {
            setLoading(true)
            const data = await check()
            setUser(data)
            setLoggedIn(true)
            setLoading(false)
        } catch (error) {
            console.error(error.message)
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        try {
            setLoading(true)
             await logout()
            setUser(null)
            setLoggedIn(false)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return {
        handleCheck, handleLogin, handleLogout, handleRegister
    }

}