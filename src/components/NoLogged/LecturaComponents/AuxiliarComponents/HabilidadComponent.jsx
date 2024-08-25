import React from "react";
import { useContext } from "react";
import LoginContext from "../../../../context/LoginContext";
import ScoreContext from "../../../../context/ScoreContext";
import { Link } from "react-router-dom";
import tildeMinuscula from "../../../../helpers/tildeMinuscula";

const HabilidadComponent = ({nivel,titulo,tipo}) => {
  const {logged,setLogged}=useContext(LoginContext)
  const {score,setScore}=useContext(ScoreContext)
  
  const returnMensaje=()=>{
    let porcentaje=score[nivel][tipo]
    if(porcentaje==0){
      return "Empieza a practicar!"
    }else{
      return `${score[nivel][tipo]}% logrado` 
    }
  }
  const devolverIcono=()=>{
    let nivelIcono=score[nivel][tipo]
    if(nivelIcono==0){
      return <span>Sin puntaje</span>
    }else if(nivelIcono==25){
      return <i className="fa-regular fa-star icono-semicompleto"></i>
    }else if(nivelIcono==50){
      return <i className="fa-solid fa-star-half-stroke icono-semicompleto"></i>
    }else if(nivelIcono==75){
      return <i className="fa-solid fa-star icono-semicompleto"></i>
    }else if(nivelIcono==100){
      return <i className="fa-solid fa-star icono-completo"></i>
    }
  }
  return (
    <>
      <div className="habilidad-container">
        <h4>{titulo}</h4>
        <div className="habilities-container">
          <div className="aprender-section">
            <p>Aprender</p>
            <Link to={`/lectura/${nivel}/aprender/${tipo}`}>
              <i className="fa-solid fa-file"></i>
              <span>{`Guía: ${titulo} - ${tildeMinuscula(nivel)}`}</span>
            </Link>
          </div>
          <div className="practicar-section">
            <p>Practicar</p>
            <button className="boton-practicar">
              <div className="boton-practicar-informacion">
                <span className="boton-practicar-informacion-titulo">{`${titulo}: ${tildeMinuscula(nivel)}`}</span>
               {logged&&<Link className="boton-practicar-informacion-logrado">{returnMensaje()}</Link>} 
                {logged?
                <Link to={`/lectura/${nivel}/practicar/${tipo}`} className="boton-practicar-informacion-practica">Practica para aumentar tu nivel!</Link>: 
                <Link to={`/registro`} className="boton-practicar-informacion-practica">Registrate para empezar a practicar!</Link>}
              </div>
              {logged?<div className="boton-practicar-logo">
                {devolverIcono()}
              </div>:
                <>
              
              </>}

            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HabilidadComponent;
