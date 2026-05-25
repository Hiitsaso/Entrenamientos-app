import { useState } from "react"

function Maquina({
  maquina,
  indexEntrenamiento,
  indexMaquina,
  añadirSerie,
  borrarSerie,
  borrarMaquina,
  borrarEntrenamiento,
  editarFecha,
  editarSerie,
  editarMaquina
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

      <input
        value={maquina.nombre}
        onChange={(e) =>
          editarMaquina(
            indexEntrenamiento,
            indexMaquina,
            e.target.value
          )
        }
      />

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

          <input
            type="number"
            value={serie.reps}
            onChange={(e) =>
              editarSerie(
                indexEntrenamiento,
                indexMaquina,
                indexSerie,
                "reps",
                e.target.value
              )
            }
          />

          <input
            type="number"
            value={serie.peso}
            onChange={(e) =>
              editarSerie(
                indexEntrenamiento,
                indexMaquina,
                indexSerie,
                "peso",
                e.target.value
              )
            }
          />

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