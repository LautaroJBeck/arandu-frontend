import React, { useState } from "react";
import svg from "../../../assets/imgs/svg1.png";
import star from "../../../assets/imgs/star.png"
import "./LoginComponent.css";
import { Link } from "react-router-dom";
import apiLink from "../../../helpers/apiLink";
import Loader from "../../Loader/Loader";
const LoginComponent = () => {
    const [error,setError]=useState("")
    const [values,setValues]=useState({
        correo:"",
        password:""
    })
    const [showPassword,setShowPassword]=useState(false)
    const [loader,setLoader]=useState(null)
    
    const handleValue=(e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }  
    const handleSubmit=async(e)=>{
        
        e.preventDefault()
        setLoader(true)
        try{
            console.log(apiLink)
            let res=await fetch(`${apiLink}/login`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(values)
            })
            let json=await res.json();
            if(json.errors){
                if(typeof json.errors[0]=="object"){
                    setError(json.errors[0].msg)
                }else{

                    setError(json.errors[0])
                }
            }else if(json.token){
                localStorage.setItem("token",json.token);
                window.location.href="/lectura/basico"
            }   
        }catch(err){
            console.log(err)
        }
        setLoader(false)
    }

  return (
    <main className="login-main-container">
      <div className="login-container">
        <div className="login-image-container">
            <img loading="lazy" src={svg} alt="" />

        </div>
        <div className="login-form-container">
          <h4>Inicia sesión en tu cuenta de Arandu</h4>
          <div className="form-container">
            <input 
            
            type="text"
            name="correo" 
            value={values.correo}
            onChange={(e)=>handleValue(e)}
            />

            <label className={
                `${values.correo.length>0?"clase-activa":""} placeholder`
                }>Correo</label>
          </div>
          <div className="form-container password-container">
          <input 
          
          type={showPassword?"text":"password"} 
          name="password" 
          value={values.password}
          onChange={(e)=>handleValue(e)}
          />
          <label className={`${values.password.length>0?"clase-activa":""} placeholder`}>Contraseña</label>
         {showPassword?<i onClick={()=>setShowPassword(!showPassword)} 
         style={{color:"var(--verde)"}}
         className="fa-solid fa-eye"></i>:
         <i onClick={()=>setShowPassword(!showPassword)} className="fa-solid fa-eye-slash"></i>}
         
        </div>
          <button 
          className="send-form-button"
          onClick={(e)=>handleSubmit(e)}  
          >Iniciar sesión</button>
          {loader?<Loader/>:error?<span className="error-message">{error}</span>:<></>}
          <div className="span-container">
                <div></div>
                <span className="register-message">No tienes cuenta? <Link to="/registro">Registrate</Link></span>
                <div></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginComponent;
