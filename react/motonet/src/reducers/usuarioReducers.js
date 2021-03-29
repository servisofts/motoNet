
const getUsuario = () => {
    if (!sessionStorage.getItem("usuarioLog"), false) {
        return false;
    }
    return JSON.parse(sessionStorage.getItem("usuarioLog"), false);
}

const initialState = {
    estado: "",
    usuarioLog: getUsuario()
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "usuario") {
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "getAllNuevo":
                getAllNuevo(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
            case "recuperarPass":
                recuperarPass(state, action);
                break;
            case "verificarCodigoPass":
                verificarCodigoPass(state, action);
                break;
            case "cambiarPassByCodigo":
                cambiarPassByCodigo(state, action);
                break;           

        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        sessionStorage.setItem("usuarioLog", JSON.stringify(action.data));
    }
    if (action.estado === "error") {
        state.error = action.error
    }

}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var obj = action.data.datos[0];
        obj.data = JSON.parse(obj.data);
        state.registrado = obj;
        if (!state.data) {
            return;
        }
        state.data[obj.key_usuario] = obj;
    }
    if (action.estado === "error") {
        state.error = action.error
    }

}
const getAllNuevo = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key_usuario] = JSON.parse(obj.data);
        });
    }
}

const getAll = (state, action) => {
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

const getById = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.dataEmergencia) {
            state.dataEmergencia = {};
        }
        if (action.data[0]) {
            state.dataEmergencia[action.key] = JSON.parse(action.data[0].data)
        } else {
            state.dataEmergencia[action.key] = {};
        }
    }
}


const recuperarPass = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}

const verificarCodigoPass = (state, action) => {
    state.estadoVerificarEmail = action.estado
    if (action.estado === "exito") {
        state.verificarCodigoRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}

const cambiarPassByCodigo = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.confirmarCodigo = {};
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}