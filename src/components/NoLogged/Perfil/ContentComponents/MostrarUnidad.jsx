import React from 'react'

const MostrarUnidad = ({verExamen,setVerExamen,dayjs,returnNombre}) => {
  return (
    <>
        <h4 className='titulo-tabla'>Examen de Nivel {returnNombre(verExamen)} del {dayjs(verExamen.fecha).format('D [de] MMMM, h:mmA')}</h4>
        <table className='unidad-table'>
        <thead>
            <tr>
                <th className='pc-th header-basic'>Puntajes</th>
                <th className="pc-th header-basic">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='pc-td'>Decodificación</td>
                <td className="pc-td puntaje">{verExamen.decodificacion}/6</td>
            </tr>
            <tr>
                <td className='td-gris pc-td'>Comprensión Literal</td>
                <td className="td-gris pc-td puntaje">{verExamen.literal}/6</td>
            </tr>
            <tr>
                <td className='pc-td'>Comprensión Inferencial</td>
                <td className="pc-td puntaje">{verExamen.inferencial}/6</td>
            </tr>
            <tr>
                <td className="td-gris pc-td">Total</td>
                <td className="td-gris pc-td puntaje">{verExamen.total}/18</td>
            </tr>
        </tbody>
        </table>
        <div className="button-changes-container">
            <button 
            onClick={()=>setVerExamen()}
            className='button-changes changes-active'>Volver</button>
        </div>
    </>
  )
}

export default MostrarUnidad