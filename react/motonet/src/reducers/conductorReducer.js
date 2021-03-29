
const initialState = {
    estado: ""

}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "usuario" && action.cabecera == "registro_conductor") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllCabecera":
                getAllCabecera(state, action);
                break;
            case "cambiarEstadoDatoConductor":
                cambiarEstadoDatoConductor(state, action);
                break;
            case "cambiarEstadoDatoConductorAll":
                cambiarEstadoDatoConductorAll(state, action);
                break;
            case "confirmarDatos":
                confirmarDatos(state, action);
                break;
        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    // state.estado = action.estado
    if (action.estado === "exito") {
        var obj = action.data.datos[0];
        var objNew = {};
        action.data.datos = false;
        objNew.usuario = action.data
        objNew.data = obj.data;
        // obj.data = JSON.parse(obj.data);
        if (!state.data) {
            return;
        }
        state.data[obj.key_usuario] = objNew;
    }
    // if (action.estado === "error") {
    // state.error = action.error
    // }
}

const getAllCabecera = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.usuario.key] = obj;
        });
    }
}

const cambiarEstadoDatoConductor = (state, action) => {
    if (action.key_conductor && action.key_dato) {
        state.data[action.key_conductor].data[action.key_dato].estado = action.estado;
    }
}

const cambiarEstadoDatoConductorAll = (state, action) => {
    if (action.key_conductor) {
        Object.keys(state.data[action.key_conductor].data).map((key) => {
            state.data[action.key_conductor].data[key].estado = action.estado;
        })
    }
}

const confirmarDatos = (state, action) => {
    state.estadoConfirmando = action.estado;
}