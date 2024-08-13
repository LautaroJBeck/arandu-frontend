import React, { useEffect, useState } from 'react'
import apiLink from '../../../../helpers/apiLink'

const CerrarCuenta = () => {
    const [modalCerrarCuenta,setModalCerrarCuenta]=useState(false)
    const [valorPassword,setValorPassword]=useState({password:""})
    const [error,setError]=useState("")

    const handleState=(e)=>{
        setValorPassword({
            ...valorPassword,
            [e.target.name]:e.target.value
        })
    }
    useEffect(() => {
        document.title="Cerrar Sesión | Arandu"
    }, [])
    
    const sendData=async()=>{
        try {
            let resToken=await fetch(`${apiLink}/login/token`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json",
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              })
              let jsonToken=await resToken.json()
              let res1=await fetch(`${apiLink}/register/${jsonToken.decoded.id}`,{
                method:"DELETE",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({password:valorPassword.password})
              })
              let json1=await res1.json()
              if(json1.errors){
                if(typeof json1.errors[0]=="object"){
                    setError(json1.errors[0].msg)
                }else{
                    setError(json1.errors[0])
                }
            }else if(json1.msg){
                localStorage.removeItem("token")
                localStorage.setItem("perfil-cambios",JSON.stringify({
                    show:true,
                    type:"success",
                    message:"Tus cuenta se eliminó de manera satisfactoria"
                }))
                window.location.href="/"
            }
        } catch (error) {
            
        }
    }
  return (
    <>
    <p className="p-cerrar"><span className="advertencia-warning">Advertencia: </span> Si cierras tu cuenta, perderás para siempre tu progreso en todas tus secciones practicadas y tus datos guardados en la aplicación, incluso si decides crear una cuenta con la misma dirección de correo electrónico más adelante. </p>
    <br />
    <p className="p-cerrar">Ten en cuenta que Arandu no puede recuperar tu progreso una vez cerrada tu cuenta.</p>
    <div className="button-changes-container">
        <button onClick={()=>setModalCerrarCuenta(true)} className="button-cerrar-no-active button-cerrar-active">Cerrar cuenta</button>
    </div>
   { modalCerrarCuenta&&<div className="modal-borrar-container">
        <div className="modal-borrar">
            <div className="modal-borrar-header">
                <h4>¿Estás seguro de borrar tu cuenta?</h4>
                <button onClick={()=>setModalCerrarCuenta(false)}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="modal-borrar-body">
                <span>Para borrar tu cuenta, debes introducir tu contraseña</span>
                <input 
                type="password"
                name='password'
                placeholder='Introduce tu contraseña'
                onChange={(e)=>handleState(e)}
                value={valorPassword.password}
                />
                {error&&<span className='error-warning'>{error}</span>}
            </div>
            <div className="button-cerrar-container">
                <button 
                onClick={valorPassword?()=>sendData():()=>0}
                className={`button-cerrar-no-active ${valorPassword?"button-cerrar-active":""}`}>Cerrar cuenta</button>
            </div>
        </div>
    </div>}
    </>
  )
}

export default CerrarCuenta