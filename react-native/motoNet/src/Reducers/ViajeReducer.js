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
            case "cancelarBusquedaConductor":
                cancelarBusquedaConductor(state, action);
                break;
            case "negociarViajeConductor":
                negociarViajeConductor(state, action);
                break;
            case "notificarSiguiente":
                notificarSiguiente(state, action);
                break;
            case "movimiento":
                movimiento(state, action);
                break;
            case "movimiento":
                movimiento(state, action);
                break;
            case "cancelarViajeConductor":
                cancelarViajeConductor(state, action);
                break;
            case "cancelarViajeCliente":
                cancelarViajeCliente(state, action);
                break;
            case "conductorLlegoDestino":
                conductorLlegoDestino(state, action);
                break;
            case "inicioDeRuta":
                inicioDeRuta(state, action);
                break;
            case "terminarViaje":
                terminarViaje(state, action);
                break;
            case "cobrarViaje":
                cobrarViaje(state, action);
                break;
        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const viajeEntrante = (state, action) => {
    if (action.estado === "exito") {
        console.log("Viaje entrantee.....")
        console.log(action.data)
        state.data = action.data
    }
}

const confirmarBusqueda = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}

const cancelarBusquedaConductor = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const cancelarViajeConductor = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}

const terminarViaje = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const cancelarViajeCliente = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const conductorLlegoDestino = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const inicioDeRuta = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const movimiento = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));

    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const cobrarViaje = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}

const negociarViajeConductor = (state, action) => {
    state.estado = action.estado
    console.log(action.estado)
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}

const notificarSiguiente = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = false;
        AsyncStorage.removeItem("motonet_viaje");
    }
}

