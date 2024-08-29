import React from 'react'
import PalabrasContexto from './PalabrasContexto'
import { useParams } from 'react-router-dom'
import IdeasCentrales from './IdeasCentrales'
import ConexionesConflictos from './ConexionesConflictos'
import EstructuraTexto from './EstructuraTexto'
import Inferencias from './Inferencias'
import ReconocimientoSignificado from './ReconocimientoSignificado'
import EvidenciasTextuales from './EvidenciasTextuales'

const EjerciciosExplicacion = () => {
    const {ejercicio}=useParams()
    const handleContent=()=>{
        if(ejercicio=="contexto"){
            return <PalabrasContexto/>
        }else if(ejercicio=="significado"){
            return <ReconocimientoSignificado/>
        }else if(ejercicio=="central"){
            return <IdeasCentrales/>
        }else if(ejercicio=="conexiones"){
            return <ConexionesConflictos/>
        }else if(ejercicio=="estructura"){
            return <EstructuraTexto/>
        }else if(ejercicio=="inferencias"){
            return <Inferencias/>
        }else if(ejercicio=="textuales"){
            return <EvidenciasTextuales/>
        }
    }
  return (
    <div className='explicacion-container'>
        {handleContent()}
    </div>
  )
}

export default EjerciciosExplicacion