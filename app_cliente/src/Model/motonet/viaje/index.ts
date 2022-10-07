import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "viaje"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "key_tipo_viaje": { type: "text", fk: "tipo_viaje" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_conductor": { type: "text", fk: "usuario" },
        "tiempo": { type: "double" },
        "distancia": { type: "double" },
        "monto_estimado": { type: "double" },
        "key_costo_viaje": { type: "text", fk: "" },

    },

    Action,
    Reducer,
});