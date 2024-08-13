import React from 'react'
import HeaderNoLogged from './NoLogged/HeaderNoLogged'
import MainLectura from './NoLogged/LecturaComponents/MainLectura'
import { useParams } from 'react-router-dom'


const Lectura = () => {
    const url=useParams();

  return (
    <>

    <HeaderNoLogged/>
    <MainLectura ruta={url}/>
    
    
    </>
  )
}

export default Lectura