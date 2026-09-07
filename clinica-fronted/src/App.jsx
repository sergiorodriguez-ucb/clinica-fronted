import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Componets/login.jsx'
import PacienteList from './Componets/Paciente/PacienteList.jsx'
import CreatePaciente from './Componets/Paciente/CreatePaciente.jsx'
import EditPaciente from './Componets/Paciente/EditPaciente.jsx'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pacientes" element={<PacienteList />} />
        <Route path="/registrar-paciente" element={<CreatePaciente />} />
        <Route path="/pacientes/editar/:id" element={<EditPaciente />} />
      </Routes>
  )
}

export default App
