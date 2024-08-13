import React, { useContext, useEffect, useState} from 'react'
import HabilidadComponent from '../AuxiliarComponents/HabilidadComponent'
import "./VistaNiveles.css"
import { Link } from 'react-router-dom'
import LoginContext from '../../../../context/LoginContext'
import ScoreContext from '../../../../context/ScoreContext'
import apiLink from '../../../../helpers/apiLink'
import Loader from '../../../Loader/Loader'
const VistaNiveles = ({url}) => {

    const {logged,setLogged}=useContext(LoginContext)
    const {score,setScore}=useContext(ScoreContext)
    const [loader,setLoader]=useState(null)

    useEffect(() => {
        const funcionEjecutar=async()=>{
            setLoader(true)
          if(localStorage.getItem("token")){
            try{
              let resToken=await fetch(`${apiLink}/login/token`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json",
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              })
              let jsonToken=await resToken.json()
              console.log(jsonToken)
              let res=await fetch(`${apiLink}/scores/${jsonToken.decoded.id}`,{
                  method:"GET",
                  headers:{"Content-type":"application/json",},
              })
              let json=await res.json();
              if(!json.hasOwnProperty("basico")){
                localStorage.removeItem("token")
              }
              console.log(json)
              setLogged(jsonToken.decoded)
              setScore(json)
            }catch(err){
              console.log(err)
            }
          }else{
  
          }
          setLoader(false)
      }
      funcionEjecutar()
      }, [])
    const handleTitle=()=>{
        if(url=="basico"){
            return "Unidad 2: Nivel básico de la comprensión lectora"
        }else if(url=="medio"){
            return "Unidad 3: Nivel medio de la comprensión lectora"
        }else{
            return "Unidad 4: Nivel avanzado de la comprensión lectora"
        }
    }
    useEffect(() => {
        document.title=`${handleTitle()} | Arandu`
    }, [url])
    
    const devolverAprendizaje=()=>{
        if(score){
            console.log(score)
            let {central,conexiones,contexto,estructura,
                inferencias,significado,textuales
            }=score[url]
            let average=Math.round((central+conexiones+contexto+estructura+inferencias+significado+textuales)/8)
            return average
        }
    }
    const devolverBarraProgreso=()=>{
        return `${devolverAprendizaje()}%`
    }
    const handleRedirect=(el)=>{
        window.location.href=`/lectura/${url}/practicar/${el[0]}`
        console.log(el,url)
    }
    const devolverIconos=()=>{
        let titulos={
            contexto:"Palabras en contexto",
            significado:"Reconocimiento del significado",
            central:"Ideas centrales y detalles",
            conexiones:"Conexiones y conflictos entre textos",
            estructura:"Estructura del texto y propósito",
            inferencias:"Inferencias",
            textuales:"Evidencias textuales"
        }

        return Object.entries(score[url]).map((el)=>{
            if(el[0]=="nivel_id") return 
            if(el[1]==0){
              return <i 
              onClick={()=>handleRedirect(el)}
              className="fa-regular fa-square icono-niveles progreso-icono-vacio">
                <div className="icon-submenu-flecha">
                    <div className="icon-submenu">
                        <h4>Ejercicio: {titulos[el[0]]}: {url}</h4>
                        <span>Aprendizaje: Sin empezar</span>
                    </div>
                </div>
              </i>
            }else if(el[1]==25){
              return <i 
              onClick={()=>handleRedirect(el)}
              className="fa-regular fa-star icono-niveles progreso-icono-semicompleto">
                <div className="icon-submenu-flecha">
                    <div className="icon-submenu">
                        <h4>Ejercicio: {titulos[el[0]]}: {url}</h4>
                        <span>Aprendizaje: Intentado</span>
                    </div>
                </div>
              </i>
            }else if(el[1]==50){
              return <i 
              onClick={()=>handleRedirect(el)}
              className="fa-solid fa-star-half-stroke icono-niveles progreso-icono-semicompleto">
                <div className="icon-submenu-flecha">
                    <div className="icon-submenu">
                        <h4>Ejercicio: {titulos[el[0]]}: {url}</h4>
                        <span>Aprendizaje: Familiarizado</span>
                    </div>
                </div>
              </i>
            }else if(el[1]==75){
              return <i 
              onClick={()=>handleRedirect(el)}
              className="fa-solid fa-star icono-niveles progreso-icono-semicompleto">
                <div className="icon-submenu-flecha">
                    <div className="icon-submenu">
                        <h4>Ejercicio: {titulos[el[0]]}: {url}</h4>
                        <span>Aprendizaje: Eficiente</span>
                    </div>
                </div>
              </i>
            }else{
              return <i 
              onClick={()=>handleRedirect(el)}
              className="fa-solid fa-star icono-niveles progreso-icono-completo">
                <div className="icon-submenu-flecha">
                    <div className="icon-submenu">
                        <h4>Ejercicio: {titulos[el[0]]}: {url}</h4>
                        <span>Aprendizaje: Masterizado</span>
                    </div>
                </div>
              </i>
            }
          })
    }
    
  return (
   <>
   { loader?<div className='loader-container'><Loader/></div>:<div className="niveles-container">
        <div className="nivel-informacion-container">
            <div className='mostrar-responsive'>
                
            </div>
            <h1>{handleTitle()}</h1>
            <div className="progress-container">
                {score&&logged?<>
                   {score?<span><b>Aprendizaje de unidad: {devolverAprendizaje()}%</b></span>:<></>} 
                    <div className="barra-progreso">
                        <div style={{width:devolverBarraProgreso()}}
                        className="progreso-realizado"></div>
                    </div>
                </>:
                <>
                    <Link to="/registro">Registrate para guardar tu progreso!</Link>
                </>
                }
            </div>
            {logged&&<div className="niveles-explanation">
            <span className="niveles-explanation-title"><b>Niveles de aprendizaje:</b></span>   
            <div className="logos-explanation">
                <div className="logos-contenedor logos-100">
                    <i className="fa-solid fa-star progreso-icono-completo"></i>
                    <span>Masterizado</span>
                </div>
                <div className="logos-contenedor logos-75">
                    <i className="fa-solid fa-star progreso-icono-semicompleto"></i>
                    <span>Eficiente</span>
                </div>
                <div className="logos-contenedor logos-50">
                    <i className="fa-solid fa-star-half-stroke progreso-icono-semicompleto"></i>
                    <span>Familiarizado</span>
                </div>
                <div className="logos-contenedor logos-25">
                    <i className="fa-regular fa-star progreso-icono-semicompleto"></i>
                    <span>Intentado</span>
                </div>
                <div className="logos-contenedor logos-0">
                    <i className="fa-regular fa-square progreso-icono-vacio"></i>
                    <span>Sin puntaje</span>
                </div>
            </div> 
            <div className="niveles-unidad">
                {score&&devolverIconos()}
            </div>
            </div>
            }       
        </div>
        <div className='examen-unidad-container'>
            <div>
                <h4>Examen de unidad: {url}</h4>
                <p>Prueba tus capacidades de comprensión lectora en el nivel {url}</p>
                {logged?<Link to={`/examen/${url}`}>Empezar examen de unidad</Link>:<Link to={"/registro"}>Registrate para tomar un examen!</Link>}
            </div>
            <div>
            </div>
        </div>
        <div className="cursos-container">
            <div className="cursos-decodificacion-container curso-container">
                <h2>Ejercicos de decodificación</h2>
                <HabilidadComponent nivel={url} tipo="contexto" titulo="Palabras en contexto"/>
                <HabilidadComponent nivel={url} tipo="significado" titulo="Reconocimiento del significado"/>
            </div>
            <div className="cursos-literal-container curso-container">
                <h2>Ejercicos de comprensión literal</h2>
                <HabilidadComponent nivel={url} tipo="central" titulo="Ideas centrales y detalles"/>
                <HabilidadComponent nivel={url} tipo="conexiones" titulo="Conexiones y conflictos entre textos"/>
                <HabilidadComponent nivel={url} tipo="estructura" titulo="Estructura del texto y propósito"/>
            </div>
            <div className="cursos-inferencial-container curso-container">
                <h2>Ejercicos de comprensión inferencial</h2>
                <HabilidadComponent nivel={url} tipo="inferencias" titulo="Inferencias"/>
                <HabilidadComponent nivel={url} tipo="textuales" titulo="Evidencias textuales"/>
            </div>

        </div>
    </div>}
    </>
  )
}

export default VistaNiveles