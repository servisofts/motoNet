
const initialState = {
    estado: ""

}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "usuario") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllCabecera":
                getAllCabecera(state, action);
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
        objNew.data  = obj.data;
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

