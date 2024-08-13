import { createContext, useEffect, useState } from "react";

const LoginContext=createContext()

const initialData=false

const LoginProvider=({children})=>{
    const [logged,setLogged]=useState(initialData)
    useEffect(() => {
        if(localStorage.getItem("token")){
            setLogged(true)
        }else{
            setLogged(false)
        }
    }, []) 
    const data={logged,setLogged}

    return(
    <LoginContext.Provider value={data}>
        {children}
    </LoginContext.Provider>
)
}

export {LoginProvider}
export default LoginContext