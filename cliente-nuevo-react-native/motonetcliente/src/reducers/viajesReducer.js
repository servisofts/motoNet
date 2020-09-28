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
        }
        state = { ...state };
    }
    return state;
}

const actualizarViaje = (state, action) => {
    state.ubicacion = action.data
}
const buscar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {

    }
}
