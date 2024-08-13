import React from 'react'

const IncorrectModal = ({setShowIncorrectModal}) => {
  return (
    <div className="modal-content">
      <span 
      onClick={()=>setShowIncorrectModal()}
      className="close">&times;</span>
      <div>
        <i className="wrong-icon fa-solid fa-circle-exclamation"></i>
        <span className="modal-message">
          No has encontrado la respuesta aún, intenta otra vez!
        </span>
      </div>
    </div>
  )
}

export default IncorrectModal