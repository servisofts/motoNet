const initialState = {
    estado: "",
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "parametrosViaje") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "modificar":
                modificar(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        var obj = action.data;
        state.data[obj.key] = obj;

    }

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

const modificar = (state, action) => {
    // state.estado = action.estado
    // if (action.estado === "exito") {
    //     if (!state.data) {
    //         state.data = {}
    //     }
    //     //state.dataParametro[action.key] = JSON.parse(action.data[0].data)

    // }
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        var obj = action.data;
        state.data[obj.key] = obj;

    }

}


