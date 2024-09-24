import React, { useEffect, useState } from 'react'
import "./HeaderNoLogged.css"
import "./hamburgers.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import LoginContext from '../../context/LoginContext'   
import logoArandu from "../../assets/imgs/logoArandu.png"
import apiLink from '../../helpers/apiLink'
import NameContext from '../../context/NameContext'
const HeaderNoLogged = () => {

    const {logged,setLogged}=useContext(LoginContext)
    const {name,setName}=useContext(NameContext)
    const [nombre,setNombre]=useState("")
    const [showMenu,setShowMenu]=useState(false)
    const [burgerMenu,setBurgetMenu]=useState(false)

    const handleShowMenu=()=>{
        setShowMenu(!showMenu)
        setBurgetMenu(false)
    }
    const handleBurgerMenu=()=>{
        setBurgetMenu(!burgerMenu)
        setShowMenu(false)
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            const getNombre=async()=>{
                if(name){
                    return 
                }else{
                    try{
                        let resToken=await fetch(`${apiLink}/login/token`,{
                          method:"POST",
                          headers:{
                            "Content-type":"application/json",
                            "Authorization":`Bearer ${localStorage.getItem("token")}`
                          }
                        })
                        let jsonToken=await resToken.json()
                        if(jsonToken.errors){
                            localStorage.removeItem("token")
                            location.reload()
                        }
                        console.log(jsonToken)
                        setName(`${jsonToken.decoded.nombre.split(" ")[0]} ${jsonToken.decoded.apellido.split(" ")[0]}`)
                      }catch(err){
                      }
                }
            }
            getNombre()
        }

    }, [])
    
    const cerrarSesion=()=>{
        localStorage.removeItem("token")
        localStorage.setItem("perfil-cambios",JSON.stringify({
            show:true,
            type:"success",
            message:"Tu sesión se cerró con éxito"
        }))
        window.location.href="/"
    }
    
  return (
    <header>
        <div className="header-container">
            <div className="header-links-container">
                <Link to="/" className='h2-container'>
                    <img src={logoArandu} alt="Logo de Arandu" />
                    <span>Arandu</span>
                </Link>
                <ul className='ul-links'>
                    <li className="link-hover">
                        <Link className="links-header"><span>Aprender</span><i className="fa-solid fa-chevron-down"></i></Link>
                        <ul className="submenu">
                            <li>
                                Comprensión lectora <i className="fa-solid fa-chevron-right"></i>
                                <ul className="submenu2">
                                    <li><Link to="/lectura/fundamentos">Fundamentos de la comprensión lectora</Link></li>
                                    <li><Link to="/lectura/basico">Nivel básico de comprensión lectora</Link></li>
                                    <li><Link to="/lectura/medio">Nivel medio de comprensión lectora</Link></li>
                                    <li><Link to="/lectura/avanzado">Nivel avanzado de comprensión lectora</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="link-hover"><a className="links-header" href="/#home">Inicio</a></li>
                    <li className="link-hover"><a className="links-header" href="/#mision">Misión</a></li>
                    <li className="link-hover"><a className="links-header" href="/#programa">Nuestro programa</a></li>
                </ul>

            </div>
            {logged?<>
                <div className='center-menus'>
                    <div className='hamburger-container'>
                        <button 
                        onClick={()=>handleBurgerMenu()}
                        className={`hamburger hamburger--squeeze ${burgerMenu?"is-active":""}`} type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                        <ul className={`menu-links-burger ${burgerMenu?"menu-burger-show":""}`}>
                            <li className="link-burger"><Link 
                            onClick={()=>handleBurgerMenu()}
                            className="links-header-burger" to="/lectura/fundamentos">Fundamentos de la Comprensión Lectora</Link></li>
                            <li className="link-burger"><Link 
                            onClick={()=>handleBurgerMenu()}
                            className="links-header-burger" to="/lectura/basico">Nivel Básico de la Comprensión Lectora</Link></li>
                            <li className="link-burger"><Link 
                            onClick={()=>handleBurgerMenu()}
                            className="links-header-burger" to="/lectura/medio">Nivel Medio de la Comprensión Lectora</Link></li>
                            <li className="link-burger"><Link 
                            onClick={()=>handleBurgerMenu()}
                            className="links-header-burger" to="/lectura/avanzado">Nivel Avanzado de la Comprensión Lectora</Link></li>
                            <li className="link-burger"><Link 
                            onClick={()=>handleBurgerMenu()}
                            className="links-header-burger" to="/examen/general">Tomar examen general</Link></li>
                            <li className="link-burger"><a className="links-header-burger" href="/#home">Inicio</a></li>
                            <li className="link-burger"><a className="links-header-burger" href="/#mision">Misión</a></li>
                            <li className="link-burger"><a className="links-header-burger" href="/#programa">Nuestro programa</a></li>
                        </ul>  
                    </div>
                <nav 
                    onClick={()=>handleShowMenu()}
                    className='header-profile-container'>
                <i 
                className="fa-solid fa-user">
                    <ul className={`menu-links ${showMenu ? "menu-links-show" : ""}`}>
                        <li><Link className="link-perfil" to="/perfil/aprendizaje">Mi aprendizaje</Link></li>
                        <li><Link className="link-perfil" to="/perfil/editar-perfil">Mi perfil</Link></li>
                        <li><Link className="link-perfil" to="/perfil/seguridad">Seguridad</Link></li>
                        <li><button 
                        onClick={()=>cerrarSesion()}
                        className="link-perfil" >Cerrar sesión</button></li>
                    </ul>   
                </i>
                <span className='span-nombre'>{name}</span>
            </nav>
                </div>
            </>:<>
                <nav className='header-list-container'>
                <Link className="login-links link-sesion " to="/login">Iniciar sesión</Link>
                <Link className="login-links link-registro" to="/registro">Registrate gratis</Link>
            </nav>
            <div className='hamburger-container'>
                <button 
                    onClick={()=>handleBurgerMenu()}
                    className={`hamburger hamburger--squeeze ${burgerMenu?"is-active":""}`} type="button">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <ul className={`menu-links-burger ${burgerMenu?"menu-burger-show":""}`}>
                        <li className="link-burger"><Link 
                        onClick={()=>handleBurgerMenu()}
                        className="links-header-burger" to="/login">Iniciar sesión</Link></li>
                        <li className="link-burger"><Link 
                        onClick={()=>handleBurgerMenu()}
                        className="links-header-burger" to="/registro">Registro</Link></li> 
                        <li className="link-burger"><Link 
                        onClick={()=>handleBurgerMenu()}
                        className="links-header-burger" to="/lectura/basico">Empezar a aprender</Link></li>
                        <li className="link-burger"><a onClick={()=>handleBurgerMenu()} className="links-header-burger" href="/#home">Inicio</a></li>
                        <li className="link-burger"><a onClick={()=>handleBurgerMenu()} className="links-header-burger" href="/#mision">Misión</a></li>
                        <li className="link-burger"><a onClick={()=>handleBurgerMenu()} className="links-header-burger" href="/#programa">Nuestro programa</a></li>
   
                    </ul>  
            </div>


            </>}
        </div>
    </header>
  )
}

export default HeaderNoLogged