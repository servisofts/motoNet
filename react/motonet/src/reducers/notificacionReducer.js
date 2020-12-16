
const initialState = {
    estado: "",
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "notificacion") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "enviarNotificacion":
                enviarNotificacion(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const enviarNotificacion = (state, action) => {
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