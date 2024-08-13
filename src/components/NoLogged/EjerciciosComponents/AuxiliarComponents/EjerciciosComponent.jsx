import React, { useContext, useEffect, useState } from 'react'
import ComponenteEjercicio from './ComponenteEjercicio'
import EjercicioFooter from './EjercicioFooter'
import ComponenteResumen from './ComponenteResumen'
import correctAudio from "../../../../assets/audios/correct-excercise.mp3"
import ConfettiContext from '../../../../context/ConfettiContext'
import Loader from "../../../Loader/Loader.jsx"
import finalAudio from "../../../../assets/audios/completed-excercise.mp3"
import apiLink from '../../../../helpers/apiLink.js'

const EjerciciosComponent = ({url,setShowCorrectModal,setShowIncorrectModal,authorizeNext,
  setShowWarningModal
}) => {
  const [selectedOption, setSelectedOption] = useState(0)
  const [ejerciciosData,setEjerciciosData]=useState()
  const [numeroEjercicio,setNumeroEjercicio]=useState(0)
  const [respuestaCorrectaEncontrada,setRespuestaCorrectaEncontrada]=useState(false)
  const [ejerciciosCorrectos,setEjerciciosCorrectos]=useState([false,false,false,false])
  const [contenidoLi,setContenidoLi]=useState([])
  const [firstTry,setFirstTry]=useState(true)
  const [skipHabilitado,setSkipHabilitado]=useState(true)
  const [cantidadCorrectos, setCantidadCorrectos] = useState(0)
  const [loader,setLoader]=useState(null)

  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)
  /* 
  Para show answers:
  0 significa oculto
  1 mostrado pero no marcado
  2 mostrado y marcado
  */
  
  const defaultAnswers={
    "1":0,
    "2":0,
    "3":0,
    "4":0
  }
  const [showAnswers,setShowAnswers]=useState(defaultAnswers)

  const handleCorrectModal=()=>{
    setShowCorrectModal(true)
    setTimeout(() => {
      setShowCorrectModal(false)
    }, 2000);
  }
  const handleIncorrectModal=()=>{
    setShowIncorrectModal(true)
    setTimeout(() => {
      setShowIncorrectModal(false)
    }, 2000);
  }

  const handleSelection=(numero)=>{
    setSelectedOption(numero)
  }

  const resetEjercicios=()=>{
    location.reload()
  }

  const saltarEjercicio=()=>{
    setShowCorrectModal(false)
    setSkipHabilitado(true)
    if(respuestaCorrectaEncontrada){
      setSelectedOption(0);
      setShowAnswers(defaultAnswers);
      setNumeroEjercicio(numeroEjercicio+1);
      setRespuestaCorrectaEncontrada(false)
      if(firstTry){
        

        const nuevaRespuesta=[...ejerciciosCorrectos];
        nuevaRespuesta[numeroEjercicio]=true
        setEjerciciosCorrectos(nuevaRespuesta)
      }
    }
    setFirstTry(true)
  }
  const mostrarTodosEjercicios=()=>{
    if(authorizeNext){
      if(!respuestaCorrectaEncontrada){
        setShowAnswers({
          "1":2,
          "2":2,
          "3":2,
          "4":2
        })
        setRespuestaCorrectaEncontrada(true)
        setFirstTry(false)
        setSkipHabilitado(false)
      }
    }else{
      setShowWarningModal(true)
    }
    }


  const checkEjercicio=()=>{
    if(selectedOption!==0){
      const selectedArray=contenidoLi.find(el=>el.index==(selectedOption-1));
      let clavesOcultas=[]
      for(let clave in showAnswers){
        const valor=showAnswers[clave]
        if(valor==0){
          clavesOcultas.push(clave)
        }
      }
      if(selectedArray.correcto){
        //Mostrar respuestas correctas
        let objetoTemplate={
          "1":2,
          "2":2,
          "3":2,
          "4":2
        }
        for(let i=0;i<clavesOcultas.length;i++){
          objetoTemplate[`${clavesOcultas[i]}`]=1
        }
        handleCorrectModal()
        new Audio(correctAudio).play()
        setShowAnswers(objetoTemplate)
        setRespuestaCorrectaEncontrada(true)
      }else{
        setFirstTry(false)
        handleIncorrectModal()
        setShowAnswers({
          ...showAnswers,
          [selectedArray.index+1]:2
        })
      }
    }
    setSelectedOption(0)
  }

  useEffect(() => {
    const peticionEjercicios=async()=>{
      setLoader(true)
      let res=await fetch(`${apiLink}/preguntas/${url.id}/${url.ejercicio}`,{
        method:"GET",
        headers:{"Content-type":"application/json",},
      })
      let json=await res.json()
      setEjerciciosData(json.listaPreguntas)
      setLoader(false)
    }
    peticionEjercicios()
  }, [])
  useEffect(() => {
    if(cantidadCorrectos>=3&&numeroEjercicio>=4){
      setShowConfetti(true)
      new Audio(finalAudio).play()
    }
  }, [numeroEjercicio,cantidadCorrectos])
  
  const showEjercicios=()=>{
    if(loader){
      return <Loader/>
    }else if(ejerciciosData&&numeroEjercicio<4){
      return(
        <ComponenteEjercicio
        handleSelection={handleSelection}
        selectedOption={selectedOption}
        ejerciciosData={ejerciciosData[numeroEjercicio]}
        showAnswers={showAnswers}
        contenidoLi={contenidoLi}
        setContenidoLi={setContenidoLi}
        
        />
      ) 
    }else if(numeroEjercicio>=4){
      return(
        <ComponenteResumen
        ejerciciosCorrectos={ejerciciosCorrectos}
        cantidadCorrectos={cantidadCorrectos}
        setCantidadCorrectos={setCantidadCorrectos}        
        />
      )
    }
  }
  return (
    <div className='ejercicios-div-container'>
        {showEjercicios()}
        <EjercicioFooter 
        selectedOption={selectedOption}
        datosEjercicios={ejerciciosData}
        checkEjercicio={checkEjercicio}
        respuestaCorrectaEncontrada={respuestaCorrectaEncontrada}
        setRespuestaCorrectaEncontrada={setRespuestaCorrectaEncontrada}
        saltarEjercicio={saltarEjercicio}
        ejerciciosCorrectos={ejerciciosCorrectos}
        numeroEjercicio={numeroEjercicio}
        resetEjercicios={resetEjercicios}
        mostrarTodosEjercicios={mostrarTodosEjercicios}
        skipHabilitado={skipHabilitado}
        />
       
    </div>
  )
}

export default EjerciciosComponent