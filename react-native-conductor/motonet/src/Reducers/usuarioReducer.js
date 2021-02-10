import { AsyncStorage } from 'react-native';
const initialState = {
    estado: "Not Found",
    history: [],
    usuarioLog: false,
    sessiones: {},
    lastSend: new Date(),
}
import AppParam from '../Json/index.json';
export default (state, action) => {
    if (!state) return initialState

    if (action.component == "clearReducer") {
        state = initialState;
        state = { ...state };
    }
    if (action.component == "usuario") {
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "loginFacebook":
                loginFacebook(state, action);
                break;
            case "confirmarDatos":
                confirmarDatos(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "registroFacebook":
                registroFacebook(state, action);
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
            case "insertarDato":
                insertarDato(state, action);
                break;
            case "recuperarPass":
                recuperarPass(state, action);
                break;

        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const confirmarDatos = (state, action) => {
    state.estado = action.estado
    state.usuarioDatos = action.data
    state.estado = "exito"
}
const identificacion = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem(AppParam.storage.usuarioLog, JSON.stringify(action.data));
        state.login = "login"
    }
}
const recuperarPass = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        
    }
}

const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem(AppParam.storage.usuarioLog, JSON.stringify(action.data));
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
        if (action.data) {
            state.usuarioDatos = JSON.parse(action.data[0].data);
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
        AsyncStorage.setItem(AppParam.storage.usuarioLog, JSON.stringify(action.data));
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

const insertarDato = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.data.length > 0) {
            state.usuarioDatos[action.dato] = action.data[0]
        } else {
            state.usuarioDatos = true;
        }
    }
}