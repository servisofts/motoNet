import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "conductor_horario"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "key_zona": { type: "text", fk: "zona" },
        "fecha": { type: "date" },
        "hora_inicio": { type: "text" },
        "hora_fin": { type: "text" }
    },

    Action,
    Reducer,
});