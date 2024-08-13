import React, { useEffect } from "react";
import "./VistaFundamentos.css";
const VistaFundamentos = () => {

  useEffect(() => {
    document.title=`Unidad 1: Fundamentos de la comprensión lectora | Arandu`
  }, [])

  return (
    <div className="fundamentos-container">
      <h1>Unidad 1: Fundamentos de la comprensión lectora</h1>
      <div className="texto-container">
        <div className="comprension-lectora-container contenedores-vista">
          <h2>Comprensión lectora</h2>
          <p>
            La comprensión lectora es el proceso cognitivo orientado a entender
            el significado de un texto.
          </p>
          <p>
            Para que lector sea capaz de comprender el texto que lee, no
            solamente es necesario que reconozca las palabras que observa.
            También es necesario que las relacione formando una oración con su
            propio sentido, para luego conectarlas y componer un significado
            global dentro del texto que leyó.
          </p>
        </div>
        <div className="niveles-comprension-container contenedores-vista">
          <h2>¿Cómo clasificamos los niveles de comprensión lectora?</h2>
          <p>
            En Arandu, clasificamos la comprensión lectora dentro de 4 niveles:
          </p>
          <ul>
            <li>
              <h3>Decodificación</h3>
              <p>
                Es el proceso en el que el lector reconoce las palabras
                individualmente y les asigna un significado léxico.
              </p>
            </li>
            <li>
              <h3>Comprensión literal</h3>
              <p>
                Se refiere a una comprensión explícita y objetiva del texto.
                Este nivel accede estrictamente a la información contenida
                dentro del texto sin ir más allá del mismo
              </p>
            </li>
            <li>
              <h3>Comprensión inferencial</h3>
              <p>
                Es establecer relaciones entre partes del texto para inferir
                información, conclusiones o aspectos que no están escritos. El
                lector completa el texto con el ejercicio de su pensamiento
              </p>
            </li>
            <li>
              <h3>Comprensión crítica y argumentativa</h3>
              <p>
                Implica un ejercicio de valoración y de formación de juicios. Se
                refiere al nivel de conocimientos necesarios para reflexionar y
                argumentar con respuestas subjetivas al texto leído.
              </p>
            </li>
          </ul>
        </div>
        <div className="tipos-texto-container contenedores-vista">
          <h2>¿Cómo clasificamos los textos?</h2>

          <p>
            La comprensión lectora puede ser un concepto muy amplio, por ende,
            es poco adecuado medir el nivel de comprensión lectora de una
            persona tomando en cuenta solamente un tipo de texto. Reconocemos
            que las capacidades de lectura de una persona pueden variar
            dependiendo de la estructura y del tipo de texto que está
            observando.
          </p>
          <p>
            Por ende, Arandu usa 6 tipos de textos para medir y enseñar la
            comprensión lectora:
          </p>
          <ul>
            <li>
              <h3>Textos informativos</h3>
              <p>
                Centrados en la prosa periodística, cuya función es la de
                transmitir una determinada información al lector, sea esta
                cercana o lejana a su contexto. Se centran en la prosa
                periodística, su función es transmitir información al lector
              </p>
            </li>
            <li>
              <h3>Textos documentarios</h3>
              <p>Implican la comprensión de gráficos y cuadros</p>
            </li>
            <li>
              <h3>Textos numericos</h3>
              <p>Exigen el uso de operaciones matemáticas básicas.</p>
            </li>
            <li>
              <h3>Textos cientificos</h3>
              <p>
                Son textos producidos por científicos para divulgar resultados
                producidos por ciertas investigaciones
              </p>
            </li>
            <li>
              <h3>Textos literarios</h3>
              <p>
                Usan el lenguaje para transmitir pensamientos, sensaciones o
                historias, son una expresión artística y creativa a través de
                las palabras
              </p>
            </li>
            <li>
              <h3>Textos humanisticos</h3>
              <p>
                Tratan de algún aspecto de las ciencias humanas, usualmente
                tocan temas filosóficos, sociológicos, psicológicos, históricos,
                etc
              </p>
            </li>
          </ul>
        </div>
        <div className="como-ensenamos-decodificacion contenedores-vista">
          <h2>¿Como enseñamos la decodificación?</h2>
          <p>
            Para entrenar la decodificación usamos los siguientes tipos de
            ejercicios:
          </p>
          <ul>
            <li>
              <h3>Palabras en contexto</h3>
              <p>
                Busca que el lector sea capaz de detectar cual es la palabra
                dentro de la lista de opciones que se ajusta perfectamente al
                texto y refuerza su significado global
              </p>
            </li>
            <li>
              <h3>Reconocimiento del significado: </h3>
              <p>
                El ejercicio requerirá que el lector identifique el significado
                de una palabra en particular dado el contexto general de un
                texto
              </p>
            </li>
          </ul>
        </div>
        <div className="como-ensenamos-literal contenedores-vista">
          <h2>¿Cómo enseñamos la comprensión literal?</h2>
          <p>
            Para entrenar la comprensión literal usamos los siguientes tipos de
            ejercicios:
          </p>
          <ul>
            <li>
              <h3>Ideas centrales y detalles</h3>
              <p>
                Una vez leído el texto, se le requerirá al lector identificar la
                idea central o responder una pregunta especifica basada en el
                texto
              </p>
            </li>
            <li>
              <h3>Conexiones y conflictos entre textos</h3>
              <p>
                Estos ejercicios piden al lector que comparen dos puntos de
                vista de autores distintos.
              </p>
            </li>
            <li>
              <h3>Estructura del texto y propósito: </h3>
              <p>
                Pide al lector identificar el propósito principal o la
                estructura general del texto
              </p>
            </li>
          </ul>
        </div>
        <div className="como-ensenamos-inferencial contenedores-vista">
          <h2>¿Como enseñamos comprensión inferencial?</h2>
          <p>
            Para entrenar la comprensión inferencial usamos los siguientes tipos
            de ejercicios:
          </p>
          <ul>
            <li>
              <h3>Inferencias</h3>
              <p>
                Basándose en el texto, el lector debe elegir la opción que
                completa el texto de manera más lógica
              </p>
            </li>
            <li>
              <h3>Evidencias textuales: </h3>
              <p>
                El lector debe identificar la opción que contenga evidencia que
                respalde de mejor manera una afirmación hallada dentro del texto
              </p>
            </li>
            <li>
              <h3>Evidencia numérica: </h3>
              <p>
                Este ejercicio mostrará un gráfico con información númerica,
                ofrecerá un texto que contextualice el gráfico y pedirá al
                lector completar una oración utilizando datos del gráfico
              </p>
            </li>
          </ul>
        </div>
        <div className="como-ensenamos-critica contenedores-vista">
          <h2>¿Cómo enseñamos la comprensión crítica y argumentativa?</h2>
          <p>
            Para practicarla, el lector tiene que ser capaz de argumentar y
            producir un juicio subjetivo al texto leído. Al no existir un
            criterio a través del cual afirmar que una opinión es más válida o
            mejor estructurada que otra, entrenar este nivel de compresión
            lectora se escapa de nuestras manos como organización. Sin embargo,
            seguiremos buscando tácticas educativas como para mejorar nuestra
            aplicación y desarrollar la comprensión lectora y el pensamiento
            crítico de nuestros alumnos
          </p>
        </div>
      </div>
    </div>
  );
};

export default VistaFundamentos;
