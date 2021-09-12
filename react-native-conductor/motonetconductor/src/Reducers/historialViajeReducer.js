const initialState = {
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "historialViaje") {
        switch (action.type) {
            case "getAllConductor":
                getAllConductor(state, action);
                break;
        }
        state.estado = action.estado;
        state.type = action.type;
        return { ...state }
    }

    return state;
}

getAllConductor = (state, action) => {
    if (action.estado == "exito") {
        state.data = action.data;
    }
}