import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {
    getByKeyUsuarioApp(state: any, action: any): void {
        if (action.estado == "exito") {
            state.my = action.data;
        }
    }

}