import { useState } from "react"
import Maquina from "./Maquina"

function Entrenamiento({
  entrenamiento,
  index,
  maquinasDisponibles,
  añadirMaquina,
  añadirSerie,
  borrarSerie,
  borrarMaquina,
  borrarEntrenamiento,
  editarFecha,
  editarSerie,
  editarMaquina
}) {

  const [seleccion, setSeleccion] = useState("")

  return (
    <div>

      {/* FECHA */}
      <input
        value={entrenamiento.fecha}
        onChange={(e) => editarFecha(index, e.target.value)}
      />

      <h2>{entrenamiento.tipo}</h2>

      {/* BORRAR ENTRENAMIENTO */}
      <button onClick={() => borrarEntrenamiento(index)}>
        🗑️ borrar
      </button>

      {/* ➕ DROPDOWN DE MÁQUINAS */}
      <div style={{ marginBottom: "10px" }}>

        <select
          value={seleccion}
          onChange={(e) => setSeleccion(e.target.value)}
        >
          <option value="">-- elegir máquina --</option>

          {maquinasDisponibles.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}

        </select>

        <button
          onClick={() => {
            if (seleccion) {
              añadirMaquina(index, seleccion)
              setSeleccion("")
            }
          }}
        >
          ➕ añadir máquina
        </button>

      </div>

      {/* MÁQUINAS */}
      <div className="maquinas-container">
        {[...entrenamiento.maquinas]
          .reverse()
          .map((maquina, indexMaquina) => (
            <Maquina
              key={indexMaquina}
              maquina={maquina}
              indexEntrenamiento={index}
              indexMaquina={indexMaquina}
              añadirSerie={añadirSerie}
              borrarSerie={borrarSerie}
              borrarMaquina={borrarMaquina}
              editarSerie={editarSerie}
              editarMaquina={editarMaquina}
            />
          ))}
      </div>

    </div>
  )
}

export default Entrenamiento