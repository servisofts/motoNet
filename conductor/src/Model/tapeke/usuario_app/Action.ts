import { SAction } from "servisofts-model";
import Model from "../..";
import SSocket from 'servisofts-socket';
import Config from "../../../Config";

export default class Action extends SAction {

    getByKeyUsuarioApp() {
        var reducer = this._getReducer();
        if (reducer.my) {
            return reducer.my;
        }
        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "usuario_app",
            type: "getByKeyUsuarioApp",
            estado: "cargando",
            key_usuario: key_usuario,
            app: Config.appName,
        }
        SSocket.send(petition);
        return null;
    }
}