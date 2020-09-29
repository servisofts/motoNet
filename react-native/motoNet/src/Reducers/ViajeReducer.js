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

const viajeEntrante = (state, action) => {
    state.estado = action.estado
    if (state.estado === "exito") {
        console.log("Viaje entrantee.....")
        state.data = action.data
    }
}