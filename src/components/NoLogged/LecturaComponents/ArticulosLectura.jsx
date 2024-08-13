import React from 'react'
import "./ArticulosLectura.css"
import VistaFundamentos from './VistasLectura/VistaFundamentos'
import VistaNiveles from './VistasLectura/VistaNiveles'
const ArticulosLectura = ({url}) => {


    const handleRutas=()=>{
      if(url=="fundamentos"){
        return <VistaFundamentos/>
      }else if(url=="basico"){
        return <VistaNiveles url={url}/>      
      }else if(url=="medio"){
        return <VistaNiveles url={url}/>        
      }else if(url="avanzado"){
        return <VistaNiveles url={url}/>        
      }  
    }
  return (
    <article>
      {handleRutas()}
    </article>
  )
}

export default ArticulosLectura