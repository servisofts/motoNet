
const initialState = {
    estado: "Not Found",
    usuarioLog: false,
    listaBusqueda: false,
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "locationGoogle") {
        switch (action.type) {
            case "geocode":
                geocode(state, action);
                break;
            case "autoComplete":
                autoComplete(state, action);
                break;
            case "route":
                route(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const geocode = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data = action.data
    }

}
const route = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.route = action.data

    }

}
const autoComplete = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.listaBusqueda = action.data
    }
}