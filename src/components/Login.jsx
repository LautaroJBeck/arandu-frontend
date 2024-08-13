import React, { useEffect } from 'react'
import HeaderNoLogged from "./NoLogged/HeaderNoLogged.jsx"
import LoginComponent from './NoLogged/Login/LoginComponent.jsx'

const Login = () => {
    useEffect(()=>{
        document.title="Iniciar Sesión | Arandu"
        if(localStorage.getItem("token")){
            window.location.href="/"
        }
    },[])
  return (
    <>
      <HeaderNoLogged/>
      <LoginComponent/>
    </>
  )
}

export default Login