import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    getByDate(state: any, action: any): void {
        if (action.estado == "exito") {
            state.date = action.data;
        }
    }
    getActivosByUser(state: any, action: any): void {
        if (action.estado == "exito") {
            state.misActivos = action.data;
        }
    }

}