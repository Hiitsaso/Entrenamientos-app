import { useState, useEffect } from "react"
import Entrenamiento from "./components/Entrenamiento"

const tiposEntrenamiento = {
  Pecho: [
    "Press banca",
    "Press inclinado",
    "Aperturas polea",
    "Aperturas máquina"
  ],
  Espalda: [
    "Jalón al pecho abierto",
    "Jalón al pecho cerrado",
    "Remo máquina",
    "Remo mancuerna",
    "Remo en T",
    "Pull over",
    "Face pull"
  ],
  Triceps: [
    "Press francés",
    "Fondos máquina",
    "Polea cuerda",
    "Unilateral polea",
    "Polea doble"
  ],
  Biceps: [
    "Predicador",
    "Predicador máquina",
    "Martillo mancuerna",
    "Polea barra",
    "Polea unilateral atrás"
  ],
  Hombro: [
    "Lateral polea",
    "Pajarito máquina",
    "Press militar",
    "Elevaciones barra polea",
    "Hombro anterior cuerda"
  ],
  Abs: [
    "Cuerda polea",
    "Plancha",
    "Lateral máquina",
    "Elevaciones pierna"
  ],
  Pierna: [
    "Hip trust",
    "Sentadilla talón elevado",
    "bulgara",
    "sentadillas sumo",
    "ballenato",
    "cuadri máquina",
    "gemelo",
    "peso muerto máquina",
    "peso muerto mancuerna"
  ]
}

function App() {

  const [entrenamientos, setEntrenamientos] = useState(() => {
    const datosGuardados = localStorage.getItem("entrenamientos")
    return datosGuardados ? JSON.parse(datosGuardados) : []
  })

  useEffect(() => {
    localStorage.setItem(
      "entrenamientos",
      JSON.stringify(entrenamientos)
    )
  }, [entrenamientos])

  function añadirEntrenamiento(tipo) {
    const fechaActual = new Date().toLocaleDateString()

    const nuevoEntrenamiento = {
      fecha: fechaActual,
      tipo,
      maquinas: []
    }

    setEntrenamientos(prev => [...prev, nuevoEntrenamiento])
  }

  function añadirMaquina(indexEntrenamiento, nombreMaquina) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento].maquinas.push({
      nombre: nombreMaquina,
      series: []
    })
    setEntrenamientos(copia)
  }

  function añadirSerie(indexEntrenamiento, indexMaquina, reps, peso) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series.push({ reps, peso })

    setEntrenamientos(copia)
  }

  function borrarSerie(indexEntrenamiento, indexMaquina, indexSerie) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series.splice(indexSerie, 1)

    setEntrenamientos(copia)
  }

  function borrarMaquina(indexEntrenamiento, indexMaquina) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento]
      .maquinas.splice(indexMaquina, 1)

    setEntrenamientos(copia)
  }

  function borrarEntrenamiento(indexEntrenamiento) {
    const copia = [...entrenamientos]
    copia.splice(indexEntrenamiento, 1)
    setEntrenamientos(copia)
  }

  function editarFecha(indexEntrenamiento, nuevaFecha) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento].fecha = nuevaFecha
    setEntrenamientos(copia)
  }

  function editarSerie(indexEntrenamiento, indexMaquina, indexSerie, campo, valor) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series[indexSerie][campo] = valor

    setEntrenamientos(copia)
  }

  function editarMaquina(indexEntrenamiento, indexMaquina, nuevoNombre) {
    const copia = [...entrenamientos]
    copia[indexEntrenamiento]
      .maquinas[indexMaquina]
      .nombre = nuevoNombre

    setEntrenamientos(copia)
  }

  // 🔥 ORDENADOS (último arriba)
  const entrenamientosOrdenados = [...entrenamientos].reverse()

  return (
    <div>

      <h1>Lista de entrenamientos</h1>

      {/* 🔥 BOTÓN GRANDE FUTURO */}
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(tiposEntrenamiento).map(tipo => (
          <button
            key={tipo}
            onClick={() => añadirEntrenamiento(tipo)}
          >
            + {tipo}
          </button>
        ))}
      </div>

      {/* LISTA */}
      {entrenamientosOrdenados.map((entrenamiento, index) => (
        <Entrenamiento
          key={index}
          entrenamiento={entrenamiento}
          index={index}
          maquinasDisponibles={tiposEntrenamiento[entrenamiento.tipo]}
          añadirMaquina={añadirMaquina}
          añadirSerie={añadirSerie}
          borrarSerie={borrarSerie}
          borrarMaquina={borrarMaquina}
          borrarEntrenamiento={borrarEntrenamiento}
          editarFecha={editarFecha}
          editarSerie={editarSerie}
          editarMaquina={editarMaquina}
        />
      ))}

    </div>
  )
}

export default App