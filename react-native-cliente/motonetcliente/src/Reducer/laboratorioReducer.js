const initialState = {
    estado: "",
    data: false,
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "laboratorio") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByUsuario":
                getAllByUsuario(state, action);
                break;
            case "cotizar":
                cotizar(state, action);
                break;
        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        state.dataRegistrado = action.data;
    }
}

const getAllByUsuario = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = obj;
        });
    }
}

const cotizar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        state.dataRegistrado = action.data;
    }
}