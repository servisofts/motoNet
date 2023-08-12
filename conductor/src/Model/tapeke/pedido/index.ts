import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "pedido"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "estado": { type: "integer" },
        "key_pack": { type: "text", fk: "pack" },
        "cantidad": { type: "integer" },
        "fecha": { type: "date" },
        "precio": { type: "double" },
        "delivery": { type: "double" },
        "state": { type: "text" },
        "key_pedido_direccion": { type: "text", fk: "pedido_direccion" },
        "distancia": { type: "double" },
        "key_payment_order": { type: "text" },
        "payment_type": { type: "text" },
        "fecha_on": { type: "timestamp" },
        "fecha_recordado": { type: "timestamp" },
        "fecha_recordado_fin": { type: "timestamp" },
        "key_conductor": { type: "text", fk: "usuario" },


    },

    Action,
    Reducer,
});