import React, { useEffect, useState } from 'react'
import "./LecturaSideBar.css"
import imagenLibro from "../../../assets/imgs/libro.jpg"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LoginContext from '../../../context/LoginContext'
const LecturaSideBar = ({url}) => {
    const [currentLink,setCurrentLink ] = useState(url)
    const handleRuta=(tipo)=>{
        setCurrentLink(tipo);
        window.scrollTo(0,0)
    }
    const {logged,setLogged}=useContext(LoginContext);

    useEffect(() => {
        handleRuta(url)
    }, [url])
    
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
            <Link to="/lectura/fundamentos" className={`buttons-units ${currentLink=="fundamentos"?"selected":""}`}>
                <span className='unidad-span'>Unidad 1</span>
                <span className='title-span'>Fundamentos de la comprensión lectora</span>
            </Link>
            <Link to="/lectura/basico" className={`buttons-units ${currentLink=="basico"?"selected":""}`}>
                <span className='unidad-span'>Unidad 2</span>
                <span className='title-span'>Nivel básico (Segundo ciclo)</span>
            </Link>
            <Link to="/lectura/medio" className={`buttons-units ${currentLink=="medio"?"selected":""}`}>
                <span className='unidad-span'>Unidad 3</span>
                <span className='title-span'>Nivel medio (Tercer ciclo)</span>
            </Link>
            <Link to="/lectura/avanzado" className={`buttons-units ${currentLink=="avanzado"?"selected":""}`}>
                <span className='unidad-span'>Unidad 4</span>
                <span className='title-span'>Nivel avanzado (Educación media)</span>
            </Link>
        </div>
        <div className='test-container'>
            <span>
                <i className="fa-solid fa-book"></i>
                <b>Examen general de lectura comprensiva </b>   
            </span>
            <p>Pon a prueba tu nivel de lectura comprensiva con este examen!</p>
            {logged?<Link to="/examen/general">Tomar examen</Link>:<Link to="/registro">Registrarse para tomar examen</Link>}
        </div>
        </div>
    </aside>
  )
}

export default LecturaSideBar