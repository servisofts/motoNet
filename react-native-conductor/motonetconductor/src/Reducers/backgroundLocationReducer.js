import { AsyncStorage } from 'react-native';
import AppParam from '../Json/index.json'
const initialState = {
    isOpen: false,
    isMotos: false,
    history: [],
    estado: false,
    usuario_servicio: {}
}
export default (state, action) => {
    if (!state) state = initialState
    if (action.component == "clearReducer") {
        state = close(state, action);
        history = [];
        state = { ...state };
    }
    if (action.component === "backgroundLocation") {
        var newState = { ...state }
        switch (action.type) {
            case "init":
                newState = init(newState, action);
                break;
            case "open":
                newState = open(newState, action);
                break;
            case "onLocationChange":
                newState = onLocationChange(newState, action);
                break;
            case "close":
                newState = close(newState, action);
                break;
            case "onLocationChangeSend":
                newState = onLocationChangeSend(newState, action);
                break;
            case "getAllOpen":
                newState = getAllOpen(newState, action);
                break;
            case "getAllClose":
                newState = getAllClose(newState, action);
                break;
            case "getAllUpdate":
                newState = getAllUpdate(newState, action);
                break;
            case "registro":
                newState = registro(newState, action);
                break;
            default: break;
        }
        return {
            ...newState
        }
    }
    return state
}


const init = (newState, action) => {
    newState.isOpen = false;
    newState.estado = "close";
    newState.open = action.open;
    newState.close = action.close;
    return newState;
}
const open = (newState, action) => {
    newState.isOpen = true;
    newState.estado = "exito";
    AsyncStorage.setItem(AppParam.storage.isBackgroundLocation, "open");
    return newState;
}
const onLocationChange = (newState, action) => {
    // if (!newState.isOpen) {
    //     return newState;
    // }
    newState.estado = "exito";
    newState.data = action.data;
    newState.last = action.last;
    // newState.history.push(action.data);
    // if (newState.history.length > 20) {
    //     newState.history = newState.history.slice(newState.history.length - 6, newState.history.length - 1)
    // }
    // console.log(newState.data)
    return newState;
}

const close = (newState, action) => {
    newState.isOpen = false;
    newState.estado = "close";
    AsyncStorage.removeItem(AppParam.storage.isBackgroundLocation);
    return newState;
}

const onLocationChangeSend = (newState, action) => {
    console.log("entro send location");
    return newState;
}
const getAllClose = (newState, action) => {
    console.log("entro al cerrar ");
    newState.isMotos = false;
    newState.locations = [];
    return newState;
}
const getAllOpen = (newState, action) => {
    console.log("emtrp open");
    newState.isMotos = true;
    if (action.estado == "exito") {
        if (!newState.locations) {
            newState.locations = {};
        }
        action.data.map((obj, key) => {
            newState.locations[obj.key] = action.data[key];
        })

    }
    return newState;
}

const getAllUpdate = (newState, action) => {

    if (action.estado == "exito") {
        if (!newState.locations) {
            newState.locations = {};
        }
        action.data.map((obj, key) => {
            newState.locations[obj.key] = action.data[key];
        })
    }
    return newState;
}

const registro = (newState, action) => {
    console.log("action");
    if (!action.key_usuario_servicio) {
        return newState;
    }
    newState.usuario_servicio[action.key_usuario_servicio] = action.data;
    return newState;
}