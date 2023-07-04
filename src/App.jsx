import { useState } from "react";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

import Header from "./components/Header";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="Icono nuevo gasto" 
          onClick={handleNuevoGasto}
          />
        </div>
      )}
    </div>
  );
}

export default App;
