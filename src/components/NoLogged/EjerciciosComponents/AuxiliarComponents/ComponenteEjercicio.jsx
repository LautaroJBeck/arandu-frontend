import React, { useEffect } from "react";

const ComponenteEjercicio = ({selectedOption,handleSelection,ejerciciosData,
  showAnswers,contenidoLi,setContenidoLi}) => {
 
  let letras=["a","b","c","d"]
  const {texto,explicacion_correcta,
    explicacion_incorrecta1,
    explicacion_incorrecta2,
    explicacion_incorrecta3,
    pregunta_correcta,
    pregunta_incorrecta1,
    pregunta_incorrecta2,
    pregunta_incorrecta3,
    subrayado
  }=ejerciciosData

  useEffect(() => {
    shuffleAnswers()
  }, [ejerciciosData])
  

  const retornarTexto=()=>{
    let arrays=texto.split("\n")
    const exp = new RegExp(`(?<!")(${subrayado})(?!")`, "g");
    if(texto.includes(subrayado)&&subrayado){
      arrays=arrays.map(el=>{
        let elModified=el.replace(exp,` <b class="subrayar-palabra">${subrayado}</b> `)
        return elModified
      })
    }
    return arrays.map((el,index)=>{
      return(
        <React.Fragment key={index}>
          <p className="texto-pregunta" dangerouslySetInnerHTML={{ __html: el }}/>
          <br />
        </React.Fragment>
      )
    })
  }
  const shuffleAnswers=()=>{
    let numerosAleatorios=[]
    let objetoFinal=[]
    while(numerosAleatorios.length<4){
      let numeroAleatorio=Math.floor(Math.random()*4)
      if(!numerosAleatorios.includes(numeroAleatorio)){
          numerosAleatorios.push(numeroAleatorio)
      }
    }
    let preguntas=[pregunta_correcta,
      pregunta_incorrecta1,
      pregunta_incorrecta2,
      pregunta_incorrecta3]
    let explicaciones=[explicacion_correcta,
      explicacion_incorrecta1,
      explicacion_incorrecta2,
      explicacion_incorrecta3] 
      
    objetoFinal=numerosAleatorios.map((numero,index)=>{
      return {
        pregunta:preguntas[numero],
        explicacion:explicaciones[numero],
        correcto:numero==0?true:false,
        index
      }
    })
    setContenidoLi(objetoFinal)
  }
  return (
    <>
    {ejerciciosData.hasOwnProperty("texto")?<div className="ejercicio-componente-container">
      <div className="question-container">
          {retornarTexto()}
        <b className="texto-selecciona">Selecciona una respuesta:</b>
      </div>
      <br />
      <ul className="answer-container">
          {contenidoLi.map((el,index)=>(
          <React.Fragment key={index}>
          {showAnswers[`${el.index+1}`]?(
            <>
            <li key={el.index}>
              <div>
                {el.correcto?(
                  <i className="fa-solid icono-correcto fa-circle-check"></i>
                ):(
                  <>
                  {showAnswers[`${el.index+1}`]==1?(
                    <i className="fa-solid icono-incorrecto-no-marcado fa-circle-minus"></i>
                  ):(  
                    <i className="fa-solid icono-incorrecto-marcado fa-circle-xmark"></i>
                  )}
                  </>
                )}
              </div>
              <div className="contenedor-texto-preguntas">
                {el.correcto?(
                  <>
                  <span className="texto-correcto">Correcto</span>
                  <span className="texto-pregunta">{el.pregunta}</span>
                  <span className="texto-explicacion">{el.explicacion}</span>
                  </>
                ):(
                  <>
                  {showAnswers[`${el.index+1}`]==1?
                  <span className="texto-incorrecto-no-marcado">Incorrecto</span>:
                  <span className="texto-incorrecto-marcado">Incorrecto</span>
                  }
                  <span className="texto-pregunta">{el.pregunta}</span>
                  <span className="texto-explicacion">{el.explicacion}</span>
                  </>
                )}
              </div>
            </li>
            
            </>
          ):<li onClick={()=>handleSelection(el.index+1)}>
              <div><i className={`fa-solid iconos-ejercicios fa-${letras[el.index]} ${selectedOption==(el.index+1)?"selected-option":""}`}></i></div>
              <p className="texto-pregunta">{el.pregunta}</p>
            </li>}
          
          </React.Fragment>
          ))}
      </ul>
      


    </div>:<></>}
    </>
  );
};

export default ComponenteEjercicio;
