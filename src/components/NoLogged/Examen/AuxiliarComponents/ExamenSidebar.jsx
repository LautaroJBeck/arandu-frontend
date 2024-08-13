import React from 'react'
import imagenLibro from "../../../../assets/imgs/libro.jpg"
import { Link } from 'react-router-dom'
const ExamenSidebar = () => {
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
            <Link className={`buttons-units-examen selected`}>
            {/*onClick={()=>handleRuta("aprender")} to={`/lectura/${url.id}/aprender/${url.ejercicio}`} className={`buttons-units ${currentLink=="aprender"?"selected":""}`}*/}
                <span className='unidad-span'>Examen evaluativo</span>
                <span className='title-span'>{`Prueba tus habilidades de comprensión lectora`}</span>
            </Link>
        </div>
        </div>
    </aside>
  )
}

export default ExamenSidebar