import { SReducer } from "servisofts-model";

export default class Reducer extends SReducer {
    
    getHorarios(state: any, action: any): void {
        if (action.estado == "exito") {
            state.horario = action.data;
        }
    }

}