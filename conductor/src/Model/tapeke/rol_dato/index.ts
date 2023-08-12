import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "rol_dato"
    },
    Columns: {
        "key": {
            type: "text",
            pk: true
        },
        "fecha_on": {
            type: "timestamp",
            label: "Fecha de creacion"
        },
        "estado": {
            type: "integer"
        },
        "key_usuario": {
            type: "text",
            fk: "usuario"
        },
        "key_rol": {
            type: "text",
            fk: "rol",
            notNull: true,
        },
        "key_dato": {
            type: "text",
            fk: "dato",
            notNull: true,
        },

    },
    Action,
    Reducer,
});