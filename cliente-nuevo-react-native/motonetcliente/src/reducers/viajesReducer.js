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
    viaje: false,
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "viaje") {
        switch (action.type) {
            case "Addubicacion":
                ubicacion(state, action);
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

        }
        state = { ...state };
    }
    return state;
}

const actualizarViaje = (state, action) => {
    state.ubicacion = action.data
}
const cancelarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
}

const confirmarBusqueda = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.viaje = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}
const buscar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.viaje = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}
