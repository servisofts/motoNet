import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
import Validator from "../../../Validator";
const STORAGE_KEY = "viaje_item"
export default class Action extends SAction {

    registro(data) {
        return super.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        })
    }
    action(action, key_viaje, viaje) {

        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                component: "viaje",
                type: "action",
                action: action,
                key_usuario: Model.usuario.Action.getKey(),
                estado: "cargando",
                key_viaje: key_viaje,
                data: viaje,
            }).then((resp) => {
                this._dispatch(resp);
                resolve(resp);
            }).catch(e => {
                reject(e);
            })
        });
    }
    saveViaje(viaje) {
        SStorage.setItem(STORAGE_KEY, JSON.stringify(viaje));
        Validator.validate();
    }

    getViaje() {
        return new Promise((resolve, reject) => {
            SStorage.getItem(STORAGE_KEY, (resp) => {
                var viaje = {};
                if (!resp) {
                    resolve(viaje)
                    return;
                }
                viaje = JSON.parse(resp);
                resolve(viaje);
            })
        });
    }
    getByKey(key) {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                component: "viaje",
                type: "getByKey",
                estado: "cargando",
                key: key,
            }).then((resp) => {
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
    getActivoAsync() {
        return new Promise((resolve, reject) => {
            var petition = {
                component: "viaje",
                type: "getActivo",
                estado: "cargando",
                key_usuario: Model.usuario.Action.getKey()
            }
            SSocket.sendPromise(petition).then(resp => {
                this._dispatch(resp);
                resolve(resp);
            }).catch(e => {
                reject(e);
            })
        });


    }

}