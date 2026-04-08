import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const [loggedin, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading, loggedin, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}
