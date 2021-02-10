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
    posicion: false,
    history: [],
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "posicionConductor") {
        switch (action.type) {
            case "locationChange":
                locationChange(state, action);
                break;
        }
        state = {...state };
    }
    return state;
}

const locationChange = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.posicion = action.data
        state.history.push(action.data);
        if (state.history.length > 20) {
            state.history = state.history.slice(state.history.length - 6, state.history.length - 1)
        }
    }
}