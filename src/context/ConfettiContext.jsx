import { createContext, useState } from "react";

const ConfettiContext=createContext()

const ConfettiProvider=({children})=>{
    const [showConfetti,setShowConfetti]=useState(null)

    const data={showConfetti,setShowConfetti}
    return(
        <ConfettiContext.Provider value={data}>
            {children}
        </ConfettiContext.Provider>
    )
}
export {ConfettiProvider}
export default ConfettiContext