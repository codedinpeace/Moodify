import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register, check, logout } from "../api/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const {setUser, setLoading, setLoggedIn} = context

    const handleLogin = async (username, email, password) => {
        try {
            setLoading(true)
            const data = await login(username, email, password)
            setUser(data)
            setLoggedIn(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
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
            console.log(error)
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
        }
    }

    return {
        handleCheck, handleLogin, handleLogout, handleRegister
    }

}