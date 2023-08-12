import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    action(state: any, action: any): void {
        if (action.estado == "exito") {
            state.viaje = action.data;
        }
    }
    getActivo(state: any, action: any): void {
        if (action.estado == "exito") {
            state.viaje = action.data;
        }
    }
    solicitar_viaje_conductor(state: any, action: any): void {
        if (action.estado == "exito") {
            state.timeAllow = action.timeAllow;
            state.viaje = action.data;
            console.log("solicitar_viaje_conductor")
        }
    }

}