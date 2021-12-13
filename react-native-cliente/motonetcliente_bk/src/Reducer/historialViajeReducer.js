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
            
            case "getAll":
                getAll(state, action);
                break;
            c
        }
        state = { ...state };
    }
    return state;
}

const getAll = (state, action) => {
    state.type = action.type
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
        AsyncStorage.setItem("motonet_viaje", JSON.stringify(action.data));
    }
}