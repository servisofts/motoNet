import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "driver_cuenta"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "nombre": { type: "text", editable: true, notNull: true },
        "ci": { type: "text", editable: true, notNull: true },
        "sucursal": { type: "text", editable: true, notNull: true },
        "numero_cuenta": { type: "text", editable: true, notNull: true },
        "banco": { type: "text", editable: true, notNull: true },
        "key_conductor": { type: "text", fk: "conductor" },


    },
    Action,
    Reducer,
});