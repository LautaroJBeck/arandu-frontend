import React from 'react'

const MostrarGeneral = ({verExamen,setVerExamen,dayjs}) => {
  return (
    <>
        <h4 className='titulo-tabla'>Examen general del {dayjs(verExamen.fecha).format('D [de] MMMM, h:mmA')}</h4>
        <table className='pc-table'>
        <thead>
            <tr>
                <th className='pc-th header-basic'>Puntajes</th>
                <th className="pc-th header-basic">Básico</th>
                <th className="pc-th header-basic">Medio</th>
                <th className="pc-th header-basic">Avanzado</th>
                <th className="pc-th header-basic">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='pc-td'>Decodificación</td>
                <td className="pc-td puntaje">{verExamen.datosListas[0].puntosBasico}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[0].puntosMedio}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[0].puntosAvanzado}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[0].puntosBasico+verExamen.datosListas[0].puntosMedio+verExamen.datosListas[0].puntosAvanzado}/6</td>
            </tr>
            <tr>
                <td className='td-gris pc-td'>Comprensión Literal</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[1].puntosBasico}/2</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[1].puntosMedio}/2</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[1].puntosAvanzado}/2</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[1].puntosBasico+verExamen.datosListas[1].puntosMedio+verExamen.datosListas[1].puntosAvanzado}/6</td>
            </tr>
            <tr>
                <td className='pc-td'>Comprensión Inferencial</td>
                <td className="pc-td puntaje">{verExamen.datosListas[2].puntosBasico}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[2].puntosMedio}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[2].puntosAvanzado}/2</td>
                <td className="pc-td puntaje">{verExamen.datosListas[2].puntosBasico+verExamen.datosListas[2].puntosMedio+verExamen.datosListas[2].puntosAvanzado}/6</td>
            </tr>
            <tr>
                <td className="td-gris pc-td">Total</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[0].puntosBasico+verExamen.datosListas[1].puntosBasico+verExamen.datosListas[2].puntosBasico}/6</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[0].puntosMedio+verExamen.datosListas[1].puntosMedio+verExamen.datosListas[2].puntosMedio}/6</td>
                <td className="td-gris pc-td puntaje">{verExamen.datosListas[0].puntosAvanzado+verExamen.datosListas[1].puntosAvanzado+verExamen.datosListas[2].puntosAvanzado}/6</td>
                <td className="td-gris pc-td puntaje">{verExamen.total}/18</td>
            </tr>
        </tbody>
    </table>
    {/*SEPARACION ENTRE TABLAS */}
    <table className="rp-table">
        <thead>
            <tr>
                <th className='rp-th header-basic'>Puntajes</th>
                <th className='rp-th header-basic'>Decodificación</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='rp-td '>Básico</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[0].puntosBasico}/2</td>
            </tr>
            <tr>
                <td className='td-gris rp-td '>Medio</td>
                <td className='td-gris rp-td puntaje'>{verExamen.datosListas[0].puntosMedio}/2</td>
            </tr>
            <tr>
                <td className='rp-td '>Avanzado</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[0].puntosAvanzado}/2</td>
            </tr>
            <tr className="total-row">
                <td className='td-gris  rp-td '>Total</td>
                <td className='td-gris  rp-td puntaje'>{verExamen.datosListas[0].puntosBasico+verExamen.datosListas[0].puntosMedio+verExamen.datosListas[0].puntosAvanzado}/6</td>
            </tr>
        </tbody>
    </table>
    <table className="rp-table">
        <thead>
            <tr>
                <th className='rp-th header-basic'>Puntajes</th>
                <th className='rp-th header-basic'>Comprensión Literal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='rp-td '>Básico</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[1].puntosBasico}/2</td>
            </tr>
            <tr>
                <td className='td-gris rp-td '>Medio</td>
                <td className='td-gris rp-td puntaje'>{verExamen.datosListas[1].puntosMedio}/2</td>
            </tr>
            <tr>
                <td className='rp-td '>Avanzado</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[1].puntosAvanzado}/2</td>
            </tr>
            <tr className="total-row">
                <td className='td-gris  rp-td '>Total</td>
                <td className='td-gris  rp-td puntaje'>{verExamen.datosListas[1].puntosBasico+verExamen.datosListas[1].puntosMedio+verExamen.datosListas[1].puntosAvanzado}/6</td>
            </tr>
        </tbody>
    </table>
    <table className="rp-table">
        <thead>
            <tr>
                <th className='rp-th header-basic'>Puntajes</th>
                <th className='rp-th header-basic'>Comprensión Inferencial</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='rp-td '>Básico</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[2].puntosBasico}/2</td>
            </tr>
            <tr>
                <td className='td-gris rp-td '>Medio</td>
                <td className='td-gris rp-td puntaje'>{verExamen.datosListas[2].puntosMedio}/2</td>
            </tr>
            <tr>
                <td className='rp-td '>Avanzado</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[2].puntosAvanzado}/2</td>
            </tr>
            <tr className="total-row">
                <td className='td-gris  rp-td '>Total</td>
                <td className='td-gris  rp-td puntaje'>{verExamen.datosListas[2].puntosBasico+verExamen.datosListas[2].puntosMedio+verExamen.datosListas[2].puntosAvanzado}/6</td>
            </tr>
        </tbody>
    </table>
    <table className="rp-table">
        <thead>
            <tr>
                <th className='rp-th header-basic'>Puntajes</th>
                <th className='rp-th header-basic'>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='rp-td '>Decodificación</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[0].puntosBasico+verExamen.datosListas[0].puntosMedio+verExamen.datosListas[0].puntosAvanzado}/6</td>
            </tr>
            <tr>
                <td className='td-gris rp-td '>Comprensión literal</td>
                <td className='td-gris rp-td puntaje'>{verExamen.datosListas[1].puntosBasico+verExamen.datosListas[1].puntosMedio+verExamen.datosListas[1].puntosAvanzado}/6</td>
            </tr>
            <tr>
                <td className='rp-td '>Comprensión inferencial</td>
                <td className='rp-td puntaje'>{verExamen.datosListas[2].puntosBasico+verExamen.datosListas[2].puntosMedio+verExamen.datosListas[2].puntosAvanzado}/6</td>
            </tr>
            <tr className="total-row">
                <td className='td-gris  rp-td '>Total</td>
                <td className='td-gris  rp-td puntaje'>{verExamen.total}/18</td>
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

export default MostrarGeneral