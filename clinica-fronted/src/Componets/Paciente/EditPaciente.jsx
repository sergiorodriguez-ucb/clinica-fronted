import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    telefono: "",
    email: "",
    tipo_sangre: "",
    alergias: "",
  });

  const [loading, setLoading] = useState(true);

  const url = `http://127.0.0.1:8000/api/v1/pacientes/${id}`;

  // Obtener los datos del paciente
  useEffect(() => {
    const getPaciente = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el paciente");
        }

        const data = await response.json();

        setFormData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          fecha_nacimiento: data.fecha_nacimiento || "",
          genero: data.genero || "",
          telefono: data.telefono || "",
          email: data.email || "",
          tipo_sangre: data.tipo_sangre || "",
          alergias: data.alergias || "",
        });

      } catch (error) {
        console.error("Error al obtener el paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    getPaciente();
  }, [url]);

  // Actualizar los campos
  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Actualizar paciente
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Datos a actualizar:", formData);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del backend:", errorData);
        throw new Error("Error al actualizar el paciente");
      }
      const data = await response.json();
      console.log("Paciente actualizado:", data);
      navigate("/pacientes");

    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
  };

  if (loading) {
    return <p>Cargando información del paciente...</p>;
  }

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="marca">
          Clínica Vitalis
        </div>

        <nav>
          <a href="/dashboard">Dashboard</a>

          <a href="/pacientes" className="activo">
            Pacientes
          </a>

          <a href="/citas">
            Citas
          </a>
        </nav>

        <div className="usuario">
          Conectado como
          <br />

          <strong>Admin</strong>

          <br />

          <a href="/">
            Cerrar sesión
          </a>
        </div>
      </aside>

      <main className="contenido">

        <div className="encabezado-pagina">

          <div>

            <h1>
              Actualizar paciente
            </h1>

            <p>
              Modificá los datos del paciente.
            </p>

          </div>

        </div>

        <div className="tarjeta">

          <form
            className="formulario"
            onSubmit={handleSubmit}
          >

            {/* NOMBRE Y APELLIDO */}

            <div className="fila-campos">

              <div className="campo">

                <label htmlFor="nombre">
                  Nombres (*)
                </label>

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

                <label htmlFor="apellido">
                  Apellidos (*)
                </label>

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

            {/* FECHA Y GENERO */}

            <div className="fila-campos">

              <div className="campo">

                <label htmlFor="fecha_nacimiento">
                  Fecha de nacimiento (*)
                </label>

                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  required
                  value={formData.fecha_nacimiento}
                  onChange={handleInputChange}
                />

              </div>

              <div className="campo">

                <label htmlFor="genero">
                  Género
                </label>

                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                >

                  <option value="">
                    Seleccionar
                  </option>

                  <option value="masculino">
                    Masculino
                  </option>

                  <option value="femenino">
                    Femenino
                  </option>

                  <option value="otro">
                    Otro / prefiero no decir
                  </option>

                </select>

              </div>

            </div>

            {/* TELEFONO Y EMAIL */}

            <div className="fila-campos">

              <div className="campo">

                <label htmlFor="telefono">
                  Teléfono (*)
                </label>

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

                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="paciente@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />

              </div>

            </div>

            {/* TIPO DE SANGRE */}

            <div className="campo">

              <label htmlFor="tipo_sangre">
                Tipo de sangre
              </label>

              <select
                id="tipo_sangre"
                name="tipo_sangre"
                value={formData.tipo_sangre}
                onChange={handleInputChange}
              >

                <option value="">
                  Seleccionar
                </option>

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

            {/* ALERGIAS */}

            <div className="campo">

              <label htmlFor="alergias">

                Alergias conocidas{" "}

                <span className="ayuda">
                  (opcional)
                </span>

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

            {/* BOTONES */}

            <div className="acciones-formulario">

              <button
                type="submit"
                className="boton boton-primario"
              >
                Actualizar paciente
              </button>

              <Link
                to="/pacientes"
                className="boton boton-secundario"
              >
                Cancelar
              </Link>

            </div>

          </form>

        </div>

        <span className="ayuda">
          (*) Campos obligatorios
        </span>

      </main>

    </div>
  );
}

export default EditPaciente;