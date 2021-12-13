import { AsyncStorage } from 'react-native';
const initialState = {
    estado: "Not Found",
    data: [],
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "chat") {
        switch (action.type) {
            case "recetor":
                recetor(state, action);
                break;
            case "emisor":
                emisor(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const recetor = (state, action) => {
    state.estado = action.estado
    if (action.estado === "error") {
        state.error = action.error
    }
    if (action.estado === "exito") {
        state.data = action.data
    }
}


const emisor = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.data.length > 0) {
            state.usuarioDatos = JSON.parse(action.data[0].data)
        } else {
            state.data = true;
        }
    }
}