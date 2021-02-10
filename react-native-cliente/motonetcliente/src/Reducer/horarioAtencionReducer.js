
const initialState = {
    estado: "",
    data: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "horarioAtencion") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}


const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data[action.key_doctor]) {
            state.data[action.key_doctor] = {}
        }
        state.data[action.key_doctor] = action.data;
    }
}