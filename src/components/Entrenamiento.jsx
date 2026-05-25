import Maquina from "./Maquina"

function Entrenamiento({
  entrenamiento,
  index,
  maquinasDisponibles,
  añadirMaquina,
  añadirSerie
}) {

  return (

    <div>

      <h2>
        {entrenamiento.fecha} - {entrenamiento.tipo}
      </h2>

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
        />

      ))}

    </div>

  )
}

export default Entrenamiento