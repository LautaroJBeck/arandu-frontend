import React, { useEffect, useState } from 'react'
import apiLink from '../../../../helpers/apiLink'

const SeguridadCuenta = () => {
    const [error,setError]=useState()
    const [passwordValues,setPasswordValues]=useState({
      password:"",
      newPassword:"",
      newPassword2:""
    })
    useEffect(() => {
      document.title="Seguridad de la cuenta | Arandu"
    }, [])
    
    const handleState=(e)=>{
      setPasswordValues({
        ...passwordValues,
        [e.target.name]:e.target.value
      })
    }
    const uploadChanges=async()=>{
      try{
        if(passwordValues.newPassword!=passwordValues.newPassword2){
          setError("Comprueba que las nuevas contraseñas coincidan")
          return
        }
        let resToken=await fetch(`${apiLink}/login/token`,{
          method:"POST",
          headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        })
        let jsonToken=await resToken.json()
        let res1=await fetch(`${apiLink}/register/password/${jsonToken.decoded.id}`,{
          method:"PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({password:passwordValues.password,newPassword:passwordValues.newPassword})
        })
        let json1=await res1.json()
        if(json1.errors){
          if(typeof json1.errors[0]=="object"){
              setError(json1.errors[0].msg)
          }else{
              setError(json1.errors[0])
          }
        }else if(json1.msg){
          localStorage.setItem("perfil-cambios",JSON.stringify({
            show:true,
            type:"success",
            message:"Tus contraseña se actualizó de manera correcta"
        }))
          window.location.reload()
        } 
      }catch{

      }
    }
  return (
    <>
    <label>Cambiar contraseña</label>
        <input placeholder="Introduce la contraseña actual"
         type="password" 
         name="password"
         value={passwordValues.password} 
         onChange={(e)=>handleState(e)} />
        <input placeholder="Introduce la nueva contraseña"
         type="password" 
         name="newPassword"
         value={passwordValues.newPassword} 
         onChange={(e)=>handleState(e)} />
        <input placeholder="Repite la nueva contraseña"
         type="password" 
         name="newPassword2"
         value={passwordValues.newPassword2} 
         onChange={(e)=>handleState(e)} />
        
        {/*<div className="change-password-container">
            <button onClick={()=>handlePasswordForms()}
             className={`change-password ${showPasswordForms?"change-password-active":""}`}>Cambiar contraseña</button>
              {showPasswordForms&&<>
              <input 
              placeholder='Introduce tu actual contraseña'
              type="password" />
              <input 
              placeholder='Introduce tu nueva contraseña'
              type="password" />
              <input 
              placeholder='Repite tu nueva contraseña'
              type="password" />
            </>}
        </div>*/}
        {error&&<span className="error-warning">{error}</span>}
        <div className="button-changes-container">
        <button 
        onClick={(passwordValues.password&&passwordValues.newPassword&&passwordValues.newPassword2)?()=>uploadChanges():()=>0}
        className={`button-changes ${(passwordValues.password&&passwordValues.newPassword&&passwordValues.newPassword2)?"changes-active":""}`}>Guardar cambios</button>
        </div>
        </>
  )
}

export default SeguridadCuenta