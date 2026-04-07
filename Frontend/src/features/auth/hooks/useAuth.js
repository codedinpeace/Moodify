import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { check, login, logout, register } from "../services/api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading, loggedIn, setLoggedIn} = context

    const handleRegister = async ({username , email, password}) => {
        setLoading(true)
        const data = await register({username, email, password})
        setUser(data)  
        setLoggedIn(true)
        setLoading(false) 
    }

    const handleLogin = async ({username, email, password}) => {
        setLoading(true)
        const data = await login({username, email, password})
        setUser(data)
        setLoggedIn(true)
        setLoading(false)
    }

    const handleCheck = async () => {
        setLoading(true)
        const data = await check()
        setUser(data)
        setLoggedIn(true)
        setLoading(false)
    }

    const handleLogOut = async () => {
        setLoading(true)
        await logout()
        setUser(null)
}

    return (
        {user, loading, loggedIn, handleRegister, handleLogOut, handleLogin, handleCheck}
    )

}