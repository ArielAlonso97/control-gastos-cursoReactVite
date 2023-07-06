import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ presupuesto, gastos,setGastos,setPresupuesto,setIsValidPresupuesto }) => {
  const [porcentaje, setPorcentaje] = useState(100);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    let reduce = gastos.reduce(
      (acumulador, actual) => acumulador + actual.cantidad,
      0
    );
    console.log(reduce);

    let Disponible = presupuesto - reduce;
    let Gastado = reduce;
    //calcular Porcentaje
    const nuevoPorcentaje = ((presupuesto - Disponible) / presupuesto) * 100;

    setDisponible(Disponible);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 500);

    setGastado(Gastado);
  }, [gastos, presupuesto])

  const handleResetApp = () => {
    const resultado = confirm('Deseas reiniciar presupuesto y gastos?') 

    if (resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>
          <CircularProgressbar
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : "#3B82F6",
              trailColor: "#f5f5f5",
              textColor:porcentaje > 100 ? '#DC2626' : "#3B82F6"
            })}
            text={` ${porcentaje}% Gastado`}
            value={porcentaje}
          ></CircularProgressbar>
        </p>
      </div>

      <div className="contenido-presupuesto">
        <button
        className="reset-app"
        type="button"
        onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 && 'negativo' }`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
