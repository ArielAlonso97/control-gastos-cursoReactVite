import { useState, useEffect } from "react";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./helpers";
import Header from "./components/Header";
import Filtros from "./components/Filtros";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarmodal, setanimarmodal] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [gastoEliminar, setGastoEliminar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setFastosFiltrados] = useState([]);

  //local Storage presupuesto

  useEffect(() => {
    Number(localStorage.setItem("presupuesto", presupuesto));
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto"));
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  //local Storage gastos
  // useEffect(() => {
  //   const obtenerLS = () => {
  //     let gastosLS = JSON.parse(localStorage.getItem("gastos")) ?? [];
  //     setPresupuesto(gastosLS);
  //   };
  //   obtenerLS();
  // }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setanimarmodal(true);
      }, 200);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (gastoEliminar) {
      const newGastos = [...gastos];

      // Encuentra el índice del elemento a eliminar
      const index = newGastos.findIndex(
        (gastoState) => gastoState.id === gastoEliminar
      );

      // Verifica si se encontró el elemento
      if (index !== -1) {
        // Elimina el elemento
        console.log(index);
        newGastos.splice(index, 1);

        // Actualiza el estado del componente con el nuevo array
        setGastos(newGastos);
        setGastoEliminar({});
      }
    }
  }, [gastoEliminar]);

  useEffect(() => {
    if (filtro) {
      const datosFiltrados = gastos.filter(
        (gastos) => gastos.categoria == filtro
      );
      setFastosFiltrados(datosFiltrados);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setanimarmodal(true);
    }, 200);
  };

  const guardarGasto = (gasto) => {
    gasto.id = generarId();
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto]);

    setanimarmodal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className={modal ? "fijar" : null}>
      <Header
        setGastos={setGastos}
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro}></Filtros>
            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              setGastoEliminar={setGastoEliminar}
              gastoEliminar={gastoEliminar}
              setGastos={setGastos}
            ></ListadoGastos>
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarmodal={animarmodal}
          setanimarmodal={setanimarmodal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setGastos={setGastos}
          gastos={gastos}
        />
      )}
    </div>
  );
}

export default App;
