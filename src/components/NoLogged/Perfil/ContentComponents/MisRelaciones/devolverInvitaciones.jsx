//Esto no es un componente

import apiLink from "../../../../../helpers/apiLink"

const devolverInvitaciones=(focusInvitaciones,pageInvitaciones,setPageInvitaciones)=>{
    const handleRetrocederInvitacion=()=>{
      if(pageInvitaciones.number!=0) setPageInvitaciones({...pageInvitaciones,number:pageInvitaciones.number-5})
    }
    const handleAvanzarInvitacion=()=>{
      if(pageInvitaciones.max!=(pageInvitaciones.number/5)+1) setPageInvitaciones({...pageInvitaciones,number:pageInvitaciones.number+5})
    }
    const removeInvitacion=async(el)=>{
      console.log(el)
      let res=await fetch(`${apiLink}/relaciones/aceptar`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            respuesta:false,
            correo_alumno:el.correo_alumno,
            profesor_id:el.profesor_id
        })
        })
      let json=await res.json()
      console.log(json)
      if(json.msg){
        localStorage.setItem("perfil-cambios",JSON.stringify({
            show:true,
            type:"success",
            message:"La solicitud se eliminó satisfactoriamente"
        }))
        window.location.reload()
      }
    
      }
      if(focusInvitaciones.length>0){
        const devolverListadoInvitaciones=()=>{
          return focusInvitaciones.map((el,index)=>{
            return <div key={index} className='solicitud-container'>
              <div className="icon-solicitud">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="fecha-container">
                <span className="span-tiempo">{`Invitación a alumno`}</span>
                <span className='span-correo'>{el.correo_alumno}</span>
              </div>
              <div className="invitacion-button-container">
                <button className='invitacion-rechazar'onClick={()=>removeInvitacion(el)}>Remover</button>
            </div>
            </div>
          })
        }
        return <>
          <label htmlFor="">Invitaciones a alumnos</label>
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
          <label htmlFor="">Invitaciones a alumnos</label>
          <p className="explanation-p">Ahora mismo no tienes invitaciones de profesores pendientes. Contacta con tu profesor y solicita que te mande una solicitud de seguimiento</p>
          </>
      }
  }
export default devolverInvitaciones