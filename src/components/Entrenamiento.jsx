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

  return (

    <div>

      <h2>
        {entrenamiento.tipo}
      </h2>

      <input
        type="text"
        value={entrenamiento.fecha}
        onChange={(e) =>
          editarFecha(
            index,
            e.target.value
          )
        }
      />

      <button
        onClick={() =>
          borrarEntrenamiento(index)
        }
      >
        Borrar entrenamiento
      </button>

      {maquinasDisponibles.map((maquina) => (

        <button
          key={maquina}
          onClick={() => añadirMaquina(index, maquina)}
        >
          {maquina}
        </button>

      ))}

      {entrenamiento.maquinas.map((maquina, indexMaquina) => (

        <Maquina
          key={indexMaquina}
          maquina={maquina}
          indexEntrenamiento={index}
          indexMaquina={indexMaquina}
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

export default Entrenamiento