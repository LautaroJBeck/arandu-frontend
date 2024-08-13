import React, { useContext } from 'react'
import HeaderNoLogged from './NoLogged/HeaderNoLogged'
import MainEjercicios from './NoLogged/EjerciciosComponents/MainEjercicios'
import Confetti from 'react-confetti'
import ConfettiContext from '../context/ConfettiContext'

const Ejercicio = () => {
  const {showConfetti,setShowConfetti}=useContext(ConfettiContext)
  return (
    <>
    {showConfetti?<Confetti
    numberOfPieces={750}
    gravity={0.125}

    />:<></>}
    <HeaderNoLogged/>
    <MainEjercicios/>
    </>
  )
}

export default Ejercicio