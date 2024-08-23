import React, { useEffect, useState } from 'react'
import apiLink from '../../../../helpers/apiLink'
import Loader from '../../../Loader/Loader'

const EditarPerfil = () => {
    const [userValues,setUserValues]=useState()
    const [formValues,setFormValues]=useState()
    const [error,setError]=useState()
    const [loader,setLoader]=useState(null)
    useEffect(() => {
      document.title="Mi Perfil | Arandu"
        const funcionPeticion=async()=>{
          setLoader(true)
            let resToken=await fetch(`${apiLink}/login/token`,{
              method:"POST",
              headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
            })
            let jsonToken=await resToken.json()
            setUserValues(jsonToken.decoded)
            setFormValues(jsonToken.decoded)
            setLoader(false)
          }
          funcionPeticion()
    }, [])
    const handleValues=(e)=>{
        setFormValues({
            ...formValues,
            [e.target.name]:(e.target.value)
        })
    }
    const handleButtonCambiar=async()=>{
        try{
          let modifiedValues={...formValues}
          Object.keys(modifiedValues).forEach(el=>{
            if(typeof modifiedValues[el]=="string"){
              modifiedValues[el]=modifiedValues[el].trim()
            }
          })
          console.log(modifiedValues)
          let res1=await fetch(`${apiLink}/register/${formValues.id}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({...modifiedValues,originalCorreo:userValues.correo})
          })
          let json1=await res1.json();
          console.log(json1)
        if(json1.errors){
            if(typeof json1.errors[0]=="object"){
                setError(json1.errors[0].msg)
            }else{
                setError(json1.errors[0])
            }
        }else if(json1.newData){
          let res2=await fetch(`${apiLink}/register/token/${formValues.id}`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(json1.newData)
          })
          let json2=await res2.json();
            if(json2.errors){
                if(typeof json2.errors[0]=="object"){
                    setError(json2.errors[0].msg)
                }else{
                    setError(json2.errors[0])
                }
            }else if(json2.token){
                localStorage.setItem("token",json2.token);
                localStorage.setItem("perfil-cambios",JSON.stringify({
                  show:true,
                  type:"success",
                  message:"Tus datos se actualizaron de manera correcta"
              }))
                window.location.reload()
            }   
        }   
        }catch(err){

        }
    }
  return (
    <>
        {loader?<Loader/>:formValues?<>
        <label>Cambiar información básica</label>
        <input placeholder="Nombre"
         type="text" name="nombre" 
         onChange={(e)=>handleValues(e)} value={formValues.nombre}/>
        <input placeholder="Apellido"
         type="text" name="apellido" 
         onChange={(e)=>handleValues(e)} value={formValues.apellido}/>
        <input placeholder="Correo"
         type="text" name="correo" 
         onChange={(e)=>handleValues(e)} value={formValues.correo}/>
        
        
        {error&&<span className="error-warning">{error}</span>}
        
        
        
        
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

        <div className="button-changes-container">
            <button 
            onClick={userValues!==formValues?()=>handleButtonCambiar():()=>0}
            className={`button-changes ${userValues!==formValues?"changes-active":""}`}>Guardar cambios</button>
        </div>
        </>:<></>}
    </>
  )
}

export default EditarPerfil