import { AsyncStorage } from "react-native";

const initialState = {
}

export default (state, action) => {
    if (!state) {
        return initialState
    }
    if (action.component == "viaje") {
        switch (action.type) {
            case "viajeEntrante":
                viajeEntrante(state, action);
                break;
            case "confirmarBusqueda":
                confirmarBusqueda(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const viajeEntrante = (state, action) => {
    if (action.estado === "exito") {
        console.log("Viaje entrantee.....")
        state.data = action.data
    }
}

const confirmarBusqueda = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonetConductor_viaje", JSON.stringify(action.data));        
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}