import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    editar(state: any, action: any): void {
        if (action.estado == "exito") {
            // if (action.data.key_conductor == Model.usuario.Action.getKey()) {
            // console.log("Entro")
            if (state.activo) {
                state.activo[action.data.key] = action.data;
            }

            // }
        }
    }
    action(state: any, action: any): void {
        if (action.estado == "exito") {
            // if (action.data.key_conductor == Model.usuario.Action.getKey()) {
            // console.log("Entro")
            if (state.activo) {
                state.activo[action.data.key] = action.data;
            }

            // }
        }
    }
    getActivos(state: any, action: any): void {
        if (action.estado == "exito") {
            state.activo = action.data;
        }
    }
    // solicitar_viaje_conductor(state: any, action: any): void {
    //     if (action.estado == "exito") {
    //         state.timeAllow = action.timeAllow;
    //         state.viaje = action.data;
    //         console.log("solicitar_viaje_conductor")
    //     }
    // }

    getDetalle(state: any, action: any): void {
        if (action.estado == "exito") {
            if (!state.activo) {
                state.activo = {}
            }
            state.activo[action.data[this.model.pk]] = action.data;
        }
    }

}