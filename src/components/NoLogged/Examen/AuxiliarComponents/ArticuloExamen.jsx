import React,{useEffect, useState} from 'react'
import ExamenHeader from './ExamenHeader'
import { CorrectModal } from './CorrectModal'
import ExamenComponent from './ExamenComponent'
import "./ArticuloExamen.css"
import IncorrectModal from './IncorrectModal'
import WarningModal from './WarningModal'
import { useParams } from 'react-router-dom'

const ArticuloExamen = () => {

  const [showModal,setShowModal]=useState(false)
  const [showIncorrectModal,setShowIncorrectModal]=useState(false)
  const [showWarningModal,setShowWarningModal]=useState(false)
  const [authorizeNext,setAuthorizeNext]=useState(false)

  const url=useParams()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      window.location.href="/"
    }
  }, [])
  useEffect(() => {
    document.title=`Examen evaluativo de nivel ${url.id} | Arandu`
  }, [url.id])
  
  return (
    <article className="ejercicios-container">
        <ExamenHeader url={url.id}/>
        <ExamenComponent 
        setShowIncorrectModal={setShowIncorrectModal}
        setShowModal={setShowModal}
        setShowWarningModal={setShowWarningModal}
        authorizeNext={authorizeNext}
        url={url.id}
        />
    {showModal&&<CorrectModal setShowModal={setShowModal}/>}
    {showIncorrectModal&&<IncorrectModal setShowIncorrectModal={setShowIncorrectModal}/>}
    {showWarningModal&&<WarningModal 
     setAuthorizeNext={setAuthorizeNext}
     setShowWarningModal={setShowWarningModal}/>}
    </article>
  )
}

export default ArticuloExamen