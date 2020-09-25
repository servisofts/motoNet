const initialState = {
}

export default (state, action) => {
    if (!state) {
        return initialState
    }
    if (action.component == "viaje") {
        switch (action.type) {
            case "viajeEntrante":
                viajeEntrante(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const viajeEntrante = () => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data
    }
}