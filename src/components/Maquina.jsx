import { useState } from "react"

function Maquina({
  maquina,
  indexEntrenamiento,
  indexMaquina,
  añadirSerie,
  borrarSerie,
  borrarMaquina,
  editarSerie,
  editarMaquina
}) {

  const [reps, setReps] = useState("")
  const [peso, setPeso] = useState("")
  const [editandoMaquina, setEditandoMaquina] = useState(false)
  const [editandoSerie, setEditandoSerie] = useState(null)

  // estado temporal de edición de serie
  const [editReps, setEditReps] = useState("")
  const [editPeso, setEditPeso] = useState("")

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

  function iniciarEdicionSerie(serie, indexSerie) {
    setEditandoSerie(indexSerie)
    setEditReps(serie.reps)
    setEditPeso(serie.peso)
  }

  function guardarEdicionSerie(indexSerie) {
    editarSerie(
      indexEntrenamiento,
      indexMaquina,
      indexSerie,
      "reps",
      editReps
    )

    editarSerie(
      indexEntrenamiento,
      indexMaquina,
      indexSerie,
      "peso",
      editPeso
    )

    setEditandoSerie(null)
  }

  return (
    <div className="maquina-card">

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <div>
          {!editandoMaquina ? (
            <h3>{maquina.nombre}</h3>
          ) : (
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
          )}
        </div>

        <div>
          <button onClick={() => setEditandoMaquina(!editandoMaquina)}>
            ✏️
          </button>

          <button
            onClick={() =>
              borrarMaquina(indexEntrenamiento, indexMaquina)
            }
          >
            🗑️
          </button>
        </div>

      </div>

      {/* CREAR SERIE */}
      <div style={{ marginTop: "10px" }}>
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
          ➕
        </button>
      </div>

      {/* SERIES */}
      <div style={{ marginTop: "10px" }}>
        {maquina.series.map((serie, indexSerie) => (

          <div key={indexSerie} style={{ marginBottom: "8px" }}>

            {editandoSerie === indexSerie ? (
              <>
                <input
                  type="number"
                  value={editReps}
                  onChange={(e) => setEditReps(e.target.value)}
                />

                <input
                  type="number"
                  value={editPeso}
                  onChange={(e) => setEditPeso(e.target.value)}
                />

                <button onClick={() => guardarEdicionSerie(indexSerie)}>
                  ✔️
                </button>
              </>
            ) : (
              <>
                <span>
                  {serie.reps} x {serie.peso} kg
                </span>

                <button onClick={() => iniciarEdicionSerie(serie, indexSerie)}>
                  ✏️
                </button>

                <button
                  onClick={() =>
                    borrarSerie(
                      indexEntrenamiento,
                      indexMaquina,
                      indexSerie
                    )
                  }
                >
                  🗑️
                </button>
              </>
            )}

          </div>

        ))}
      </div>

    </div>
  )
}

export default Maquina