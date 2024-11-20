import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ConfettiContext from '../../../../context/ConfettiContext';
import apiLink from '../../../../helpers/apiLink';
import Loader from '../../../Loader/Loader';

const ComponenteResumen = ({ejerciciosCorrectos,cantidadCorrectos,setCantidadCorrectos}) => {

  const [nuevoPuntaje,setNuevoPuntaje]=useState(0);
  const [antiguoPuntaje,setAntiguoPuntaje]=useState(0)
  const [puntajesTotales,setPuntajesTotales]=useState()
  const [loader,setLoader]=useState(null)
  const [rachaCreada,setRachaCreadea]=useState(null)
  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)

  const url=useParams()

  const obtenerDatosAntiguos=async()=>{
    setLoader(true)
    try{
      let resToken=await fetch(`${apiLink}/login/token`,{
        method:"POST",
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      //Obtener el viejo puntaje
      let jsonToken=await resToken.json()
      let res=await fetch(`${apiLink}/scores/${jsonToken.decoded.id}/${url.id}/${url.ejercicio}`,{
        method:"GET",
        headers:{"Content-type":"application/json",}
      })
      let json=await res.json()
      setAntiguoPuntaje(json.nivelEjercicio)
      let cantidadTrue=0;
      for(let i=0;i<ejerciciosCorrectos.length;i++){
        if(ejerciciosCorrectos[i]){
          cantidadTrue++
        }
      }
      //Colocar el nuevo puntaje
      setCantidadCorrectos(cantidadTrue)
      //Modificar este
      let rachaRes=await fetch(`${apiLink}/scores/${json.nivel_id}/${url.ejercicio}`,{
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          user_id:jsonToken.decoded.id,
          nuevoPuntaje:(cantidadTrue*25)})
      })
      let rachaJson=await rachaRes.json()
      if(rachaJson.rachaCreada){
        setRachaCreadea(rachaJson.rachaCreada)
      }
      setNuevoPuntaje(cantidadTrue*25)

      //Obtener los puntajes totales
      let res3=await fetch(`${apiLink}/scores/${jsonToken.decoded.id}/${url.id}`,{
        method:"GET",
        headers:{"Content-type":"application/json",}
      })
      let json3=await res3.json()
      setPuntajesTotales(json3.nivelesEjercicio)

    }catch(err){
      console.log(err)
    }
    setLoader(false)
  }
  const devolverAprendizaje=()=>{
    let {central,conexiones,contexto,estructura,
      inferencias,significado,textuales
        }=puntajesTotales
        
    let average=Math.round((central+conexiones+contexto+estructura+inferencias+significado+textuales)/8)
    return average
  }
  const devolverBarraProgreso=()=>{
    return `${devolverAprendizaje()}%`
  }

  useEffect(() => {
    obtenerDatosAntiguos()
    return ()=>{
      setShowConfetti(false)
    }
  }, [])

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
    return Object.entries(puntajesTotales).map((el)=>{
      if(el[0]=="nivel_id") return
      if(el[1]==0){
        return <i className="fa-regular fa-square icono-niveles progreso-icono-vacio">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicio: {titulos[el[0]]}: {url.id}</h4>
              <span>Aprendizaje: Sin empezar</span>
            </div>
          </div>
        </i>
      }else if(el[1]==25){
        return <i className="fa-regular fa-star icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicio: {titulos[el[0]]}: {url.id}</h4>
              <span>Aprendizaje: Intentado</span>
            </div>
          </div>
        </i>
      }else if(el[1]==50){
        return <i className="fa-solid fa-star-half-stroke icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicio: {titulos[el[0]]}: {url.id}</h4>
              <span>Aprendizaje: Familiarizado</span>
            </div>
          </div>
        </i>
      }else if(el[1]==75){
        return <i className="fa-solid fa-star icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicio: {titulos[el[0]]}: {url.id}</h4>
              <span>Aprendizaje: Eficiente</span>
            </div>
          </div>
        </i>
      }else{
        return <i className="fa-solid fa-star icono-niveles progreso-icono-completo">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicio: {titulos[el[0]]}: {url.id}</h4>
              <span>Aprendizaje: Masterizado</span>
            </div>
          </div>
        </i>
      }
    })
  }
  const devolverMensajes=()=>{
    if(nuevoPuntaje==100){
      return <h3>🔥 Felicidades! Hiciste un puntaje perfecto 📚</h3>
    }else if(nuevoPuntaje==75){
      return <h3>Felicidades! Has hecho un buen puntaje 📚</h3>
    }else if(nuevoPuntaje<=50){
      return <h3>Sigue practicando! Puedes hacer un mejor puntaje 📚</h3>
    }
  }
  return (
    <>
    {loader?
    <Loader/>
      :<div className="resumen-componente-container">
      {/*<div class="racha-container">
          <div class="background-fill"></div>
          <div class="text">
            ¡Felicidades! Extendiste tu racha
            <br />
            <span>1 día de racha <span class="fire-icon">🔥</span></span>
          </div>
        </div>*/}
      <div className="puntajes-generales-container">
        <div className="puntajes-progreso-container">
          <span><b>Aprendizaje de unidad: {puntajesTotales && devolverAprendizaje() }%</b></span>
          <span className="puntajes-separator">|</span>
          <div className="puntajes-barra-progreso">
            {puntajesTotales&&<div style={{width:devolverBarraProgreso()}} className="puntajes-progreso-realizado"></div>}
          </div>
        </div>
        <div className="iconos-container">
          {puntajesTotales&&devolverIconos()}
        </div>
      </div>

      <div className="puntajes-seccion-container">
        {devolverMensajes()}
        
        <span className="puntajes-span last-span ">{cantidadCorrectos}/4 ejercicios correctos | {cantidadCorrectos*25}% realizado</span>
      </div>
      
    </div>}
    </>
  )
}

export default ComponenteResumen