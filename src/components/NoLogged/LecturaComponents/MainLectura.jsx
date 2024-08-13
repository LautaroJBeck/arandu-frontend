import React, { useEffect } from 'react'
import LecturaSideBar from './LecturaSideBar'
import ArticulosLectura from './ArticulosLectura'
import { useContext } from 'react'
import ScoreContext from '../../../context/ScoreContext'
import LoginValueContext from '../../../context/LoginValueContext'

const MainLectura = ({ruta}) => {

    const {score,setScore}=useContext(ScoreContext)
    const {loggedValue,setLoggedValue}=useContext(LoginValueContext)
    
  return (
    <>
    <main>
        <LecturaSideBar url={ruta.id}/>
        <ArticulosLectura url={ruta.id}/>
    </main>
    </>
  )
}

export default MainLectura