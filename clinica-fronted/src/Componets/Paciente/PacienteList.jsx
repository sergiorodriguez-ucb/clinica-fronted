import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function PacienteList() {
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate();

    async function fetchPacientes() {
        const url = "http://127.0.0.1:8000/api/v1/pacientes";
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error("No funciona el backend:", error);
        }
    }

    useEffect(() => {
        fetchPacientes();
    }, []);

    function handleDeletePaciente(pacienteId) {
        if (window.confirm("¿Estás seguro de eliminar este paciente?")) {
            fetch(`http://127.0.0.1:8000/api/v1/pacientes/${pacienteId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        setPacientes(pacientes.filter((p) => p.id !== pacienteId));
                    } else {
                        console.error("Error al eliminar el paciente");
                    }

                })
                .catch((error) => {
                    console.error("Error al eliminar el paciente:", error);
                });
        }
    }

    function editPaciente(pacienteId) {
        console.log("Editar paciente con ID:", pacienteId);
        navigate(`/pacientes/${pacienteId}/editar`);

    }

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
                        <h1>Pacientes</h1>

                        <p>
                            {pacientes && pacientes.length} pacientes registrados en el sistema.
                        </p>
                    </div>

                    <Link to="/registrar-paciente" className="boton boton-primario">
                        + Registrar paciente
                    </Link>
                </div>
                {pacientes && pacientes.length === 0 && (
                    <p>No hay pacientes registrados en el sistema.</p>
                )}
                <div className="tarjeta tarjeta-tabla">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Genero</th>
                                <th>Tipo de Sangre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pacientes && pacientes.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td>
                                        <a
                                            className="enlace-paciente"
                                            href="/citas"
                                        >
                                            {paciente.nombre}
                                        </a>
                                    </td>
                                    <td>{paciente.apellido}</td>
                                    <td>{paciente.genero}</td>
                                    <td>{paciente.tipo_sangre}</td>
                                    <td>

                                        <Link
                                            to={`/pacientes/editar/${paciente.id}`}
                                            className="boton boton-primario"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className="boton boton-secundario"
                                            onClick={() => {
                                                handleDeletePaciente(paciente.id);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default PacienteList;