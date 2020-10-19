import { AsyncStorage } from 'react-native';
const initialState = {
    estado: "Not Found",
    history: [],
    usuarioLog: false,
    sessiones: {}
}
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "usuario") {
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "loginFacebook":
                loginFacebook(state, action);
                break;

            case "registro":
                registro(state, action);
                break;
            case "registroFacebook":
                registroFacebook(state, action);
                break;
            case "pedir":
                pedir(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
            case "getUsuario":
                getUsuario(state, action);
                break;
            case "identificacion":
                identificacion(state, action);
                break;

        }
        state = { ...state };
    }
    return state;
}
const identificacion = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem("motonet_usuarioLog", JSON.stringify(action.data));
        state.login = "login"
    }
}
const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem("motonet_usuarioLog", JSON.stringify(action.data));
        state.login = "login"
    }
}
const pedir = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        alert("llego")
    }

}
const getById = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.data.length > 0) {
            state.usuarioDatos = JSON.parse(action.data[0].data)

        } else {
            state.usuarioDatos = true;
        }
    }
}
const loginFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.usuario;
        state.login = "login"
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "error") {
        state.error = action.error
    }
    if (action.estado === "exito") {
        state.usuarioLog = action.data
    }
}
const registroFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.usuario;
        state.login = "facebook"
    }
    if (action.estado === "error") {
        alert("error jjjjajaj")
    }
}
const getUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data
    }
}