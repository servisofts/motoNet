import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {

    registroAll(state: any, action: any): void {
        if (action.estado == "exito") {
            if(!state.data) return;
            action.data.map((obj) => {
                state.data[obj.key] = obj;
            })
        }
    }

}