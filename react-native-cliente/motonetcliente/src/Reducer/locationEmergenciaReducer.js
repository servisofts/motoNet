const initialState = {
    // estado: "Not Found",
    // usuarioLog: false,
    // listaBusqueda: false,
    region: false,
    estado: false
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "locationEmergencia") {
        switch (action.type) {
            case "Miubicacion":
                Miubicacion(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const Miubicacion = (state, action) => {
    state.estado = action.estado;
    // if (action.estado === "exito") {
    state.region = action.data
    // }
}