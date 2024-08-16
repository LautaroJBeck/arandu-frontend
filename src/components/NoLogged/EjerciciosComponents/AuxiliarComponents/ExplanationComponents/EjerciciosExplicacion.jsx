import React from 'react'
import PalabrasContexto from './PalabrasContexto'
import { useParams } from 'react-router-dom'
import IdeasCentrales from './IdeasCentrales'
import ConexionesConflictos from './ConexionesConflictos'

const EjerciciosExplicacion = () => {
    const {ejercicio}=useParams()
    const handleContent=()=>{
        if(ejercicio=="contexto"){
            return <PalabrasContexto/>
        }else if(ejercicio=="significado"){
            return <></>
        }else if(ejercicio=="central"){
            return <IdeasCentrales/>
        }else if(ejercicio=="conexiones"){
            return <ConexionesConflictos/>
        }
    }
  return (
    <div className='explicacion-container'>
        {handleContent()}
    </div>
  )
}

export default EjerciciosExplicacion