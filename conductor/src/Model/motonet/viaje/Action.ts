import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
const STORAGE_KEY = "viaje_item"

type ACTIONS = "registro" | "buscar_conductor" | "negociar_conductor" | "aceptar_negociacion" | "denegar_negociacion" | "cancelar" | "cancelar_conductor"
export default class Action extends SAction {


    action(action: ACTIONS, key_viaje, data) {

        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                component: "viaje",
                type: "action",
                action: action,
                key_usuario: Model.usuario.Action.getKey(),
                estado: "cargando",
                key_viaje: key_viaje,
                data: data,
            }).then((resp) => {
                this._dispatch(resp);
                resolve(resp);
            }).catch(e => {
                reject(e);
            })
        });
    }
    getActivo() {
        var reducer = this._getReducer();
        if (reducer.viaje) {
            return reducer.viaje;
        }
        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "viaje",
            type: "getActivo",
            estado: "cargando",
            key_usuario: key_usuario
        }
        SSocket.send(petition);
        return null;

    }
}