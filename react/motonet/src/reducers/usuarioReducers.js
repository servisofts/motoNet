
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
            case "getAllNuevo":
                getAllNuevo(state, action);
                break;
        }

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
        state.erorsango = action.error
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

