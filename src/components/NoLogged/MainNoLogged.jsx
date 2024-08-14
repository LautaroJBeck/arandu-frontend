import React from 'react'
import "./MainNoLogged.css"
import img_home from "../../assets/imgs/pictureHome.png"
import img_notebook from "../../assets/imgs/notebookArandu.png"
import img_graduation from "../../assets/imgs/gradautionCap.png"
import img_school from "../../assets/imgs/school.png"
import img_profesor from "../../assets/imgs/pizarraVerde.png"
import img_alumnos from "../../assets/imgs/alumnos.png"
import { Link } from 'react-router-dom'
import { useInView } from "react-intersection-observer";
const MainNoLogged = () => {
  const { ref:underlineRef, inView:underlineIsVisible } = useInView(({
    triggerOnce: true, // La animación se dispara solo la primera vez
    threshold: 0.5 // Se activa cuando el 10% del elemento es visible
  }));
  const {ref:thirdSlideRef,inView:thirdIsVisible}=useInView({
    triggerOnce: true, // La animación se dispara solo la primera vez
    threshold: 0.5 // Se activa cuando el 10% del elemento es visible
  })
  return (
    <main>
      
      <div id="home" className="primer-slide">
        <div className='primer-text-container'>
          <div className="h2-container">
            <h2>Mejorar tu capacidad de lectura y escritura garantiza un mejor futuro!</h2>
          </div>
          <div className="primer-bandera-paraguay">
            <div className='cuadrado-rojo'></div>
            <div className='cuadrado-blanco'></div>
            <div className='cuadrado-azul'></div>
          </div>
          <div className="primer-text-parrafos-container">
            <p>Somos una organizacion paraguaya sin fines de lucro que busca disminuir el analfabetismo funcional</p>
            <br />
            <p>Construye buenas habilidades de <Link to="/lectura/fundamentos" className="primer-text-link">escritura y lectura</Link> usando Arandu!</p>
          </div>
          <br className='desaparecer'/>
          <br />
          <div className="primer-button-container">
            <Link to="/lectura/basico">Empezar a practicar</Link>
            <Link to="/registro">Registrarse</Link>
          </div>
          <br />
          <br className='desaparecer'/>
          <div className="primer-beneficios-container">
            <div>
              <i className="fa-regular fa-id-card"></i>
              <span>Acceso fácil</span>
            </div>
            <div>
              <i className="fa-solid fa-unlock-keyhole"></i>
              <span>100% gratis</span>
            </div>
            <div>
              <i className="fa-solid fa-user-check"></i>
              <span>Extensivo y amplio</span>
            </div>
          </div>
        </div>
        <div className="primer-image-container">
          <img loading="lazy" src={img_home} alt="Jovenes leyendo" />
        </div>
      </div>



      <div className="segundo-slide">
        <div className="segundo-beneficios">
          <img loading="lazy" src={img_profesor} alt="Profesor" />
          <h4>Aprendizaje personalizado</h4>
          <p>Los estudiantes practican a su propio ritmo. Arandu ofrece ejercicios de distintos niveles para todos los estudiantes </p>
        </div>
        <div className="segundo-beneficios">
          <img loading="lazy" src={img_alumnos} alt="Alumnos y profesor" />
          <h4>Herramientas para profesores</h4>
          <p>Con Arandu, los profesores pueden identificar huecos en la comprensión lectora de sus estudiantes y entender sus necesidades académicas</p>
        </div>
        <div className="segundo-beneficios last">
          <img loading="lazy" src={img_school} alt="Colegio Arandu" />
          <h4>Accesibilidad</h4>
          <p>Usando Arandu, cualquiera puede reforzar sus habilidades de lectura y escritura desde cualquier lugar, en cualquier momento </p>
        </div>
      </div>


      <div className="slide-adicional">
        <h4><p>Tú puedes <span 
          className={`${underlineIsVisible?"animar-subrayado":""}`}
          ref={underlineRef}>aprender</span> cualquier cosa!</p></h4>
        <img loading="lazy" src={img_graduation} alt="Gorro de graduacion" className="fa-solid fa-graduation-cap"/>
      </div>



      <div 
      ref={thirdSlideRef}
      className={`tercer-slide`}
      id="mision">
        <div className="tercer-slide-img">
          <img loading="lazy" src={img_notebook} alt="Computadora Arandu" />
          
        </div>
        <div className={`${thirdIsVisible?"animar-tercer-slide":""} tercer-slide-text`}>
          <h4>Nuestra misión</h4>
          <p className="tercer-p tercer-lema">"Un salón de clases dentro de cada dispositivo"</p>
          <p className='tercer-p'>
            Arandu busca desarrollar buenas habilidades de comprensión lectora y escritura en los paraguayos. Con Arandu, queremos contribuir a garantizar las mismas oportunidades a todos los paraguayos a través de la tecnología.
          </p>
          <Link to="/lectura/basico">Empezar a aprender</Link>
        </div>
      </div>

      <div id="programa" className='cuarto-slide'>
        <div className="cuarto-slide-text">
            <h4>Nuestro programa</h4>
            <p className='cuarto-p'>
              Utilizamos un plan estructurado para contribuir a un mejor aprendizaje. Ofrecemos diferentes tipos de ejercicios y textos para que el estudiante pueda reforzar su comprensión lectora  
            </p>
            <Link to="/lectura/fundamentos">Entiende más sobre el programa</Link>
        </div>
        <div 
        className="cuarto-programa-container">
          <div className={`programa-container`}>
            <div className="programa-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <div 
            className={`cuarto-text`}>
              <h4>1. Registro</h4>
              <p>Para empezar a aprender, un estudiante debe registrarse dentro de la aplicación. Un usuario registrado tiene acceso ilimitado a todos los recursos didacticos de Arandu</p>
            </div>
          </div>
          <div className={`programa-container`}>
            <div className="programa-icon">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className={`cuarto-text`}>
              <h4>2. Identificar debilidades</h4>
              <p>Arandu permite tomar un examen evaluatorio para que el estudiante pueda identificar areas en las que reforzar su comprensión lectora</p>
            </div>
          </div>
          <div className={`programa-container`}>
            <div className="programa-icon">
              <i className="fa-solid fa-book"></i>
            </div>
            <div className={`cuarto-text`}>
              <h4>3. Empezar a aprender</h4>
              <p>Arandu ofrece diferentes tipos de ejercicios y textos para garantizar un aprendizaje completo</p>
            </div>
          </div>
        </div>
      </div>


    </main>
  )
}

export default MainNoLogged