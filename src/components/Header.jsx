import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresopuesto from "./NuevoPresopuesto";
ControlPresupuesto;
const Header = ({
  setGastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos </h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          setGastos={setGastos}
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        ></ControlPresupuesto>
      ) : (
        <NuevoPresopuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
