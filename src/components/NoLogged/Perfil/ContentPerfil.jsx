import React from 'react'
import EditarPerfil from './ContentComponents/EditarPerfil'
import SeguridadCuenta from './ContentComponents/SeguridadCuenta'
import CerrarCuenta from './ContentComponents/CerrarCuenta'
import MiAprendizaje from './ContentComponents/MiAprendizaje'

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
    }
  }
  return (
    <div className='perfil-content'>
        {returnContent()}
    </div>
  )
}

export default ContentPerfil