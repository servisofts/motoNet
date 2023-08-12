import { SAction } from "servisofts-model";
import Model from "../..";
import SSocket from 'servisofts-socket'
import { SDate } from "servisofts-component";
import Config from "../../../Config";



export default class Action extends SAction {

    getAll(extra?: {}) {
        return super.getAll({
            key_usuario: Model.usuario.Action.getKey(),
            app: Config.appName,
            ...extra
        })
    }
}