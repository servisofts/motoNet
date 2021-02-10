import { AsyncStorage } from 'react-native';
const initialState = {
    data: false,
    estadoConsultado: false
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "emergencia") {
        switch (action.type) {
            case "Addubicacion":
                ubicacion(state, action);
                break;
            case "actualizarUbicacion":
                actualizarUbicacion(state, action);
                break;
            case "actualizarViaje":
                actualizarViaje(state, action);
                break;
            case "buscar":
                buscar(state, action);
                break;
            case "confirmarBusqueda":
                confirmarBusqueda(state, action);
                break;
            case "confirmarBusquedaConductor":
                confirmarBusqueda(state, action);
                break;
            case "cancelarBusqueda":
                cancelarBusqueda(state, action);
                break;
            case "cancelarViajeCliente":
                cancelarViajeCliente(state, action);
                break;
            case "cancelarViajeConductor":
                cancelarViajeConductor(state, action);
                break;
            case "movimiento":
                movimientos(state, action);
                break;
            case "conductorLlegoDestino":
                conductorLlegoDestino(state, action);
                break;
            case "inicioDeRuta":
                inicioDeRuta(state, action);
                break;
            case "terminarViajeConductor":
                terminarViajeConductor(state, action);
                break;
            case "getViaje":
                getViaje(state, action);
                break;
            case "calificarViajeCliente":
                calificarViajeCliente(state, action);
                break;
            case "asignarAmbulancia":
                asignarAmbulancia(state, action);
                break;
            case "ambulanciaCerca":
                ambulanciaCerca(state, action);
                break;
            case "eliminarViaje":
                eliminarViaje(state, action);
                break;
            case "getViajeByKeyUsuario":
                getViajeByKeyUsuario(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const actualizarUbicacion = (state, action) => {
    state.ubicacion = action.data
}

const actualizarViaje = (state, action) => {
    state.data = action.data
}

const cancelarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    AsyncStorage.removeItem("emergencia_viaje");
}

const confirmarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const asignarAmbulancia = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const ambulanciaCerca = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const buscar = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const eliminarViaje = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = false;
        AsyncStorage.removeItem("emergencia_viaje")
    }
}
const cancelarViajeCliente = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = false;
        AsyncStorage.removeItem("emergencia_viaje")
    }
}

const cancelarViajeConductor = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const movimientos = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const conductorLlegoDestino = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const inicioDeRuta = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const getViaje = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const calificarViajeCliente = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
    }
}

const terminarViajeConductor = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = false;
        AsyncStorage.removeItem("emergencia_viaje")
    }
}


const getViajeByKeyUsuario = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        state.estadoConsultado = true;
        if (!action.data) {
            AsyncStorage.removeItem("emergencia_viaje");
        } else {
            AsyncStorage.setItem("emergencia_viaje", JSON.stringify(action.data));
        }
    }
}