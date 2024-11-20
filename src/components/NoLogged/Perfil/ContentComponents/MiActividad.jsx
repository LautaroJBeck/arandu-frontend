import React, { useEffect, useState } from 'react';
import RachaComponent from './RachaComponent';
import apiLink from '../../../../helpers/apiLink';
import Loader from '../../../Loader/Loader';

const MiActividad = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loader,setLoader]=useState(null)
    const [rachas,setRachas]=useState(null)
    useEffect(() => {
        document.title="Mi Actividad | Arandu"
        const peticion=async()=>{
            setLoader(true)
            let resToken=await fetch(`${apiLink}/login/token`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json",
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              })
              let jsonToken=await resToken.json()
              let resRachas=await fetch(`${apiLink}/rachas/largo/${jsonToken.decoded.id}`,{
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
            <label htmlFor="">Historial de rachas</label>
            {!rachas?<Loader/>:
            <>
            <p className='explanation-p'>Los días con contornos <b style={{color:"var(--fondo-racha-on)"}}>naranjas</b> son aquellos en los que mantuviste una racha</p>
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
            </>
            }
            
        </>
    );
};

export default MiActividad;
