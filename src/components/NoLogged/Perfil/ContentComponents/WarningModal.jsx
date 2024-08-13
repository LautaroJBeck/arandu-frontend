import React from 'react'

const WarningModal = ({message,type}) => {
  return (
    <div className="modal-content">
    <span 
    onClick={()=>setShowModal()}
    className="close">&times;</span>
    <div>
      {type=="success"?<i className="success-icon fa-solid fa-circle-check"></i>:<></>}
      
      <span className="modal-message">
        {message}
      </span>
    </div>
  </div>
  )
}

export default WarningModal