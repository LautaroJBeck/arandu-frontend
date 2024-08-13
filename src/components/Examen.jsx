import React from 'react'
import HeaderNoLogged from './NoLogged/HeaderNoLogged'
import MainExamen from './NoLogged/Examen/MainExamen'
import Confetti from 'react-confetti/'
import { useContext } from 'react'
import ConfettiContext from '../context/ConfettiContext'

const Examen = () => {
  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)
  return (
    <>
    {showConfetti?<Confetti
    numberOfPieces={750}
    gravity={0.125}

    />:<></>}
    <HeaderNoLogged/>
    <MainExamen/>
    </>
  )
}

export default Examen