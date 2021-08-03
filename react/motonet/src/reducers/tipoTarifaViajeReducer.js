
const initialState = {
    estado: "",
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "tipoTarifa") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "seleccionarTipoViaje":
                seleccionarTipoViaje(state, action);
                break;
            case "editarMontoTipoViaje":
                editarMontoTipoViaje(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
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

const seleccionarTipoViaje = (state, action) => {
    state.key_tarifa = action.key_tarifa
}


const editarMontoTipoViaje = (state, action) => {
    // state.estado = action.estado
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        var obj = action.data;
        state.data[obj.key] = obj;
    }
    
}