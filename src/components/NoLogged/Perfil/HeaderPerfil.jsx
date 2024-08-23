import React from 'react'

const HeaderPerfil = ({id}) => {
    const handleContent=()=>{
        if(id=="editar-perfil"){
            return <>
                <h4>Mi Perfil</h4>
                <p>Agrega o modifica información sobre ti</p>
            </>
        }else if(id=="aprendizaje"){
            return <>
                <h4>Mi Aprendizaje</h4>
                <p>Mira el desempeño que has tenido en tus ultimos examenes</p>
            </>
        }else if(id=="cerrar"){
            return <>
                <h4>Cerrar Cuenta</h4>
                <p>Cierra tu cuenta permanentemente</p>
            </>
        }else if(id=="seguridad"){
            return <>
                <h4>Seguridad de la Cuenta</h4>
                <p>Cambia la contraseña y manten segura tu cuenta</p>
            </>
        }else if(id=="mis-profesores"){
            return <>
                <h4>Mis profesores</h4>
                <p>Mira el listado de tus profesores y maneja sus invitaciones</p>
            </>
        }else if(id=="mis-estudiantes"){
            return <>
                <h4>Mis estudiantes</h4>
                <p>Invita a estudiantes y mira su desempeño académico </p>
            </>
        }else{
            window.location.href="/perfil/editar-perfil"
        }
    }
  return (
    <div className='perfil-header'>
        {handleContent()}
    </div>
  )
}

export default HeaderPerfil