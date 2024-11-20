import React from 'react'


const RachaComponent = ({rachas}) => {
    
    const obtenerFechasRangoParaguay = () => {
        // Obtener la fecha y hora actual en Paraguay usando toLocaleString
        const paraguayanDate = new Date().toLocaleString("en-US", {
            timeZone: "America/Asuncion",
        });
        const fechaEnParaguay = new Date(paraguayanDate); // Convertir a objeto Date
    
        // Obtener la fecha de hoy
        const hoy = new Date(fechaEnParaguay);
    
        // Calcular la fecha del mismo día del año pasado
        const fechaInicio = new Date(hoy);
        fechaInicio.setFullYear(hoy.getFullYear() - 1);
    
        // Calcular el último día del mes actual
        const ultimoDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
        const fechas = [];
        let fechaActual = new Date(fechaInicio);
    
        // Generar todas las fechas en el rango, incluyendo el último día del mes actual
        while (fechaActual <= ultimoDiaMesActual) {
            const day = String(fechaActual.getDate()).padStart(2, "0");
            const month = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Meses de 0 a 11
            const year = fechaActual.getFullYear();
    
            fechas.push(`${year}-${month}-${day}`);
            fechaActual.setDate(fechaActual.getDate() + 1); // Avanzar un día
        }
    
        // Validación final: asegurar que el último día del mes actual esté incluido
        const ultimoDia = String(ultimoDiaMesActual.getDate()).padStart(2, "0");
        const ultimoMes = String(ultimoDiaMesActual.getMonth() + 1).padStart(2, "0");
        const ultimoAnio = ultimoDiaMesActual.getFullYear();
        const ultimaFecha = `${ultimoAnio}-${ultimoMes}-${ultimoDia}`;
    
        if (!fechas.includes(ultimaFecha)) {
            fechas.push(ultimaFecha); // Asegurar que el último día esté presente
        }
    
        return fechas;
    };
    const agruparFechasPorMes = () => {
        const fechas = obtenerFechasRangoParaguay();
    
        // Array con nombres de los meses
        const nombresMeses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
    
        // Obtener la fecha actual en Paraguay
        const paraguayanDate = new Date().toLocaleString("en-US", {
            timeZone: "America/Asuncion",
        });
        const fechaEnParaguay = new Date(paraguayanDate);
        const mesActual = fechaEnParaguay.getMonth() + 1; // Mes actual (1-12)
        const anioActual = fechaEnParaguay.getFullYear(); // Año actual
    
        // Crear estructura para 12 meses
        const meses = Array.from({ length: 12 }, (_, index) => ({
            nombreMes: nombresMeses[index],
            year: null,
            dias: [],
        }));
        // Agrupar las fechas por mes, ignorando el mes actual pero del año pasado
        fechas.forEach((fecha) => {
            const [year, month, day] = fecha.split("-"); // Separar el año, mes y día
            const mesIndex = parseInt(month, 10) - 1; // Convertir mes a índice (0-11)
    
            // Ignorar el mes actual pero del año pasado
            if (parseInt(year, 10) === anioActual - 1 && parseInt(month, 10) === mesActual) {
                return;
            }
    
            // Añadir el año al grupo del mes si no está definido
            if (!meses[mesIndex].year || meses[mesIndex].year < parseInt(year, 10)) {
                meses[mesIndex].year = year;
            }
    
            // Agregar el día y la fecha completa al array de días
            meses[mesIndex].dias.push({ dia: parseInt(day, 10), fechaCompleta: fecha });
        });
        let lista2024=[]
        let lista2023=[]
        meses.forEach((el)=>{
            if(el.year=="2024"){
                lista2024.push(el)
            }else{
                lista2023.push(el)
            }
        })
        return [...lista2023,...lista2024].reverse();
    };
    
    const obtenerDiaSemana = (fecha) => {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        
        // Convertir la fecha en formato YYYY-MM-DD a un objeto Date
        const fechaObjeto = new Date(fecha);
    
        // Obtener el índice del día de la semana (0 = Domingo, 6 = Sábado)
        const diaSemana = fechaObjeto.getDay();
    
        // Retornar el nombre del día de la semana
        return diasSemana[diaSemana];
    }; 
    const devolverDias=(array)=>{
        const diasSemana={
            6:0,
            0:1,
            1:2,
            2:3,
            3:4,
            4:5,
            5:6
        }

        let listaAgregar=[]
        
        for(let i=0;i<diasSemana[new Date(array[0].fechaCompleta).getDay()];i++){
            listaAgregar.push(0);
        }
        const paraguayanDate = new Date().toLocaleString("en-US", {
            timeZone: "America/Asuncion",
          });
        const formattedDate = new Date(paraguayanDate).toISOString().split("T")[0];
        array.forEach((el=>{
            let estilos=false;
            if(rachas.listaFechas.includes(el.fechaCompleta)){
                estilos=true
            }
            if(el.fechaCompleta==formattedDate){
                listaAgregar.push([el.dia,estilos,true])
            }else{
                listaAgregar.push([el.dia,estilos,false])
            }
        }))
        return listaAgregar.map(el=>{
            if(el==0){
                return <div className='date'></div>
            }else{
                return <div className={`date ${el[1]?"racha-day":""} ${el[2]?"current-day":""}`}>{el[0]}</div>
            }
        })
    }
  return (
    <>
    {agruparFechasPorMes().map(el=>(
    <div className='calendar-container'>
        <div className='month-container'>
            <h4>{`${el.nombreMes.toUpperCase()} ${el.year}`}</h4>
        </div>
        <div className="calendar-grid">
            <div className="day">D</div>
            <div className="day">L</div>
            <div className="day">M</div>
            <div className="day">M</div>
            <div className="day">J</div>
            <div className="day">V</div>
            <div className="day">S</div>
            {devolverDias(el.dias)}
        </div>
    </div>
    ))}
    </>
  )
}

export default RachaComponent