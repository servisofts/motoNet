const initialState = {
    estado: "",
    tipoViaje:{}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "tipoViaje") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
        }
        state = { ...state };
    }
    if (action.component == "tipoTarifa") {
        switch (action.type) {
            case "editarMontoTipoViaje":
                editarMontoTipoViaje(state, action);
                break;
        }
        state = { ...state };
    }

    return state;
}

const editarMontoTipoViaje = (state, action) => {
    if (action.estado == "exito") {
        if (!state.data) {
            state.data = {}
        }
        if (state.data[action.key_tipo_viaje]) {
            if (!state.data[action.key_tipo_viaje].tarifas) {
                state.data[action.key_tipo_viaje].tarifas = {};
            }
            state.data[action.key_tipo_viaje].tarifas = {
                ...state.data[action.key_tipo_viaje].tarifas,
                ...action.data
            }
        }
    }

}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        var obj = action.data;
        state.data[obj.key] = obj;
    }

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

const getById = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.tipoViaje) {
            state.tipoViaje = {}
        }
        state.tipoViaje[action.data.key] = action.data;
    }
}


