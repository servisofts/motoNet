import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";

export default class Action extends SAction {

    registroAll(data) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "registroAll",
            estado: "cargando",
            data: data,
            key_usuario:Model.usuario.Action.getKey(),

        })
    }
}