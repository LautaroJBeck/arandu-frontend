import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import ConfettiContext from '../../../../context/ConfettiContext'

const ExamenFooter = ({selectedOption,checkEjercicio,respuestaCorrectaEncontrada,saltarEjercicio,
    numeroEjercicio,ejerciciosCorrectos,resetEjercicios,mostrarTodosEjercicios,skipHabilitado,
    showIntroduccion,setShowIntroduccion
}) => {
  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)



  return (
    <div className="ejercicios-form">
        <div className="orden-ejercicios">
            <button>
                <i 
                onClick={()=>resetEjercicios()}
                className="repetir-icon fa-solid fa-rotate-right"></i>
            </button>
            <span>Resuelve 18 problemas</span>
            <div className='examen-circles-container'>
            <div className="circles-container examen-circles-container">
                {ejerciciosCorrectos&&ejerciciosCorrectos.map((el,index)=>(
                    <>
                    
                    {el?
                    <div key={index} className={`circle circle-right`}></div>:
                    numeroEjercicio<=index?
                    <div key={index} className={`circle ${numeroEjercicio==index?"selected-circle":""}`}></div>:
                    <div key={index} className={`circle circle-wrong`}></div>
                    
                    }
                    </>
                ))}
            </div>
            </div>
        </div>
        <div className="controlar-ejercicios">
      {showIntroduccion?
      <button
      className="ejercicios-redirigir-menu"
      onClick={()=>setShowIntroduccion(false)}>Empezar examen</button>:
      numeroEjercicio<18 ? (
        <>
          {skipHabilitado ? (
            <button 
              onClick={mostrarTodosEjercicios}
              className="ejercicios-saltear-container">
              Saltear ejercicio
            </button>
          ) : (
            <button 
              onClick={mostrarTodosEjercicios}
              className="ejercicios-saltear-container ejercicios-saltear-container-no-habilitado">
              Saltear ejercicio
            </button>
          )}
          {respuestaCorrectaEncontrada ? (
            <button 
              onClick={saltarEjercicio}
              className="ejercicios-siguiente-pregunta">
              Siguiente pregunta
            </button>
          ) : (
            <button 
              onClick={checkEjercicio}
              className={`ejercicios-comprobar-container ${selectedOption !== 0 ? "ejercicios-comprobar-container-active" : ""}`}>
              Comprobar
            </button>
          )}
        </>
      ) : (
        <Link 
        onClick={()=>setShowConfetti(false)}
        to={`/lectura/basico`} className="ejercicios-redirigir-menu">Volver al menú</Link>
      )}
    </div>
    </div>
  )
}

export default ExamenFooter