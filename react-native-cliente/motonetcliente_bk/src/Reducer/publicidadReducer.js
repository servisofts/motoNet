const initialState = {
    estado: "",
    data: false,
    type: ""
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "publicidad") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "subirFoto":
                subirFoto(state, action);
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

const getAll = (state, action) => {
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

const subirFoto = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        state.data[action.data.key] = action.data;
    }
}

const eliminar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        delete state.data[action.key];
    }
}




