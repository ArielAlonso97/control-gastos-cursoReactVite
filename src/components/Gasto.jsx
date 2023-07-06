import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
  SwipeAction,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from "../helpers/index";
import icono_casa from "../img/icono_casa.svg";
import icono_ahorro from "../img/icono_ahorro.svg";
import icono_comida from "../img/icono_comida.svg";
import icono_gastos from "../img/icono_gastos.svg";
import icono_ocio from "../img/icono_ocio.svg";
import icono_salud from "../img/icono_salud.svg";
import icono_suscripciones from "../img/icono_suscripciones.svg";
import { useEffect } from "react";

const diccionarioIconos = {
  casa: icono_casa,
  ahorro: icono_ahorro,
  comida: icono_comida,
  gastos: icono_gastos,
  ocio: icono_ocio,
  salud: icono_salud,
  subscripciones: icono_suscripciones,
};

const Gasto = ({
  gasto,
  setGastoEditar,
  setGastoEliminar
}) => {

  

  const { categoria, nombre, cantidad, id, fecha } = gasto;

  

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => setGastoEliminar(id)} destructive={true}>Eliminar</SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="Icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
