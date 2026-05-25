import { useState } from "react"

function Maquina({
  maquina,
  indexEntrenamiento,
  indexMaquina,
  añadirSerie,
  borrarSerie,
  borrarMaquina,
  borrarEntrenamiento
}) {

  const [reps, setReps] = useState("")
  const [peso, setPeso] = useState("")

  function crearSerie() {

    añadirSerie(
      indexEntrenamiento,
      indexMaquina,
      reps,
      peso
    )

    setReps("")
    setPeso("")
  }

  return (

    <div>

      <h3>{maquina.nombre}</h3>

      <button
        onClick={() =>
          borrarMaquina(
            indexEntrenamiento,
            indexMaquina
          )
        }
      >
        Borrar máquina
      </button>

      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <input
        type="number"
        placeholder="Peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <button onClick={crearSerie}>
        Añadir serie
      </button>

      {maquina.series.map((serie, indexSerie) => (

        <div key={indexSerie}>

          <p>
            {serie.reps} reps - {serie.peso} kg
          </p>

          <button
            onClick={() =>
              borrarSerie(
                indexEntrenamiento,
                indexMaquina,
                indexSerie
              )
            }
          >
            Borrar serie
          </button>

        </div>

      ))}

    </div>

  )
}

export default Maquina