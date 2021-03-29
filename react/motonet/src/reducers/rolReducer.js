
const initialState = {
    estado: "",
    data: false,
    dataRolUsuario: false
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "rol") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "setPermiso":
                setPermiso(state, action);
                break;
            case "setRolUsuario":
                setRolUsuario(state, action);
                break;
            case "getAllRolUsuario":
                getAllRolUsuario(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
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
const setPermiso = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        if (!state.data[action.key_rol].permisos) {
            state.data[action.key_rol].permisos = {};
        }
        if (!action.data) {
            delete state.data[action.key_rol].permisos[action.path];
        } else {
            state.data[action.key_rol].permisos[action.path] = action.data;
        }
    }
}
const setRolUsuario = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!action.dataRolUsuario) {
            state.dataRolUsuario[action.key_usuario] = action.data;
        }
    }
}
const getAllRolUsuario = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.dataRolUsuario = {};
        action.data.map((obj, key) => {
            state.dataRolUsuario[obj.key_usuario] = obj;
        });
    }
}