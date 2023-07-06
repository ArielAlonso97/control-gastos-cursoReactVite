import React from "react";
import Gasto from "./Gasto";
const ListadoGastos = ({
  gastos,
  setGastoEditar,
  setGastoEliminar,
  setGastos,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? `Gastos de ${filtro}`
              : "No hay gastos en esta categoria"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              setGastos={setGastos}
              gastos={gastos}
              setGastoEliminar={setGastoEliminar}
              setGastoEditar={setGastoEditar}
              key={gasto.id}
              gasto={gasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>
            {gastos.length
              ? `Gastos`
              : "No hay gastos aún"}
          </h2>

          {gastos.map((gasto) => (
            <Gasto
              setGastos={setGastos}
              gastos={gastos}
              setGastoEliminar={setGastoEliminar}
              setGastoEditar={setGastoEditar}
              key={gasto.id}
              gasto={gasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
