import { AsyncStorage } from 'react-native';
const initialState = {
    ubicacion: {
        inicio: {
            value: "",
            estado: true,
            data: false
        },
        fin: {
            value: "",
            estado: false,
            data: false
        }
    },
    data: false,
    estadoConsultado: false
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "viaje") {
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
            case "cancelarBusqueda":
                cancelarBusqueda(state, action);
                break;
            case "negociarViajeConductor":
                negociarViajeConductor(state, action);
                break;
            case "cancelarViajeCliente":
                cancelarViajeCliente(state, action);
                break;
            case "cancelarViajeConductor":
                cancelarViajeConductor(state, action);
                break;
            case "notificarSiguiente":
                notificarSiguiente(state, action);
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
            case "terminarViaje":
                terminarViaje(state, action);
                break;
            case "cobrarViaje":
                cobrarViaje(state, action);
                break;
            case "getViaje":
                getViaje(state, action);
                break;
            case "calificarViajeCliente":
                calificarViajeCliente(state, action);
                break;
            case "getViajeByKeyUsuario":
                getViajeByKeyUsuario(state, action);
                break;
            case "denegarOferta":
                denegarOferta(state, action);
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
    state.viaje = action.data
}

const cancelarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    state.data = false
    AsyncStorage.removeItem("motonet_viaje");
}

const confirmarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const buscar = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const negociarViajeConductor = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const cancelarViajeCliente = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const cancelarViajeConductor = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}


const notificarSiguiente = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const movimientos = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const conductorLlegoDestino = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const inicioDeRuta = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const terminarViaje = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}

const cobrarViaje = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.removeItem("motonet_viaje");
    }
}

const getViaje = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));

    }
}

const calificarViajeCliente = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
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

const denegarOferta = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
    }
}