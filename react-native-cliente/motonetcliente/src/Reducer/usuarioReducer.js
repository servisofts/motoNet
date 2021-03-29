import { AsyncStorage } from 'react-native';
import { act } from 'react-test-renderer';
const initialState = {
    estado: "Not Found",
    estadoEmail: false,
    history: [],
    usuarioLog: false,
    sessiones: {},
    data: {},
    lastSend: new Date(),
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
            case "loginGmail":
                loginGmail(state, action);
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
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const identificacion = (state, action) => {

    state.estado = action.estado
    if (action.estado === "exito") {
        if (!action.data.key) {
            return;
        }
        state.usuarioLog = action.data;
        AsyncStorage.setItem("clinica_usuarioLog", JSON.stringify(action.data));
        state.login = "login"
    }
}
const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem("clinica_usuarioLog", JSON.stringify(action.data));
        state.login = action.data
    }
}
const pedir = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        alert("llego")
    }

}
// const getById = (state, action) => {
//     state.estado = action.estado
//     if (action.estado === "exito") {
//         if (action.data.length > 0) {
//             state.data[actio.key] = JSON.parse(action.data[0].data)
//         } else {
//             state.data[actio.key] = true;
//         }
//     }
// }

const getById = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (action.key == state.usuarioLog.key) {
            if (action.data.length > 0) {
                state.usuarioDatos = JSON.parse(action.data[0].data)
                state.data[action.key] = JSON.parse(action.data[0].data);
            } else {
                state.usuarioDatos = true;
                state.data[action.key] = true;
            }
        } else {
            if (action.data.length > 0) {
                state.data[action.key] = JSON.parse(action.data[0].data)
            } else {
                state.data[action.key] = true;
            }
        }
    }
    // if(){

    // }
}
const loginFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem("clinica_usuarioLog", JSON.stringify(action.data));
        state.login = action.data
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const loginGmail = (state, action) => {
    console.log(action);
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        AsyncStorage.setItem("clinica_usuarioLog", JSON.stringify(action.data));
        state.login = action.data
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "error") {
        state.errorRegistro = action.error
    }
    if (action.estado === "exito") {
        state.usuarioLog = action.data
        AsyncStorage.setItem("motonet_usuarioLog", JSON.stringify(action.data));
    }
}
const registroFacebook = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.usuario;
        state.login = "facebook"
    }
    if (action.estado === "error") {
        state.error = action.error
    }
}
const getUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data
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
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}

const cambiarPassByCodigo = (state, action) => {
    state.estadoEmail = action.estado
    if (action.estado === "exito") {
        state.usuarioRecuperado = action.data;
    }
    if (action.estado === "error") {
        state.errorEmailRecuperado = action.error
    }
}