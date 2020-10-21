
const initialState = {
    estado: "",
    data: {} 
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "seguimientoConductor") {
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
        }
        state = { ...state };
    }
    return state;
}

const startAll = (state, action) => {
    state.estado = action.estado;

}

const stopAll = (state, action) => {
    state.estado = action.estado

}

const changePosition = (state, action) => {
        state.data = action.data
}