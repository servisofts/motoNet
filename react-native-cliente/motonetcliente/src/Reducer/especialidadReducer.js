
const initialState = {
    estado: "",
    data: false,
    type: ""
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "especialidad") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
        }
        state.type = action.type;
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
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = obj;
        });
    }

}