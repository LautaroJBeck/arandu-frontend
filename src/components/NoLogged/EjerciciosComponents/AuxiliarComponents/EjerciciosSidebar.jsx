import React, { useState } from 'react'
import imagenLibro from "../../../../assets/imgs/libro.jpg"
import { Link } from 'react-router-dom'
const EjerciciosSidebar = ({url}) => {

  const [currentLink,setCurrentLink ] = useState(url.tipo)
  const handleRuta=(tipo)=>{
      setCurrentLink(tipo);
      window.scrollTo(0,0)
  }
  const devolverTitulo=()=>{
    const objetosMap={
      contexto:"Palabras en contexto",
      significado:"Reconocimiento del significado",
      central:"Ideas centrales y detalles",
      conexiones:"Conexiones y conflictos entre textos",
      estructura:"Estructura del texto y propósito",
      inferencias:"Inferencias",
      textuales:"Evidencias textuales",
    }
    return objetosMap[url.ejercicio]
  }
  return (
    <aside className="sidebar-container">
        <div className="sidebar-container2">
        <div className="description-container">
            <div className='description-container-image'>
                <img loading="lazy" src={imagenLibro} alt="Libros" />
            </div>
            <div className='description-container-letters'>
                <h4>Comprensión Lectora</h4>
                <p>Mejora tus habilidades de lectura!</p>
            </div>
        </div>
        <div className="buttons-container">
            <Link onClick={()=>handleRuta("aprender")} to={`/lectura/${url.id}/aprender/${url.ejercicio}`} className={`buttons-units ${currentLink=="aprender"?"selected":""}`}>
                <span className='unidad-span'>Unidad 1</span>
                <span className='title-span'>{`${devolverTitulo()} - lección`}</span>
            </Link>
            <Link onClick={()=>handleRuta("practicar")} to={`/lectura/${url.id}/practicar/${url.ejercicio}`} className={`buttons-units ${currentLink=="practicar"?"selected":""}`}>
                <span className='unidad-span'>Unidad 2</span>
                <span className='title-span'>{`${devolverTitulo()}: ${url.id}`}</span>
            </Link>
        </div>
        </div>
    </aside>
  )
}

export default EjerciciosSidebar