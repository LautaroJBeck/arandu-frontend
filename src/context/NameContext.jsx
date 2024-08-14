import { createContext, useState } from "react";

const NameContext=createContext()

const NameProvider=({children})=>{
    const [name,setName]=useState("")

    const data={name,setName}
    return(
        <NameContext.Provider value={data}>
            {children}
        </NameContext.Provider>
    )
}
export {NameProvider}
export default NameContext