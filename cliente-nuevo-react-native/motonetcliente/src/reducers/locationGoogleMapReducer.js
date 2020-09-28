import { act } from "react-test-renderer";

const initialState = {
    estado: "Not Found",
    repuestaMarketText: "",
    markerUbicacion: false,
    listaBusqueda: false,
    escribir: false,
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
            case "escribir":
                state.escribir = action.escribir;
                break;
            case "actualizar":
                actualizar(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}

const actualizar = (state, action) => {
    state.estado = "exito";
    state.type = action.type;
    state.repuestaMarketText = action.repuesta

}
const geocode = (state, action) => {
    state.estado = action.estado;
    state.type = action.type;
    if (action.estado === "exito") {
        state.data = action.data
        state.markerUbicacion = action.data
        state.escribir = false
    }

}
const autoComplete = (state, action) => {
    state.type = action.type;
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.listaBusqueda = action.data
        state.escribir = true

    }
}