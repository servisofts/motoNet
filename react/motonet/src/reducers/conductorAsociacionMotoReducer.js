
const initialState = {
    estado: "",
    data: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "conductorAsociacionMoto") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByKeyConductor":
                getAllByKeyConductor(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
                break;
        }


        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data[action.key_doctor]) {
            state.data[action.key_doctor] = {}
        }
        var obj = action.data;
        state.data[action.key_doctor][obj] = obj;

    }

}

const getAllByKeyConductor = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data[action.key_doctor]) {
            state.data[action.key_doctor] = {}
        }
        action.data.map((obj, key) => {
            state.data[action.key_doctor][obj] = obj;
        });
    }
}


const eliminar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data[action.key_doctor]) {
            delete state.data[action.key_doctor][action.key_especialidad];
        }
        if (state.data[action.key_especialidad]) {
            delete state.data[action.key_especialidad][action.key_doctor];
        }
    }
}