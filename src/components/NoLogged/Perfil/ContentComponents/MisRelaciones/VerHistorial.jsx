import React, { useEffect, useState } from 'react'
import nombreApellido from '../../../../../helpers/nombreApellido'
import Loader from '../../../../Loader/Loader';
import apiLink from '../../../../../helpers/apiLink';
import RachaComponent from '../RachaComponent';

const VerHistorial = ({nombre,apellido,id,setVerHistorial}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loader,setLoader]=useState(null)
    const [rachas,setRachas]=useState(null)
    useEffect(() => {
        document.title="Mi Actividad | Arandu"
        const peticion=async()=>{
            setLoader(true)
              let resRachas=await fetch(`${apiLink}/rachas/largo/${id}`,{
                method:"GET",
                headers:{"Content-type":"application/json",}
              })
              let jsonRachas=await resRachas.json()
              setRachas(jsonRachas)
            setLoader(false)
        }
        peticion()
    }, [])
    const totalSlides = 11; // Número total de calendarios

    const handlePrev = () => {
        if (currentSlide < totalSlides) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handleNext = () => {
        if (currentSlide > 0 ) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    return (
    <>
    <h4 className='titulo-examenes'>Historial de {nombreApellido(nombre,apellido)}</h4>
    {!rachas?<Loader/>:
            <>
            <p className='explanation-p'>Los días con contornos <b style={{color:"var(--fondo-racha-on)"}}>naranjas</b> son aquellos en los que el alumno mantuvo una racha</p>
            <div className="calendars-container">
                <div className="calendars-navigation-bar">
                    <button className="nav-btn" onClick={handlePrev}>
                        <svg
                            width="9"
                            height="14"
                            viewBox="0 0 9 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.94967 11.9497L1.99992 7L6.94967 2.05025"
                                stroke="#AFAFAF"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button className="nav-btn" onClick={handleNext}>
                        <svg
                            width="9"
                            height="14"
                            viewBox="0 0 9 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.94975 11.9497L6.89949 7L1.94975 2.05025"
                                stroke="#AFAFAF"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="slider-content"
                    style={{ transform: `translateX(${currentSlide * 100}%)` }}
                >
                    <RachaComponent rachas={rachas}/>
                </div>
            </div>
            <div className='button-changes-container'>
                <button 
                onClick={()=>setVerHistorial({mostrar:false,id:null,nombre:"",apellido:""})}
                className='button-changes changes-active'>Volver</button>
            </div>
            </>
            }
    </>
  )
}

export default VerHistorial