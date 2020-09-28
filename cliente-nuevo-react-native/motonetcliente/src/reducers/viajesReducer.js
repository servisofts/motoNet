import { AsyncStorage } from 'react-native';
const initialState = {
    ubicacion: {},
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "viajes") {
        switch (action.type) {
            case "ubicacion":
                ubicacion(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const ubicacion = (state, action) => {
    state.estado = action.estado
    state.ubicacion = action.data
}
