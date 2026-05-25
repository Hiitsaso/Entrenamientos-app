import Maquina from "./Maquina"

function Entrenamiento({
  entrenamiento,
  index,
  maquinasDisponibles,
  añadirMaquina,
  añadirSerie,
  borrarSerie, 
  borrarMaquina,
  borrarEntrenamiento
}) {

  return (

    <div>

      <h2>
        {entrenamiento.fecha} - {entrenamiento.tipo}
      </h2>

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
        />

      ))}

    </div>

  )
}

export default Entrenamiento