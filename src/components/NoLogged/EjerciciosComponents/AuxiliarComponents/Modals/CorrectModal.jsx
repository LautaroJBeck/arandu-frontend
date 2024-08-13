import React from "react";

export const CorrectModal = ({setShowCorrectModal}) => {
  return (
    <div className="modal-content">
      <span 
      onClick={()=>setShowCorrectModal()}
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
