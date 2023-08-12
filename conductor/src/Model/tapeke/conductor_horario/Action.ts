import { SAction } from "servisofts-model";
import Model from "../..";
import SSocket from 'servisofts-socket'
import { SDate } from "servisofts-component";



export default class Action extends SAction {

    getEnCurso() {
        var horarios = this.getActivosByUser();
        if (!horarios) return null;
        var Active = {};
        Object.values(horarios).map((obj: any) => {
            var date = new SDate(obj.fecha + " " + obj.hora_fin, "yyyy-MM-dd hh:mm");
            var datef = new SDate(obj.fecha + " " + obj.hora_inicio, "yyyy-MM-dd hh:mm");
            if (datef.isBefore(new SDate()) && date.isAfter(new SDate())) {
                Active = obj;
            }
        })
        return Active;
    }
    getActivosByUser() {
        var reducer = this._getReducer();
        if (reducer.misActivos) {
            return reducer.misActivos;
        }
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "conductor_horario",
            type: "getActivosByUser",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getUsuarioLog()?.key,

        }
        SSocket.send(petition);
        return null;
    }
    getByDate({ key_zona, fecha }) {
        var reducer = this._getReducer();
        if (reducer._fecha != fecha) {
            reducer._fecha = fecha;
            reducer.date = null;
        }
        if (reducer._key_zona != key_zona) {
            reducer._key_zona = key_zona;
            reducer.date = null;
        }
        if (reducer.date) {
            return reducer.date;
        }
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "conductor_horario",
            type: "getByDate",
            estado: "cargando",
            key_zona: key_zona,
            fecha: fecha

        }
        SSocket.send(petition);
        return null;
    }
}