import React from 'react'

const ExamenHeader = ({url}) => {
  return (
    <div className='ejercicios-header'>
        <h3 className="ejercicios-header-titulo">Examen evaluativo de nivel {url}</h3>
    </div>
  )
}

export default ExamenHeader