import React, { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../../../../Loader/Loader'
import apiLink from '../../../../../helpers/apiLink'
import devolverInvitaciones from './devolverInvitaciones'
import devolverAlumnos from './DevolverAlumnos'
import DevolverAlumnos from './DevolverAlumnos'
import VerAlumno from './VerAlumno'

const MisEstudiantes = () => {
    const [alumnos,setAlumnos]=useState([])
    const [invitaciones,setInvitaciones]=useState([])
    const [loader,setLoader]=useState(null)
    const [formValue,setFormValue]=useState("")
    const [profesorData,setProfesorData]=useState()
    const [error,setError]=useState()

    //Logica para invitaciones pendientes
    const [focusInvitaciones,setFocusInvitaciones]=useState([])
    const [pageInvitaciones,setPageInvitaciones]=useState({number:0,max:0})
    //Logica para alumnos
    const [focusAlumnos,setFocusAlumnos]=useState([])
    const [pageAlumnos,setPageAlumnos]=useState({number:0,max:0})

    const [verAlumno,setVerAlumno]=useState({mostrar:false,id:null})
    const [examenesAlumno,setExamenesAlumno]=useState(null)

    useEffect(() => {
        document.title="Mis Estudiantes | Arandu"
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
        let resAlumnos=await fetch(`${apiLink}/relaciones/alumnos/${jsonToken.decoded.id}`,{
            method:"GET",
            headers:{"Content-type":"application/json",}
        })
        let jsonAlumnos=await resAlumnos.json()
        let resInvitacion=await fetch(`${apiLink}/relaciones/solicitudes/profesor/${jsonToken.decoded.correo}`,{
            method:"GET",
            headers:{"Content-type":"application/json",}
        })
        let jsonSolicitudes=await resInvitacion.json()

        setAlumnos(jsonAlumnos.sort())
        setInvitaciones(jsonSolicitudes)
        setProfesorData(jsonToken.decoded)
        //Logica invitaciones
        setFocusInvitaciones(jsonSolicitudes.slice(0,5))
        setPageInvitaciones({...pageInvitaciones,max:Math.ceil(jsonSolicitudes.length/5)})
        //Logica alumnos
        setFocusAlumnos(jsonAlumnos.slice(0,5))
        setPageAlumnos({...pageAlumnos,max:Math.ceil(jsonAlumnos.length/5)})
        setLoader(false)
            
        }
      peticion()
      }, [])
      //Logica para invitaciones
        /*Logica para invitaciones*/

    useEffect(()=>{
        if(invitaciones) setFocusInvitaciones(invitaciones.slice(pageInvitaciones.number,pageInvitaciones.number+5))
    },[pageInvitaciones])

    //Logica para alumnos
    useEffect(()=>{
        if(alumnos) setFocusAlumnos(alumnos.slice(pageAlumnos.number,pageAlumnos.number+5))
    },[pageAlumnos])

    const handleForm=(e)=>{
        setFormValue(e.target.value)
    }
    const enviarInvitacion=async()=>{
        let res=await fetch(`${apiLink}/relaciones`,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                correo_alumno:formValue,
                correo_profesor:profesorData.correo,
                nombre_profesor:profesorData.nombre,
                apellido_profesor:profesorData.apellido,
                profesor_id:profesorData.id
            })
          })
        let json=await res.json()
        console.log(json)
        if(json.errors){
            if(typeof json.errors[0]=="object"){
                setError(json.errors[0].msg)
            }else{
                setError(json.errors[0])
            }
        }else if(json.msg){
            localStorage.setItem("perfil-cambios",JSON.stringify({
                show:true,
                type:"success",
                message:"Se mandó una invitación al alumno"
            }))
            window.location.reload()
        }
    }

  return (
    <>
    {loader?<Loader/>:verAlumno.mostrar?
    <VerAlumno 
    id={verAlumno.id}
    setVerAlumno={setVerAlumno}
    />
    :<>
        <label htmlFor="">Enviar solicitud de seguimiento a alumno</label>
        <input 
        placeholder="Introduce el correo de tu alumno"
        type="text" name="nombre" 
        onChange={(e)=>handleForm(e)} value={formValue}/>
        {error&&<span className="error-warning">{error}</span>}
        <div className="button-changes-container">
            <button 
            onClick={formValue?()=>enviarInvitacion():()=>0}
            className={`button-changes ${formValue?"changes-active":""}`}>Enviar invitación</button>
        </div>
        {devolverInvitaciones(focusInvitaciones,pageInvitaciones,setPageInvitaciones)}
        {<DevolverAlumnos
        focusAlumnos={focusAlumnos}
        pageAlumnos={pageAlumnos}
        setPageAlumnos={setPageAlumnos}
        setVerAlumno={setVerAlumno}
        />}

    </>}
    </>
  )
}

export default MisEstudiantes