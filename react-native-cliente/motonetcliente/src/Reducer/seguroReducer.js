const initialState = {
    estado: "",
    data: false,
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "codigoSeguro") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByUsuario":
                getAllByUsuario(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
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
        state.data[action.data.key] = action.data;
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

const eliminar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        delete state.data[action.data.key];
    }
}