import { AsyncStorage } from "react-native";

const initialState = {
}

export default (state, action) => {
    if (!state) {
        return initialState
    }
    if (action.component == "clearReducer") {
        state = initialState;
        state = { ...state };
    }
    if (action.component == "viaje") {
        switch (action.type) {
            case "getAllConductor":
                getAllConductor(state, action);
                break;
            case "viajeEntrante":
                viajeEntrante(state, action);
                break;
            case "confirmarBusqueda":
                confirmarBusqueda(state, action);
                break;
            case "confirmarBusquedaConductor":
                confirmarBusquedaConductor(state, action);
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
            case "movimientos":
                movimiento(state, action);
                break;
            case "denegarOferta":
                denegarOferta(state, action);
                break;
            case "ambulanciaCerca":
                ambulanciaCerca(state, action);
                break;
            case "getViaje":
                getViaje(state, action);
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
            case "iniciarViajeConductor":
                iniciarViajeConductor(state, action);
                break;
            case "inicioDeRuta":
                inicioDeRuta(state, action);
                break;
            case "terminarViajeConductor":
                terminarViajeConductor(state, action);
                break;
            case "finalizarViaje":
                finalizarViaje(state, action);
                break;
            case "cobrarViaje":
                cobrarViaje(state, action);
                break;
            case "borrarViaje":
                borrarViaje(state, action);
                break;
            case "getViajeByKeyUsuario":
                getViajeByKeyUsuario(state, action);
                break;
        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const getAllConductor = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.historial = action.data
    }
}
const viajeEntrante = (state, action) => {
    state.estado = action.estado

    if (action.estado === "exito") {
        console.log("Viaje entrantee.....")
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
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
const confirmarBusquedaConductor = (state, action) => {
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
        AsyncStorage.removeItem("motonet_viaje");
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

const terminarViajeConductor = (state, action) => {
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
const finalizarViaje = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const iniciarViajeConductor = (state, action) => {
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
const denegarOferta = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const ambulanciaCerca = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
    if (state.estado === "error") {
        state.error = action.error
    }
}
const getViaje = (state, action) => {
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

const borrarViaje = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        state.data = false;
        AsyncStorage.removeItem("motonet_viaje");
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
const getViajeByKeyUsuario = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        state.estadoConsultado = true;
        if (!action.data) {
            AsyncStorage.removeItem("motonet_viaje");
        } else {
            AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
        }
    }
}
