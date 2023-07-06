import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarmodal,
  setanimarmodal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
  setGastos,
  gastos
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
    }
  }, []);

  const ocultarModal = () => {
    setanimarmodal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    setGastoEditar({})
  };

  const handleEditar = (e) => {
    e.preventDefault();
    
    // Nuevo Objeto
    gastoEditar.nombre = nombre;
    gastoEditar.cantidad = cantidad;
    gastoEditar.categoria = categoria;
    
    // Copia el array original
    const newGastos = [...gastos];

    // Encuentra el índice del elemento a reemplazar
    const index = newGastos.findIndex(
      (gastoState) => gastoState.id === gastoEditar.id
    );

    

    // Verifica si se encontró el elemento
    if (index !== -1) {
      // Reemplaza el elemento con uno nuevo
      console.log(newGastos[index]);
      console.log(gastoEditar);
      newGastos[index] = gastoEditar;

      // Actualiza el estado del componente con el nuevo array
      setGastos(newGastos);
    }

    setanimarmodal(false);
    setTimeout(() => {
      setModal(false);
      setGastoEditar({})
    }, 500);
    
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      console.log(mensaje);
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    

    guardarGasto({ nombre, cantidad, categoria });
    setGastoEditar({});
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>

      <form
        onSubmit={gastoEditar.id ? handleEditar : handleSubmit}
        className={`formulario ${animarmodal ? "animar" : "cerrar"}`}
      >
        <legend>
          {" "}
          {Object.keys(gastoEditar).length > 0
            ? `Editar ${gastoEditar.nombre}`
            : "Nuevo Gasto"}{" "}
        </legend>
        {mensaje && <Mensaje tipo="error">{mensaje} </Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: ej. 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value=""> --Seleccione--</option>
            <option value="casa"> Casa</option>
            <option value="ahorro"> Ahorro</option>
            <option value="comida"> Comida</option>
            <option value="gastos"> Gastos Varios</option>
            <option value="ocio"> Ocio</option>
            <option value="salud"> Salud</option>
            <option value="subscripciones"> Subscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={`${
            Object.keys(gastoEditar).length > 0 ? "Editar Gasto" : "Nuevo Gasto"
          }`}
        />
      </form>
    </div>
  );
};

export default Modal;
