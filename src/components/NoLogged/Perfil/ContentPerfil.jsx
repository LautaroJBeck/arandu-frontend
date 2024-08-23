import React from 'react'
import EditarPerfil from './ContentComponents/EditarPerfil'
import SeguridadCuenta from './ContentComponents/SeguridadCuenta'
import CerrarCuenta from './ContentComponents/CerrarCuenta'
import MiAprendizaje from './ContentComponents/MiAprendizaje'
import MisProfesores from './ContentComponents/MisRelaciones/MisProfesores'
import MisEstudiantes from './ContentComponents/MisRelaciones/MisEstudiantes'

const ContentPerfil = ({id}) => {
  const returnContent=()=>{
    if(id=="editar-perfil"){
      return <EditarPerfil/>
    }else if(id=="seguridad"){
      return <SeguridadCuenta/>
    }else if(id=="cerrar"){
      return  <CerrarCuenta/>
    }else if(id=="aprendizaje"){
      return <MiAprendizaje/>
    }else if(id=="mis-profesores"){
      return <MisProfesores/>
    }else if(id=="mis-estudiantes"){
      return <MisEstudiantes/>
    }
  }
  return (
    <div className='perfil-content'>
        {returnContent()}
    </div>
  )
}

export default ContentPerfil