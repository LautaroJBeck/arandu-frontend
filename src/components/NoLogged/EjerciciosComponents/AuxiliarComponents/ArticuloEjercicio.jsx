import React, { useEffect, useState } from 'react'
import "./ArticuloEjercicio.css"
import EjerciciosHeader from './EjerciciosHeader'
import { useParams } from 'react-router-dom'
import EjerciciosComponent from './EjerciciosComponent'
import { CorrectModal } from './Modals/CorrectModal'
import IncorrectModal from './Modals/IncorrectModal'
import WarningModal from './Modals/WarningModal'
import EjerciciosExplicacion from './ExplanationComponents/EjerciciosExplicacion'
const ArticuloEjercicio = () => {
  const url=useParams()
  const [showCorrectModal,setShowCorrectModal]=useState(false)
  const [showIncorrectModal,setShowIncorrectModal]=useState(false)
  const [showWarningModal,setShowWarningModal]=useState(false)
  const [authorizeNext,setAuthorizeNext]=useState(false)
  const handleContent=()=>{
    if(url.tipo=="practicar"){
      return <article className="ejercicios-container">
      <EjerciciosHeader url={url}/>
      <EjerciciosComponent 
      setShowIncorrectModal={setShowIncorrectModal}
      setShowCorrectModal={setShowCorrectModal} 
      setShowWarningModal={setShowWarningModal}
      authorizeNext={authorizeNext}
      url={url}/>
     {showCorrectModal&&<CorrectModal setShowCorrectModal={setShowCorrectModal}/>}
     {showIncorrectModal&&<IncorrectModal setShowIncorrectModal={setShowIncorrectModal}/>}
     {showWarningModal&&<WarningModal 
     setAuthorizeNext={setAuthorizeNext}
     setShowWarningModal={setShowWarningModal}/>}
    </article>
    }else{
      return <article className="ejercicios-container">
      <EjerciciosHeader url={url}/>
      <EjerciciosExplicacion/>
      </article>
    }
  }
  useEffect(() => {
    handleContent()
    if(!localStorage.getItem("token")){
      window.location.href="/"
    }
  }, [])
  
  return (
    <>
      {handleContent()}
    </>
  )
}

export default ArticuloEjercicio