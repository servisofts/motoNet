const initialState = {
    estado: "",
    data: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "tipoConsultaDoctor") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var obj = action.data;
        state.data[action.key_doctor] = obj;
    }

}

const eliminar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var obj = action.data;
        state.data[action.key_doctor] = obj;
    }


}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        state.data[action.key_doctor] = action.data;
    }
}


