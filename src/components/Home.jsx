import React, { useEffect, useState } from 'react'
import HomeNoLogged from './NoLogged/HomeNoLogged'
import WarningModal from './NoLogged/Perfil/ContentComponents/WarningModal'

const initialState={
    show:false,
    type:"",
    message:""
}
const Home = () => {
    const [showModal,setShowModal]=useState(initialState)

    useEffect(() => {
        document.title="Inicio | Arandu"
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
        {/*localStorage.getItem("token")?(
            <></>
        ):(
            
        )*/}
        <HomeNoLogged></HomeNoLogged>
        {showModal.show&&<WarningModal message={showModal.message} type={showModal.type}/>}
        </>
  )
}

export default Home