import { createContext, useEffect, useState } from "react";

const ScoreContext=createContext()

const initialData={
    basico:{},
    medio:{},
    avanzado:{}
}

const ScoreProvider=({children})=>{
    const [score,setScore]=useState(initialData)

    const data={score,setScore}

    return(
    <ScoreContext.Provider value={data}>
        {children}
    </ScoreContext.Provider>
)
}

export {ScoreProvider}
export default ScoreContext