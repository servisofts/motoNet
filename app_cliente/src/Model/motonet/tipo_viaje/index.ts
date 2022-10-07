import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tipo_viaje"
    },
    Columns: {
        "descripcion": { type: "text", notNull: true, editable: true },
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },

    },

    Action,
    Reducer,
});