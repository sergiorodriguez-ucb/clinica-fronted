import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePaciente() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "", 
        fecha_nacimiento: "",
        genero: "",
        telefono: "",
        email: "",
        tipo_sangre: "",
        alergias: "",
    })

    function handleInputChange(event) {
        const { name,apellido, fecha_nacimiento, genero, telefono, email, tipo_sangre, alergias, value } = event.target;
        setFormData((prevData) => ({

            ...prevData,
            [name]: value,
            [apellido]: value,
            [fecha_nacimiento]: value,
            [genero]: value,
            [telefono]: value,
            [email]: value,
            [tipo_sangre]: value,
            [alergias]: value,
        }));
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Datos del formulario:", formData);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Error al registrar el paciente");
            }

            const data = await response.json();
            console.log("Paciente registrado:", data);
            navigate("/pacientes");
        } catch (error) {
            console.error("Error al registrar el paciente:", error);
        }
    };


    const url = "http://127.0.0.1:8000/api/v1/pacientes";

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="marca">Clínica Vitalis</div>

        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/pacientes" className="activo">
            Pacientes
          </a>
          <a href="/citas">Citas</a>
        </nav>

        <div className="usuario">
          Conectado como
          <br />
          <strong>Admin</strong>
          <br />
          <a href="/">Cerrar sesión</a>
        </div>
      </aside>

      <main className="contenido">
        <div className="encabezado-pagina">
          <div>
            <h1>Registrar paciente</h1>
            <p>
              Completá los datos para agregar un nuevo paciente al sistema.
            </p>
          </div>
        </div>

        <div className="tarjeta">
          <form className="formulario"  onSubmit={handleSubmit}>
            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="nombre">Nombres (*)</label>

                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ej. Renato"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="campo">
                <label htmlFor="apellido">Apellidos (*)</label>

                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ej. Aguilar"
                  required
                  value={formData.apellido}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="fila-campos">
              <div className="campo">
                <label htmlFor="fecha-nacimiento">
                  Fecha de nacimiento (*)
                </label>

                <input
                  type="date"
                  id="fecha-nacimiento"
                  name="fecha_nacimiento"
                  required
                  value={formData.fecha_nacimiento}
                  onChange={handleInputChange}
                />
              </div>

              <div className="campo">
                <label htmlFor="genero">Género</label>

                <select id="genero" name="genero" value={formData.genero} onChange={handleInputChange}>
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro / prefiero no decir</option>
                </select>
              </div>
            </div>

            <div className="fila-campos">
              <div className="campo campo-obligatorio">
                <label htmlFor="telefono">Teléfono (*)</label>

                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="+591 700-00000"
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>

              <div className="campo">
                <label htmlFor="correo">Correo electrónico</label>

                <input
                  type="email"
                  id="correo"
                  name="email"
                  placeholder="paciente@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="tipo-sangre">Tipo de sangre</label>

              <select id="tipo-sangre" name="tipo_sangre" value={formData.tipo_sangre} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="alergias">
                Alergias conocidas{" "}
                <span className="ayuda">(opcional)</span>
              </label>

              <textarea
                id="alergias"
                name="alergias"
                rows="3"
                placeholder="Ej. Penicilina, polen..."
                value={formData.alergias}
                onChange={handleInputChange}
              />
            </div>

            <div className="acciones-formulario">
              <button type="submit" className="boton boton-primario">
                Guardar paciente
              </button>

              <Link to="/pacientes" className="boton boton-secundario">
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        <span className="ayuda">(*) Campos obligatorios</span>
      </main>
    </div>
  );
}

export default CreatePaciente