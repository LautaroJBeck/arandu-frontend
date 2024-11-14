import React, { useContext, useEffect, useState } from 'react'
import ConfettiContext from '../../../../context/ConfettiContext'
import ComponenteResumen from './ComponenteResumen'
import ComponenteIntroduccion from './ComponenteIntroduccion'
import ComponenteEjercicio from "./ComponenteEjercicio"
import correctAudio from "../../../../assets/audios/correct-excercise.mp3"
import finalAudio from "../../../../assets/audios/completed-excercise.mp3"
import ExamenFooter from './ExamenFooter'
import Loader from "../../../Loader/Loader.jsx"
import apiLink from '../../../../helpers/apiLink.js'

let initialEjerciciosCorrectos=new Array(18).fill(false)

const ExamenComponent = ({setShowModal,setShowIncorrectModal,authorizeNext,
  setShowWarningModal,url}) => {
    const [selectedOption, setSelectedOption] = useState(0) //1
    const [ejerciciosData,setEjerciciosData]=useState(null) // 2
    const [numeroEjercicio,setNumeroEjercicio]=useState(0) // 3
    const [respuestaCorrectaEncontrada,setRespuestaCorrectaEncontrada]=useState(false) //4
    const [ejerciciosCorrectos,setEjerciciosCorrectos]=useState(initialEjerciciosCorrectos) //5
    const [contenidoLi,setContenidoLi]=useState([]) //6
    const [firstTry,setFirstTry]=useState(true) //7
    const [skipHabilitado,setSkipHabilitado]=useState(true) //8
    const [cantidadCorrectos, setCantidadCorrectos] = useState(0) //9
    const {showConfetti,setShowConfetti}=useContext(ConfettiContext) //10
    const [showIntroduccion, setShowIntroduccion]=useState(true)//11
    const [loader,setLoader]=useState(null)
    const [showButtonConfetti, setShowButtonConfetti]=useState(false)
    //3,4,5,7,12
    const defaultAnswers={
        "1":0,
        "2":0,
        "3":0,
        "4":0
      }
  //const [firstLoad,setFirstLoad]=useState(true)
  const [showAnswers,setShowAnswers]=useState(defaultAnswers) //12

  const handleModal=()=>{
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
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
    setShowButtonConfetti(false)
    setShowModal(false)
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
        handleModal()
        
        new Audio(correctAudio).play()
        setShowAnswers(objetoTemplate)
        setRespuestaCorrectaEncontrada(true)
        setShowButtonConfetti(true)
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
      if(url=="general"){
        let res=await fetch(`${apiLink}/examen/`,{
          method:"GET",
          headers:{"Content-type":"application/json",},
        })
        let json=await res.json()
        if(json.error) setError(json.error)
        setEjerciciosData(json.listaPreguntas)
      }else{
        let res=await fetch(`${apiLink}/examen/${url}`,{
          method:"GET",
          headers:{"Content-type":"application/json",},
        })
        let json=await res.json()
        if(json.error) setError(json.error)
        setEjerciciosData(json.listaPreguntas)
      }
      setLoader(false)
      }
      peticionEjercicios()

  }, [])
  useEffect(() => {
    if(cantidadCorrectos>=13&&numeroEjercicio>=18){
      setShowConfetti(true)
      new Audio(finalAudio).play()
    }
  }, [numeroEjercicio,cantidadCorrectos])

  const showEjercicios=()=>{
    if(loader){
      return <Loader/>
    }
    else if(showIntroduccion){
        return <ComponenteIntroduccion/>
    }else if(ejerciciosData&&numeroEjercicio<18){
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
    }else if(numeroEjercicio>=18){
      return(
        <ComponenteResumen
        ejerciciosCorrectos={ejerciciosCorrectos}
        cantidadCorrectos={cantidadCorrectos}
        setCantidadCorrectos={setCantidadCorrectos} 
        ejerciciosData={ejerciciosData}
        url={url}       
        />
      )
    }
  }
  return (
    <div className={`${showIntroduccion?"ejercicios-div-container-resumen":"ejercicios-div-container"}`}>
        {showEjercicios()}
        <ExamenFooter
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
        showIntroduccion={showIntroduccion}
        setShowIntroduccion={setShowIntroduccion}
        showButtonConfetti={showButtonConfetti}
        />  
    </div>
  )
}

export default ExamenComponent