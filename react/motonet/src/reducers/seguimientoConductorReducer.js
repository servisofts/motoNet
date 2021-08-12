
const initialState = {
    estado: "",
    data: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "seguimientoConductor") {
        state.estado = action.estado;
        switch (action.type) {
            case "startAll":
                startAll(state, action);
                break;
            case "stopAll":
                stopAll(state, action);
                break;
            case "changePosition":
                changePosition(state, action)
                break;
            case "getAll":
                getAll(state, action)
                break;
        }
        state = { ...state };
    }
    return state;
}

const startAll = (state, action) => {
    state.estado = action.estado;
    state.isRun = true;

}

const stopAll = (state, action) => {
    state.estado = action.estado;
    state.data = false;
    state.isRun = false;

}

const changePosition = (state, action) => {
    state.data = action.data;
    state.isRun = true;
}
const getAll = (state, action) => {
    if (action.estado == "exito") {
        state.data = action.data;
    }
}
