import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    onChange(state: any, action: any): void {
        // if (action.estado == "exito") {
            state.location = action.data;
        // }
    }
}