import { SDate, SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
import SSocket from 'servisofts-socket'
import Model from "../..";

export default class Action extends SAction {
    getHorarios() {
        var reducer = this._getReducer();
        if (reducer.horario) {
            return reducer.horario;
        }
        var key_usuario = Model.usuario.Action.getKey()
        if (!key_usuario) return null;
        if (reducer.estado == "cargando") return null;
        var petition = {
            component: "zona",
            type: "getHorarios",
            estado: "cargando",
            delivery: true,
            key_usuario: key_usuario
        }
        SSocket.send(petition);
        return null;

    }

    toTime(hora) {
        return new SDate(hora, "hh:mm").getTime()
    }
    getHorariosReducidosByKey(key_zona, day, enviroments) {
        var zonas = this.getHorarios();
        if (!zonas) return null;
        var obj = zonas[key_zona];
        // let tiepo_extra_para_recojer = parseFloat(enviroments["tiempo_para_cancelar_no_rocogido"]?.value ?? 0);
        let tiepo_extra_para_recojer = 0

        // var horarios = obj.horarios.filter(h => h.dia == this.state.date.getDayOfWeek())
        let horarios = JSON.parse(JSON.stringify(obj.horarios))
        horarios = horarios.filter(h => h.dia == day)
        horarios.map(e => {
            // e.hora_fin = new SDate(e.hora_fin, "hh:mm").addSecond(tiepo_extra_para_recojer).toString("hh:mm")
            // e.hora_fin = new SDate(e.hora_fin, "hh:mm").addSecond(tiepo_extra_para_recojer).toString("hh:mm")
        })
        horarios = horarios.sort((a, b) => this.toTime(a.hora_inicio) - this.toTime(b.hora_inicio))
        var horariosFinal = [];
        horarios.map((obj2, i) => {
            var horario = { ...obj2 }
            if (horariosFinal.length <= 0) {
                horariosFinal.push(horario);
            } else {
                const h = {
                    ini: this.toTime(horario.hora_inicio),
                    fin: this.toTime(horario.hora_fin)
                }
                var succes = false;
                horariosFinal.map((hf) => {
                    //Cuando la hora inicio intercepta
                    if (h.ini >= this.toTime(hf.hora_inicio) && h.ini <= this.toTime(hf.hora_fin)) {
                        if (h.fin >= this.toTime(hf.hora_fin)) {
                            hf.hora_fin = horario.hora_fin;
                        }
                        succes = true;
                        return;
                    }
                    //Cuando la hora fin intercepta
                    if (h.fin >= this.toTime(hf.hora_inicio) && h.ini <= this.toTime(hf.hora_fin)) {
                        if (h.ini <= this.toTime(hf.hora_inicio)) {
                            hf.hora_inicio = horario.hora_inicio;
                        }
                        succes = true;
                        return;
                    }
                })
                if (!succes) {
                    horariosFinal.push(horario);
                }
            }

        })
        return horariosFinal;
    }
}