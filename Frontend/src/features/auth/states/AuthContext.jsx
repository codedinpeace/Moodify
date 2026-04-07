import { Children, createContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({Children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    return (   
    <AuthContext.Provider value={{user, setUser, loading, setLoading, loggedIn, setLoggedIn}}>
        {Children}
    </AuthContext.Provider>
    )
    
}