import React, { useEffect } from 'react'
import HeaderNoLogged from './NoLogged/HeaderNoLogged'
import RegistroComponent from './NoLogged/Registro/RegistroComponent'

const Registro = () => {
    useEffect(()=>{
        document.title="Registro | Arandu"
        if(localStorage.getItem("token")){
            window.location.href="/"
        }
    },[])
  return (
    <>
        <HeaderNoLogged/>
        <RegistroComponent/>
    </>
  )
}

export default Registro