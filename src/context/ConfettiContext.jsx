import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

const ConfettiContext=createContext()

const ConfettiProvider=({children})=>{
    const [showConfetti,setShowConfetti]=useState(false)

    const url=useParams()
    const data={showConfetti,setShowConfetti}
    return(
        <ConfettiContext.Provider value={data}>
            {children}
        </ConfettiContext.Provider>
    )
}
export {ConfettiProvider}
export default ConfettiContext