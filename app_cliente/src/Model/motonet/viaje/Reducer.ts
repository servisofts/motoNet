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

}