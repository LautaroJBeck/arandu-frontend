import React, { useEffect, useState } from 'react'
import "./MainPerfil.css"
import HeaderPerfil from './HeaderPerfil'
import ContentPerfil from './ContentPerfil'
import { Link, useParams } from 'react-router-dom'
import apiLink from '../../../helpers/apiLink'
const MainPerfil = () => {
  const {id}=useParams()
  const [currentRuta, setCurrentRuta] = useState(id)
  const [nombre,setNombre]=useState("")
  const [letters,setLetters]=useState("")
  const [rol,setRol]=useState("")
  const handleRuta=(string)=>{
    setCurrentRuta(string)
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      const getNombre=async()=>{
          try{
              let resToken=await fetch(`${apiLink}/login/token`,{
                method:"POST",
                headers:{
                  "Content-type":"application/json",
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              })
              let jsonToken=await resToken.json()
              setRol(jsonToken.decoded.rol)
              setNombre(`${jsonToken.decoded.nombre.split(" ")[0]} ${jsonToken.decoded.apellido.split(" ")[0]}`)
              setLetters(`${jsonToken.decoded.nombre.split(" ")[0][0]+jsonToken.decoded.apellido.split(" ")[0][0]}`)
            }catch(err){
            }
      }
      getNombre()
  }
  }, [])
  useEffect(() => {
    handleRuta(id)
  }, [id])
  
  const handleRolLink=()=>{
    if(rol=="estudiante"){
      return <Link 
      onClick={()=>handleRuta("mis-profesores")}
      to="/perfil/mis-profesores"
      className={`perfil-section ${currentRuta=="mis-profesores"?"seleccionado":""}`}
      >Mis profesores</Link>
    }else{
      return <Link 
      onClick={()=>handleRuta("mis-estudiantes")}
      to="/perfil/mis-estudiantes"
      className={`perfil-section ${currentRuta=="mis-estudiantes"?"seleccionado":""}`}
      >Mis estudiantes</Link>
    }
  }
  return (
    <main>
        <div className="big-container-perfil">
          <div className="perfil-container">
            <aside className="user-aside">
                <div className="user-logo">
                    <b>{letters}</b>
                    <h4>{nombre}</h4>
                </div>
                <Link onClick={()=>handleRuta("editar-perfil")} 
                to="/perfil/editar-perfil" 
                className={`perfil-section ${currentRuta=="editar-perfil"?"seleccionado":""}`}>Mi perfil</Link>

                <Link onClick={()=>handleRuta("aprendizaje")} 
                to="/perfil/aprendizaje" 
                className={`perfil-section ${currentRuta=="aprendizaje"?"seleccionado":""}`}>Mi aprendizaje</Link>

                <Link onClick={()=>handleRuta("actividad")} 
                to="/perfil/actividad" 
                className={`perfil-section ${currentRuta=="actividad"?"seleccionado":""}`}>Mi actividad</Link>
                
                {rol&&handleRolLink()}
            

                <Link onClick={()=>handleRuta("seguridad")} 
                to="/perfil/seguridad" 
                className={`perfil-section ${currentRuta=="seguridad"?"seleccionado":""}`}>Seguridad de la cuenta</Link>
                
                <Link onClick={()=>handleRuta("cerrar")} 
                to="/perfil/cerrar" 
                className={`perfil-section ${currentRuta=="cerrar"?"seleccionado":""}`}>Cerrar cuenta</Link>
            </aside>
            <div className='user-article'>
              <HeaderPerfil id={id}/>
              <ContentPerfil id={id}/>
            </div>
          </div>
        </div>
    </main>
  )
}

export default MainPerfil