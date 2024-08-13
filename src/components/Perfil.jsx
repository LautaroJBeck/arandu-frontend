import React, { useEffect, useState } from 'react'
import HeaderNoLogged from './NoLogged/HeaderNoLogged'
import MainPerfil from './NoLogged/Perfil/MainPerfil'
import WarningModal from './NoLogged/Perfil/ContentComponents/WarningModal'


const initialState={
    show:false,
    type:"",
    message:""
}
const Perfil = () => {
    const [showModal,setShowModal]=useState(initialState)
    const returnContent=()=>{
        if(localStorage.getItem("token")){
            return <>
                <HeaderNoLogged/>
                <MainPerfil/>
            </>
        }else{
            window.location.href="/"
        }
    }
    useEffect(() => {
        if(localStorage.getItem("perfil-cambios")){
            setShowModal(JSON.parse(localStorage.getItem("perfil-cambios")))
            setTimeout(()=>{
                localStorage.removeItem("perfil-cambios")
                setShowModal(initialState)
            },2500)
        }

    }, [])
  return (
    <>
        {returnContent()}
        {showModal.show&&<WarningModal message={showModal.message} type={showModal.type}/>}
    </>
  )
}

export default Perfil