import React from 'react'

const WarningModal = ({setShowWarningModal,setAuthorizeNext}) => {

    const handleNext=()=>{
        setAuthorizeNext(true)
        setShowWarningModal(false)
    }
  return (
<div className="warning-modal-content">
    <div className='warning-content-container'>
        <div>
            <i className="wrong-icon fa-solid fa-circle-exclamation"></i>
            <div className="warning-container">
                <span className="modal-message">
                    Saltear el ejercicio mostrará la respuesta correcta, pero
                    el ejercicio contará como incorrecto. ¿Estás seguro de saltear?
                </span>
            </div>
        </div>
        <div className='close-container'>
            <span 
                onClick={()=>setShowWarningModal(false)}
                className="close">&times;</span>
        </div>
    </div>
    <div className='warning-button-container'>
        <button 
        onClick={()=>handleNext()}
        className="warning-btn btn-confirm">Estoy seguro</button>
    </div>
</div>

  )
}

export default WarningModal