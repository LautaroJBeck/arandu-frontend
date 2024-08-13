import React,{useEffect} from 'react'

const EjerciciosHeader = ({url}) => {
    const objetosMap={
        contexto:"Palabras en contexto",
        significado:"Reconocimiento del significado",
        central:"Ideas centrales y detalles",
        conexiones:"Conexiones y conflictos entre textos",
        estructura:"Estructura del texto y propósito",
        inferencias:"Inferencias",
        textuales:"Evidencias textuales",
        numericas:"Evidencias numéricas"
      }
      useEffect(() => {
        document.title=`${objetosMap[url.ejercicio]} - ${url.id} | Arandu`
      }, [url])
      
  return (
    <div className='ejercicios-header'>
        <h3 className="ejercicios-header-titulo">{objetosMap[url.ejercicio]}</h3>
    </div>
  )
}

export default EjerciciosHeader