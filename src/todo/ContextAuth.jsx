import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState()

    function login(username, password){
        if (username ==='in28minutes' && password==='in28minutes'){
            setAuthenticated(true)
            setUsername(username)
            return true
        }else{
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
    }


    return (
        <AuthContext.Provider value = { {username, isAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}