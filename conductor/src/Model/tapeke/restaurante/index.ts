import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "restaurante"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", label: "Fecha de creacion" },
        "estado": { type: "integer" },
        "nombre": { type: "text" },
        "descripcion": { type: "text" },
        "direccion": { type: "text" },
        "latitude": { type: "double" },
        "longitude": { type: "double" },
        "delivery": { type: "boolean" },
    },
    image:{
        api:"root",
        name:"restaurante"
    },
    Action,
    Reducer,
});