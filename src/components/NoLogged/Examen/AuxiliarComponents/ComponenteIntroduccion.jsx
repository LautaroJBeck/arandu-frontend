import React from 'react'
import cap from "../../../../assets/imgs/book.png"
const ComponenteIntroduccion = () => {
  return (
      <div className="puntajes-seccion-container">
        <div>
          <h3>¿Estás preparado para el examen evaluatorio? 📚📖</h3>
          <span className="puntajes-span">Evalúa tu nivel de lectura para obtener puntos de maestría y poder detectar tus debilidades</span>
          <span className='tiempo-span'>18 preguntas • 15 - 25 minutos</span>
        </div>
        <div>
          <img loading="lazy" src={cap} alt="Gorra de graduación" />
        </div>
      </div>
  )
}

export default ComponenteIntroduccion