import apiLink from "../../../../../helpers/apiLink"
import nombreApellido from "../../../../../helpers/nombreApellido"
const DevolverAlumnos=({focusAlumnos,pageAlumnos,setPageAlumnos,setVerAlumno})=>{

    const handleRetrocederAlumnos=()=>{
        if(pageAlumnos.number!=0) setPageAlumnos({...pageAlumnos,number:pageAlumnos.number-5})
    }
    const handleAvanzarAlumnos=()=>{
        if(pageAlumnos.max!=(pageAlumnos.number/5)+1) setPageAlumnos({...pageAlumnos,number:pageAlumnos.number+5})
    }
    const handleVerExamenesAlumno=async(el)=>{
      setVerAlumno({mostrar:true,id:el.alumno_id})
    }
    const removerAlumno=()=>{

    }
    const devolverAlumnos=()=>{
      if(focusAlumnos.length>0){
        const devolverListadoAlumnos=()=>{
          return focusAlumnos.map((el,index)=>{
            return <div key={index} className='solicitud-container'>
              <div className="icon-solicitud">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="fecha-container">
                <span className="span-tiempo">{nombreApellido(el.nombre_alumno,el.apellido_alumno)}</span>
                <span className='span-correo'>{el.correo_alumno}</span>
              </div>
              <div className="examenes-button-container">
                <button className='invitacion-aceptar'onClick={()=>handleVerExamenesAlumno(el)}>Ver examenes</button>
            </div>
            </div>
          })
        }
      return <>
      <label htmlFor="">Listado de alumnos</label>
      <div className='solicitudes-container'>
        {devolverListadoAlumnos()}
        <div className="button-examenes-container">
          <div>
            <span className="pagina-number">Página {(pageAlumnos.number/5)+1}</span>
          </div>
          <div>
            <button 
            onClick={()=>handleRetrocederAlumnos()}
            className={`button-atras ${pageAlumnos.number!=0?"activado":""}`}>Atrás</button>
            <span className='button-separator'>|</span>
            <button 
            onClick={()=>handleAvanzarAlumnos()}
            className={`button-atras ${pageAlumnos.max!=(pageAlumnos.number/5)+1?"activado":""}`}>Adelante</button>
          </div>
        </div>
      </div>
    </>
    }else{
        return <>
        <label htmlFor="">Listado de alumnos</label>
        <p className="explanation-p">Ahora mismo no tienes ningún alumno dentro de la aplicación, si quieres ver el progreso de tus alumnos, envíales una solicitud de seguimiento</p>
        </>
    }
    }
    return(
      <>
      {devolverAlumnos()}
      </>
    )
}
export default DevolverAlumnos