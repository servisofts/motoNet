const initialState = {
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "seguimientoConductor") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;

        }
        state.type = action.type
        state.estado = action.estado
        state.error = action.error
        state = { ...state };
    }
    return state;
}
const getAll = (state, action) => {
    if (action.estado === "exito") {
        state.dataConductores = action.data
    }
}