import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "admin@correo.com",
    clave: "vitalis123",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/pacientes");
  };

  return (
    <div className="login-pantalla">
      <section className="login-panel-editorial">
        <div className="marca">
          Gestión Clínica
        </div>
        <p className="cita">
          "Un buen sistema no remplaza el cuidado del paciente, le hace lugar."
        </p>
        <p className="firma">
          Panel interno de gestión clinica
        </p>
      </section>

      <section className="login-panel-formulario">
        <div className="login-caja">
          <h1>
            Bienvenido de nuevo
          </h1>
          <p>
            Ingresa con tu cuenta para ver la agenda del día.
          </p>
          <form
            className="formulario"
            onSubmit={handleSubmit}
          >
            <div className="campo">
              <label htmlFor="correo">
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="nombre@correo.com"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="campo">
              <label htmlFor="clave">
                Contraseña
              </label>
              <input
                type="password"
                id="clave"
                name="clave"
                placeholder="••••••••"
                value={formData.clave}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                className="boton boton-primario"
                style={{ width: "100%" }}
              >
                Ingresar
              </button>
            </div>
          </form>
          <div className="nota-credenciales">
            Demo académica: usá{" "}
            <strong>admin@gmail.com</strong>
            {" / "}
            <strong>admin123</strong>
            {" "}y presiona "Ingresar" para ver el dashboard.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
