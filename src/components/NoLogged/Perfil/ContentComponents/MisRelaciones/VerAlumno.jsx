import React, { useEffect, useState } from 'react'
import apiLink from '../../../../../helpers/apiLink'
import Loader from '../../../../Loader/Loader'
import MostrarUnidad from '../MostrarUnidad';
import MostrarGeneral from '../MostrarGeneral';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import nombreApellido from '../../../../../helpers/nombreApellido';
dayjs.extend(relativeTime)
dayjs.locale("es")
const VerAlumno = ({id,setVerAlumno,nombre,apellido}) => {
    const [examenes,setExamenes]=useState([])
    const [focusExamen,setFocusExamen]=useState([])
    const [page,setPages]=useState({number:0,max:0})
    const [verExamen,setVerExamen]=useState()
    const [loader,setLoader]=useState(null)
    useEffect(() => {
        const peticion=async()=>{
            setLoader(true)
            let resExamen=await fetch(`${apiLink}/examen/historial/${id}`,{
                method:"GET",
                headers:{"Content-type":"application/json",}
            })
            let jsonExamen=await resExamen.json()
            setPages({...page,max:Math.ceil(jsonExamen.listaExamenes.length/5)})
            setExamenes(jsonExamen.listaExamenes.sort((a,b)=>b.examen_id-a.examen_id))
            setFocusExamen(jsonExamen.listaExamenes.slice(0,5))
            setLoader(false)
        }
        peticion()
    }, [])
    useEffect(()=>{
        if(examenes) setFocusExamen(examenes.slice(page.number,page.number+5))
    },[page])

    const handleRetroceder=()=>{
        if(page.number!=0) setPages({...page,number:page.number-5})
        
    }
    const handleAdelantar=()=>{
        if(page.max!=(page.number/5)+1) setPages({...page,number:page.number+5})
    }
    const handleVerExamen=async(el)=>{
        if(el.nivel=="general"){
            let resExamen=await fetch(`${apiLink}/examen/puntaje/${el.examen_id}/general`,{
                method:"GET",
                headers:{"Content-type":"application/json",}
            })
            let jsonExamen=await resExamen.json()
            setVerExamen({
                fecha:el.fecha,
                tipo:"general",
                total:el.total,
                datosListas:[
                    {tipo:"decodificacion",
                    puntosBasico:jsonExamen[0].basico_decodificacion,
                    puntosMedio:jsonExamen[0].medio_decodificacion,
                    puntosAvanzado:jsonExamen[0].avanzado_decodificacion
                    },
                    {tipo:"literal",
                    puntosBasico:jsonExamen[0].basico_literal,
                    puntosMedio:jsonExamen[0].medio_literal,
                    puntosAvanzado:jsonExamen[0].avanzado_literal
                    },
                    {tipo:"inferencial",
                    puntosBasico:jsonExamen[0].basico_inferencial,
                    puntosMedio:jsonExamen[0].medio_inferencial,
                    puntosAvanzado:jsonExamen[0].avanzado_inferencial
                    }
                ]
            })
        }else{
            let resExamen=await fetch(`${apiLink}/examen/puntaje/${el.examen_id}/${el.nivel}`,{
                method:"GET",
                headers:{"Content-type":"application/json",}
            })
            let jsonExamen=await resExamen.json()
            setVerExamen({
                fecha:el.fecha,
                total:el.total,
                nivel:el.nivel,
                decodificacion:jsonExamen[0].decodificacion,
                inferencial:jsonExamen[0].inferencial,
                literal:jsonExamen[0].literal
            })
            //setVerExamen({fecha:el.fecha,total:el.total,datosListas})
        }
    }
    const returnNombre=(el)=>{
        if(el.nivel=="basico"){
            return "Básico"
        }else{
           return el.nivel[0].toUpperCase() + el.nivel.slice(1);
        }
    }
    const devolverExamenes=()=>{
        return focusExamen.map((el,index)=>{
            return <div className={`examen-container ${index==0?"primero":""}`}>
            <div className="icon-container">
                <i className="fa-solid fa-book"></i>
            </div>
            <div className='fecha-container'>
                <span className="span-tiempo">{`Examen del ${dayjs(el.fecha).format('D [de] MMMM')} | ${returnNombre(el)} | ${el.total}/18`}</span>
                <span className="span-distancia-tiempo">{ dayjs(el.fecha).fromNow()}</span>
            </div>
            <div className="examen-button-container">
                <button onClick={()=>handleVerExamen(el)}>Ver examen</button>
            </div>
        </div>
        })
    }
    const mostrarExamenSeleccionado=()=>{
        if(verExamen.tipo=="general"){
            return <MostrarGeneral
            verExamen={verExamen}
            setVerExamen={setVerExamen}
            dayjs={dayjs}
            />
        }else{
            return <MostrarUnidad
            verExamen={verExamen}
            setVerExamen={setVerExamen}
            dayjs={dayjs}
            returnNombre={returnNombre}
            />
        }
    }
  return (
    <>
        {loader?<Loader/>:verExamen?<>
            {mostrarExamenSeleccionado()}
        </>:examenes.length>0?<>
        <h4 className='titulo-examenes'>Examenes de {nombreApellido(nombre,apellido)}</h4>
        <label htmlFor="">Historial de examenes</label>
        <div className="examenes-container">
            {focusExamen&&devolverExamenes()}
        </div>
        <div className="button-examenes-container">
            <div>
                <span className="pagina-number">Página {(page.number/5)+1}</span>
            </div>
            <div>
                <button 
                onClick={handleRetroceder}
                className={`button-atras ${page.number!=0?"activado":""}`}>Atrás</button>
                <span className='button-separator'>|</span>
                <button 
                onClick={handleAdelantar}
                className={`button-atras ${page.max!=(page.number/5)+1?"activado":""}`}>Adelante</button>
            </div>
        </div>
        <div className='button-changes-container'>
            <button 
            onClick={()=>setVerAlumno({mostrar:false,id:null,nombre:"",apellido:""})}
            className='button-changes changes-active'>Volver</button>
        </div>
    </>:<>
        <p>Este alumno todavía no ha tomado ningún examen</p>
    </>}
    </>
  )
}

export default VerAlumno