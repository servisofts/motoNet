import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
export default class Action extends SAction {

    getCurrentLocation() {
        return this._getReducer().location
    }
    onChange(data, type) {
        var obj = {
            component: "background_location",
            type: "onChange",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: data,
            tipo: type,
        }
        console.log(obj);
        SSocket.sendHttpAsync(SSocket.api.root + "api", obj)
        this._dispatch(obj);
        return true;
    }
}