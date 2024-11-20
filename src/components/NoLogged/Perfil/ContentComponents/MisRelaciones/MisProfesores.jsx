import React, { useEffect, useState } from 'react'
import apiLink from '../../../../../helpers/apiLink'
import Loader from '../../../../Loader/Loader'
import nombreApellido from '../../../../../helpers/nombreApellido'

const MisProfesores = () => {
    const [invitaciones,setInvitaciones]=useState([])
    const [profesores,setProfesores]=useState([])
    const [datosAlumno,setDatosAlumno]=useState(null)
    const [loader,setLoader]=useState(null)
    //Logica para invitaciones 
    const [focusInvitaciones,setFocusInvitaciones]=useState([])
    const [pageInvitaciones,setPageInvitaciones]=useState({number:0,max:0})
    

    //Logica para profesores
    const [focusProfesores,setFocusProfesores]=useState()
    const [pageProfesores,setPageProfesores]=useState({number:0,max:0})


    useEffect(() => {
      document.title="Mis Profesores | Arandu"
      const peticion=async()=>{
        setLoader(true)
        let resToken=await fetch(`${apiLink}/login/token`,{
            method:"POST",
            headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
          })
          let jsonToken=await resToken.json()
          let resSolicitudes=await fetch(`${apiLink}/relaciones/solicitudes/${jsonToken.decoded.correo}`,{
            method:"GET",
            headers:{"Content-type":"application/json",}
          })
          let jsonSolicitudes=await resSolicitudes.json()
          let resProfesores=await fetch(`${apiLink}/relaciones/profesores/${jsonToken.decoded.id}`,{
            method:"GET",
            headers:{"Content-type":"application/json",}
          })
          let jsonProfesores=await resProfesores.json()
          setDatosAlumno(jsonToken.decoded)
          setProfesores(jsonProfesores) 
          setInvitaciones(jsonSolicitudes)
          //Logica invitaciones
          setFocusInvitaciones(jsonSolicitudes.slice(0,5))
          setPageInvitaciones({...pageInvitaciones,max:Math.ceil(jsonSolicitudes.length/5)})
          //Logica profesores
          setPageProfesores({...pageProfesores,max:Math.ceil(jsonProfesores.length/5)})
          setFocusProfesores(jsonProfesores.slice(0,5))
          setLoader(false)
        }
    peticion()
    }, [])
  /*Logica para invitaciones*/
    const handleRetrocederInvitacion=()=>{
      if(pageInvitaciones.number!=0) setPageInvitaciones({...pageInvitaciones,number:pageInvitaciones.number-5})
    }
    const handleAvanzarInvitacion=()=>{
      if(pageInvitaciones.max!=(pageInvitaciones.number/5)+1) setPageInvitaciones({...pageInvitaciones,number:pageInvitaciones.number+5})
    }
    useEffect(()=>{
      if(invitaciones) setFocusInvitaciones(invitaciones.slice(pageInvitaciones.number,pageInvitaciones.number+5))
    },[pageInvitaciones])

    const handleInvitacion=async(respuesta,profesorData)=>{

        let res=await fetch(`${apiLink}/relaciones/aceptar`,{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify({
            alumno_id:datosAlumno.id,
            profesor_id:profesorData.profesor_id,
            respuesta,
            correo_alumno:datosAlumno.correo,
            correo_profesor:profesorData.correo_profesor,
            nombre_profesor:profesorData.nombre_profesor,
            nombre_alumno:datosAlumno.nombre,
            apellido_profesor:profesorData.apellido_profesor,
            apellido_alumno:datosAlumno.apellido
          })
        })
        let json=await res.json();
        if(json.msg){
          if(respuesta){
            localStorage.setItem("perfil-cambios",JSON.stringify({
              show:true,
              type:"success",
              message:"El docente fue agregado a tu lista de profesores"
          }))
          }else{
            localStorage.setItem("perfil-cambios",JSON.stringify({
              show:true,
              type:"success",
              message:"Se rechazó la solicitud del docente"
          }))
          }
          window.location.reload()
        }
    }
    const devolverInvitaciones=()=>{
      if(focusInvitaciones.length>0){
        const devolverListadoInvitaciones=()=>{
          return focusInvitaciones.map((el,index)=>{
            return <div key={index} className='solicitud-container'>
              <div className="icon-solicitud">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="fecha-container">
                <span className="span-tiempo">{`Invitación de: ${nombreApellido(el.nombre_profesor,el.apellido_profesor)}`}</span>
                <span className='span-correo'>{el.correo_profesor}</span>
              </div>
              <div className="invitacion-button-container">
                <button className='invitacion-rechazar'onClick={()=>handleInvitacion(false,el)}>Rechazar</button>
                <button className='invitacion-aceptar' onClick={()=>handleInvitacion(true,el)}>Aceptar</button>
            </div>
            </div>
          })
        }
        return <>
          <label htmlFor="">Invitaciones de profesores</label>
          <div className='solicitudes-container'>
            {devolverListadoInvitaciones()}
            <div className="button-examenes-container">
                <div>
                    <span className="pagina-number">Página {(pageInvitaciones.number/5)+1}</span>
                </div>
                <div>
                    <button 
                    onClick={()=>handleRetrocederInvitacion()}
                    className={`button-atras ${pageInvitaciones.number!=0?"activado":""}`}>Atrás</button>
                    <span className='button-separator'>|</span>
                    <button 
                    onClick={()=>handleAvanzarInvitacion()}
                    className={`button-atras ${pageInvitaciones.max!=(pageInvitaciones.number/5)+1?"activado":""}`}>Adelante</button>
                </div>
            </div>
          </div>
        </>
      }else{
          
          return <>
          <label htmlFor="">Invitaciones de profesores:</label>
          <p className='explanation-p'>Ahora mismo no tienes ninguna invitacion pendiente, si quieres que vean tu progreso, contacta con tus profesores</p>
          </>
      }
  }
    /* Logica para profesores */
    useEffect(()=>{
      if(profesores) setFocusProfesores(profesores.slice(pageProfesores.number,pageProfesores.number+5))
    },[pageProfesores])

    const removerProfesor=async(el)=>{
      let res=await fetch(`${apiLink}/relaciones/profesores`,{
        method:"DELETE",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          alumno_id:el.alumno_id,
          profesor_id:el.profesor_id
        })
      })
      let json=await res.json()
      if(json.msg){
        localStorage.setItem("perfil-cambios",JSON.stringify({
          show:true,
          type:"success",
          message:"El docente se eliminó de tu lista de profesores"
      }))
      }
      window.location.reload()
    }
    const devolverProfesores=()=>{
        if(profesores.length>0){
          const devolverListaProfesores=()=>{
            return focusProfesores.map((el,index)=>{
              return <div key={index} className='solicitud-container'>
                <div className="icon-solicitud">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="fecha-container">
                  <span className="span-tiempo">{`Profesor: ${nombreApellido(el.nombre_profesor,el.apellido_profesor)}`}</span>
                  <span className='span-correo'>{el.correo_profesor}</span>
                </div>
                <div className="invitacion-button-container">
                  <button className='invitacion-rechazar'onClick={()=>removerProfesor(el)}>Remover</button>
              </div>
              </div>
            })
          }
          return  <>
          <label htmlFor="">Listado de profesores</label>
          <div className='solicitudes-container'>
            {devolverListaProfesores()}
            <div className="button-examenes-container">
                <div>
                    <span className="pagina-number">Página {(pageProfesores.number/5)+1}</span>
                </div>
                <div>
                    <button 
                    onClick={()=>handleRetrocederInvitacion()}
                    className={`button-atras ${pageProfesores.number!=0?"activado":""}`}>Atrás</button>
                    <span className='button-separator'>|</span>
                    <button 
                    onClick={()=>handleAvanzarInvitacion()}
                    className={`button-atras ${pageProfesores.max!=(pageProfesores.number/5)+1?"activado":""}`}>Adelante</button>
                </div>
            </div>
          </div>
        </>
        }else{
            return <>
            <label htmlFor="">Listado de profesores:</label>
            <p className='explanation-p'>Ahora mismo no tienes ningún profesor dentro de la aplicación, si quieres que vean tu progreso, contacta con tus profesores</p>
            </>

        }
    }
  return (
    <>
    {loader?<Loader/>:<>

    {devolverInvitaciones()}
    {devolverProfesores()}
    </>}

    </>
  )
}

export default MisProfesores