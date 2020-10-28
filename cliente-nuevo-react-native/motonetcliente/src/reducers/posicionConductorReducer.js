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
    posicion: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "posicionConductor") {
        switch (action.type) {
            case "locationChange":
                locationChange(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const locationChange = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.posicion = action.data
    }
}