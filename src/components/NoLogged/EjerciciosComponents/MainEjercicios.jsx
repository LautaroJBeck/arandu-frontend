import React from 'react'
import EjerciciosSidebar from './AuxiliarComponents/EjerciciosSidebar'
import ArticuloEjercicio from './AuxiliarComponents/ArticuloEjercicio'
import { useParams } from 'react-router-dom'


const MainEjercicios = () => {
  const url=useParams()
  return (
    <main>
        <EjerciciosSidebar url={url}/>
        <ArticuloEjercicio/>
    </main>
  )
}

export default MainEjercicios