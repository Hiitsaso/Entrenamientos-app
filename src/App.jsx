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

    const datosGuardados =
      localStorage.getItem("entrenamientos")

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : []

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
      tipo: tipo,
      maquinas: []
    }

    setEntrenamientos([
      ...entrenamientos,
      nuevoEntrenamiento
    ])
  }

  function añadirMaquina(indexEntrenamiento, nombreMaquina) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento].maquinas.push({
      nombre: nombreMaquina,
      series: []
    })

    setEntrenamientos(copiaEntrenamientos)
  }

  function añadirSerie(indexEntrenamiento, indexMaquina, reps, peso) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series.push({
        reps: reps,
        peso: peso
      })

    setEntrenamientos(copiaEntrenamientos)
  }

  function borrarSerie(indexEntrenamiento, indexMaquina, indexSerie) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series.splice(indexSerie, 1)

    setEntrenamientos(copiaEntrenamientos)

  }

  function borrarMaquina(indexEntrenamiento, indexMaquina) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento]
      .maquinas.splice(indexMaquina, 1)

    setEntrenamientos(copiaEntrenamientos)

  }

  function borrarEntrenamiento(indexEntrenamiento) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos.splice(
      indexEntrenamiento,
      1
    )

    setEntrenamientos(copiaEntrenamientos)

  }

  function editarFecha(indexEntrenamiento, nuevaFecha) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento].fecha =
      nuevaFecha

    setEntrenamientos(copiaEntrenamientos)

  }

  function editarSerie(indexEntrenamiento, indexMaquina, indexSerie, campo, valor) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento]
      .maquinas[indexMaquina]
      .series[indexSerie][campo] = valor

    setEntrenamientos(copiaEntrenamientos)

  }

  function editarMaquina(indexEntrenamiento, indexMaquina, nuevoNombre) {

    const copiaEntrenamientos = [...entrenamientos]

    copiaEntrenamientos[indexEntrenamiento]
      .maquinas[indexMaquina]
      .nombre = nuevoNombre

    setEntrenamientos(copiaEntrenamientos)

  }


  return (
    <div>

      <h1>Lista de entrenamientos</h1>

      {Object.keys(tiposEntrenamiento).map((tipo) => (

        <button
          key={tipo}
          onClick={() => añadirEntrenamiento(tipo)}
        >
          {tipo}
        </button>

      ))}

      {entrenamientos.map((entrenamiento, index) => (

        <Entrenamiento
          key={index}
          entrenamiento={entrenamiento}
          index={index}
          maquinasDisponibles={
            tiposEntrenamiento[entrenamiento.tipo]
          }
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