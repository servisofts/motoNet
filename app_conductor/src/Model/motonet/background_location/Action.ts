import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket';
import Model from "../..";
export default class Action extends SAction {
    getCurrentLocation() {
        return this._getReducer().location
    }

    onChange(data) {
        // SSocket.sendHttpAsync("http://192.168.3.2:30004/api", {
        SSocket.sendHttpAsync(SSocket.api.root + "api", {
            component: "background_location",
            type: "onChange",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey(),
            data: data,
            // tyepe: type
        })
        return true;
    }
}