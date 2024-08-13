import { createContext, useState } from "react";

const LoginValueContext=createContext()


const LoginValueProvider=({children})=>{
    const [loggedValue,setLoggedValue]=useState({})

    const data={loggedValue,setLoggedValue}
    return(
        <LoginValueContext.Provider value={data}>
            {children}
        </LoginValueContext.Provider>
    )
}
export {LoginValueProvider}
export default LoginValueContext