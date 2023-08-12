import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
// const STORAGE_KEY = "viaje_item"

type ACTIONS = "confirmar_conductor" | "conductor_llego" | "entregar" | "cancelar"
export default class Action extends SAction {


    action(action: ACTIONS, key_pedido, data) {
        return new Promise((resolve, reject) => {
            SSocket.sendPromise({
                component: "pedido",
                type: "action",
                action: action,
                key_usuario: Model.usuario.Action.getKey(),
                estado: "cargando",
                key_pedido: key_pedido,
                data: data,
            }).then((resp) => {
                resolve(resp);
                if (resp.preventDefault) {
                    console.log("Entro al prevent default")
                    return;
                }
                this._dispatch(resp);
            }).catch(e => {
                reject(e);
            })
        });
    }

    getActivo() {
        var reducer = this._getReducer();
        if (reducer.activo) {
            var activo = null;
            let arr = Object.values(reducer.activo).filter((o: any) => o.key_conductor == Model.usuario.Action.getKey());
            let cc = arr.find((a: any) => a.state == "confirmando_conductor");
            if (cc) return cc;
            cc = arr.find((a: any) => a.state == "esperando_conductor");
            if (cc) return cc;
            cc = arr.find((a: any) => a.state == "conductor_llego");
            if (cc) return cc;
            cc = arr.find((a: any) => a.state == "entregado_conductor");
            if (cc) return cc;
            arr.map((obj: any) => {
                if (obj.state == "buscando_conductor") return
                activo = obj;
            })
            return activo ?? {};
        }
        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "pedido",
            type: "getActivos",
            estado: "cargando",
            key_usuario: key_usuario
        }
        SSocket.send(petition);
        return null;

    }
    getActivos(force) {
        var reducer = this._getReducer();
        if (!force) {
            if (reducer.activo) {
                
                return reducer.activo;
            }
        }


        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "pedido",
            type: "getActivos",
            estado: "cargando",
            key_usuario: key_usuario
        }
        SSocket.send(petition);
        return null;

    }

    getDetalle(key, reload) {
        var reducer = this._getReducer();

        var data = reducer.activo;

        if (!reload) {
            if (data) {
                if (data[key]) {
                    return data[key];
                }
            }
        }

        if (reducer.estado == "cargando") return null;
        const petition = {
            ...this.model.info,
            type: "getDetalle",
            estado: "cargando",
            key_pedido: key,
            key_usuario: Model.usuario.Action.getKey()
        }
        SSocket.send(petition)
        return null;
    }
    getPendientesConciliacionDelivery(extra?: { key_conductor: string }) {
        return SSocket.sendPromise({
            ...this.model.info,
            type: "getPendientesConciliacionDelivery",
            key_usuario: Model.usuario.Action.getKey(),
            ...extra
        })
    }
}