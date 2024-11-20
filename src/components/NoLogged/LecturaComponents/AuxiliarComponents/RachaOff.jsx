import React from 'react'
import svgFire from "../../../../assets/svgs/svgFireOff.svg"
const RachaOff = ({racha}) => {

    const changeColors=(el,index)=>{
        if(index==2){
            return "Tuesday"
        }else if(index==3){
            return "Wednesday"
        }else{
            const valoresDiaDeLaSemana = {
                D: "Sunday",
                L: "Monday",
                J: "Thursday",
                V: "Friday",
                S: "Saturday"
            };
            return valoresDiaDeLaSemana[el]
        }
    }
    const devolverTitulo=(duracionRacha)=>{
        if(duracionRacha==1){
            return "Racha de 1 día"
        }else{
            return `Racha de ${duracionRacha} días`
        }
    }
    const obtenerFechasSemanaActualParaguay = () => {
        // Obtener la fecha y hora en Paraguay usando toLocaleString
        const paraguayanDate = new Date().toLocaleString("en-US", {
          timeZone: "America/Asuncion",
        });
        const fechaEnParaguay = new Date(paraguayanDate); // Convertir a objeto Date
      
        // Obtener el domingo de la semana actual
        const diaActual = fechaEnParaguay.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
        const diasDesdeDomingo = diaActual; // Ajuste para que domingo sea el primer día
        const primerDiaSemana = new Date(fechaEnParaguay);
        primerDiaSemana.setDate(primerDiaSemana.getDate() - diasDesdeDomingo);
      
        const diasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const fechasSemana = [];
      
        // Generar las fechas desde domingo hasta sábado
        for (let i = 0; i < 7; i++) {
          const fecha = new Date(primerDiaSemana);
          fecha.setDate(primerDiaSemana.getDate() + i); // Sumar días
      
          // Formatear la fecha al estilo DD-MM-YYYY
          const day = String(fecha.getDate()).padStart(2, "0");
          const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses de 0 a 11
          const year = fecha.getFullYear();
          const diaSemana = diasSemana[fecha.getDay()]; // Obtener el nombre del día
      
          fechasSemana.push({ fecha: `${year}-${month}-${day}`, dia: diaSemana });
        }
      
        return fechasSemana;
      };
      const generarChecks=()=>{
        const valoresDiaDeLaSemana={
            Sunday:"D",
            Monday:"L",
            Tuesday:"M",
            Wednesday:"M",
            Thursday:"J",
            Friday:"V",
            Saturday:"S"
        }
        return obtenerFechasSemanaActualParaguay().map((el,index)=>{
            console.log(el)
            if(racha.listaFechas.includes(el.fecha)){
                return <div className='day-container'>
                            <p className={`title-day-container ${el.dia==racha.diaDeLaSemana?"title-day-on":""}`}>{valoresDiaDeLaSemana[el.dia]}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="35" height="35">
                                <circle cx="25" cy="25" r="25" fill="#ff9600" />
                                <path d="M15 25l7 7 13-13" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
            }else{
                return <div className='day-container'>
                            <p className={`title-day-container ${el.dia==racha.diaDeLaSemana?"title-day-on":""}`}>{valoresDiaDeLaSemana[el.dia]}</p>
                            <div className="circle-off"></div>
                        </div>
                
                
            }
        })
    }
  return (
    <div className='racha-container-off'>
        <div className="informacion-racha">
            <div className='informacion-racha-texto'>
                <h4 className='duracion-racha'>{racha.duracionRacha?devolverTitulo(racha.duracionRacha):"Sin racha"}</h4>
                <p className='racha-sugerencia'>{`${racha.duracionRacha?`Realiza correctamente ${12-racha.cantidadEjerciciosHoy} ejercitarios más para extender tu racha`:`Realiza correctamente ${12-racha.cantidadEjerciciosHoy} ejercitarios más para comenzar una racha`}`}</p>
            </div>
            <div className='informacion-racha-icono'>
                <img src={svgFire} alt="" />
            </div>
        </div>
        <div className='calendario-racha'>
        {generarChecks()}
        </div>
    </div>
  )
}

export default RachaOff