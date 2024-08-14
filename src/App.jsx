import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Lectura from './components/Lectura.jsx'
import Registro from './components/Registro.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { ScoreProvider } from './context/ScoreContext.jsx'
import Ejercicio from './components/Ejercicio.jsx'
import { LoginValueProvider } from './context/LoginValueContext.jsx'
import Perfil from "./components/Perfil.jsx"
import { ConfettiProvider } from "./context/ConfettiContext.jsx"
import Examen from "./components/Examen.jsx"
import { NameProvider } from "./context/NameContext.jsx"

function App() {

  return (
    <>
    <NameProvider>
      <LoginValueProvider>
        <LoginProvider>
          <ScoreProvider>
            <ConfettiProvider>
              <BrowserRouter>
                <Routes>
                  <Route index element={<Home/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/registro" element={<Registro/>}></Route>
                  <Route path="/perfil/:id" element={<Perfil/>}></Route>
                  <Route path="/lectura/:id" element={<Lectura/>}></Route>
                  <Route path="/lectura/:id/:tipo/:ejercicio" element={<Ejercicio/>}></Route>
                  <Route path="/examen/:id" element={<Examen/>}></Route>
                  <Route path="*" element={<Home/>}></Route>
                </Routes>
              </BrowserRouter>
            </ConfettiProvider>
          </ScoreProvider>
        </LoginProvider>
      </LoginValueProvider>
    </NameProvider>

    </>
  )
}

export default App  
