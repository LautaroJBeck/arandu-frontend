import React, {useContext, useEffect, useState } from 'react'
import ConfettiContext from '../../../../context/ConfettiContext'
import Loader from "../../../Loader/Loader.jsx"
import apiLink from '../../../../helpers/apiLink.js'

const ComponenteResumen = ({ejerciciosCorrectos,cantidadCorrectos,setCantidadCorrectos,ejerciciosData,url}) => {

  const [puntajes,setPuntajes]=useState()
  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)
  const [loader,setLoader]=useState(null)
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
        let jsonToken=await resToken.json()
        //Obtener cantidad de correctos
        let cantidadTrue=0;
        for(let i=0;i<ejerciciosCorrectos.length;i++){
          if(ejerciciosCorrectos[i]){
            cantidadTrue++
          }
        } 
        setCantidadCorrectos(cantidadTrue)
        if(url=="general"){
          // Preparar datos para mandarlos
          const estructurarParaApi=(datos, respuestas)=>{
            return respuestas.map((el,index)=>{
              return [el,datos[index].nivel,datos[index].tipo]
            })
          }
          const peticion=estructurarParaApi(ejerciciosData,ejerciciosCorrectos)
          const resExamen=await fetch(`${apiLink}/examen`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({total:cantidadTrue,user_id:jsonToken.decoded.id,data:peticion,nivel:url})
          })
          const jsonExamen=await resExamen.json()
          console.log(jsonExamen)
          if(jsonExamen.puntajes){
            setPuntajes(jsonExamen.puntajes)
          }
        }else{
          const estructurarParaApi=(datos,respuestas)=>{
            return respuestas.map((el,index)=>{
              return [el,datos[index].tipo]
            })
          }
          const peticion=estructurarParaApi(ejerciciosData,ejerciciosCorrectos)
          const resExamen=await fetch(`${apiLink}/examen/${url}`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({total:cantidadTrue,user_id:jsonToken.decoded.id,data:peticion,nivel:url})
          })
          const jsonExamen=await resExamen.json()
          console.log(jsonExamen)
          if(jsonExamen.puntajes){
            setPuntajes(jsonExamen.puntajes)
          }else{
          }
         
          
        }
      }catch(err){
        console.log(err)
      }
      setLoader(false)

  }
  const devolverBarraProgreso=()=>{

    return `${cantidadCorrectos/18*100}%`
  }
  const devolverIconosGeneral=()=>{
    let finalArray=[]
    Object.entries(puntajes).map(objeto=>{
      Object.entries(objeto[1]).map(nivel=>{
        let unidad=objeto[0]
        let level=nivel[0]
        let puntaje=nivel[1]
        finalArray.push([unidad,level,puntaje])
      })
    })
    function capitalizar(str) {
      if(str=="inferencial"||str=="literal"){
        return `Comprensión ${str.charAt(0).toUpperCase() + str.slice(1)}`;
      }else{
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
    
    return finalArray.map(el=>{
      if(el[2]==0){
        return <i className="fa-regular fa-square icono-niveles progreso-icono-vacio">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(el[0])}, Nivel {capitalizar(el[1])}</h4>
              <span>Puntaje realizado: 0/2</span>
            </div>
          </div>
        </i>
      }else if(el[2]==1){
        return <i className="fa-solid fa-star icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(el[0])}, Nivel {capitalizar(el[1])}</h4>
              <span>Puntaje realizado: 1/2</span>
            </div>
          </div>
        </i>
      }else{
        return <i className="fa-solid fa-star icono-niveles progreso-icono-completo">
        <div className="icon-submenu-flecha">
          <div className="icon-submenu">
          <h4>Ejercicios de {capitalizar(el[0])}, Nivel {capitalizar(el[1])}</h4>
          <span>Puntaje realizado: 2/2</span>
          </div>
        </div>
      </i>
      }
    })
  }
  const devolverIconosUnidad=()=>{
    function capitalizar(str) {
      if(str=="inferencial"||str=="literal"){
        return `Comprensión ${str.charAt(0).toUpperCase() + str.slice(1)}`;
      }else{
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
    return Object.entries(puntajes).map(objeto=>{
      // 0 
      // 1 2
      // 3 4 
      // 5
      // 6  
        if(objeto[1]==0){
          return <i className="fa-regular fa-square icono-niveles progreso-icono-vacio">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(objeto[0])}</h4>
              <span>Puntaje realizado: {objeto[1]}/6</span>
            </div>
          </div>
        </i>
        }else if(objeto[1]<3){
          return <i className="fa-regular fa-star icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(objeto[0])}</h4>
              <span>Puntaje realizado: {objeto[1]}/6</span>
            </div>
          </div>
        </i>
        }else if(objeto[1]<5){
          return <i className="fa-solid fa-star-half-stroke icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(objeto[0])}</h4>
              <span>Puntaje realizado: {objeto[1]}/6</span>
            </div>
          </div>
        </i>
        }else if(objeto[1]==5){
          return <i className="fa-solid fa-star icono-niveles progreso-icono-semicompleto">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(objeto[0])}</h4>
              <span>Puntaje realizado: {objeto[1]}/6</span>
            </div>
          </div>
        </i>
        }else{
          return <i className="a-solid fa-star icono-niveles progreso-icono-completo">
          <div className="icon-submenu-flecha">
            <div className="icon-submenu">
              <h4>Ejercicios de {capitalizar(objeto[0])}</h4>
              <span>Puntaje realizado: {objeto[1]}/6</span>
            </div>
          </div>
        </i>
        }
    })
  }
  const devolverIconos=()=>{
    if(url=="general"){
      return devolverIconosGeneral()
    }else{
      return devolverIconosUnidad()
    }
  }
  useEffect(() => {
    obtenerDatosAntiguos()
    return ()=>{
      setShowConfetti(false)
    }
  }, [])

  const devolverMensajes=()=>{
    if(cantidadCorrectos==18){
      return <h3>🔥 Felicidades! Hiciste un puntaje perfecto 📚</h3>
    }else if(cantidadCorrectos>=13){ 
      return <h3>Felicidades! Has hecho un buen puntaje 📚</h3>
    }else if(cantidadCorrectos<13){
      return <h3>Sigue practicando! Puedes hacer un mejor puntaje 📚</h3>
    }
  }
  return (
    <>
    {
      loader?
      <Loader/>
      :    <div className="resumen-componente-container">
      <div className="puntajes-generales-container">
        <div className="puntajes-progreso-container">
          <span><b>Total realizado: {Math.round((cantidadCorrectos/18)*100)}%</b></span>
          <span className="puntajes-separator">|</span>
          <div className="puntajes-barra-progreso">
            <div style={{width:devolverBarraProgreso()}} className="puntajes-progreso-realizado"></div>
          </div>
        </div>
        <div className="iconos-container">
          {puntajes&&devolverIconos()}
        </div>
      </div>
      <div className="puntajes-seccion-container">
        {devolverMensajes()}
        <span className="puntajes-span">Para analizar tus examenes en detalle, dirigete a Mi Aprendizaje</span>
        <span className="puntajes-span last-span ">{cantidadCorrectos}/18 ejercicios correctos | {Math.round((cantidadCorrectos/18)*100)}% realizado</span>
      </div>
    </div>
    }
</>
  )
}

export default ComponenteResumen