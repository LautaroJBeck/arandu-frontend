import React from "react";

export const CorrectModal = ({setShowModal}) => {
  return (
    <div className="modal-content">
      <span 
      onClick={()=>setShowModal()}
      className="close">&times;</span>
      <div>
        <i className="success-icon fa-solid fa-circle-check"></i>
        <span className="modal-message">
          Excelente! Realizaste el ejercicio de manera correcta
        </span>
      </div>
    </div>
  );
};
