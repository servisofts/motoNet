//SOCKET CLIENTE NUEVO
import Config from './config.json';
import SSSession from './SSSession';
const DEBUG = false;
var store;
var SESSIONES = {};
const Log = (mensaje) => {
    if (DEBUG) {
        console.log("\x1b[34m" + "SSSocketNative: " + mensaje + "\x1b[39m");
    }
}

export const init = (_store) => {
    store = _store;
    Log("Estore inicializado.");
    insertInReducer();
    
}
const insertInReducer = () => {
    var states = store.getState();
    if (states.socketClienteReducer.SESSIONES) {
        SESSIONES = states.socketClienteReducer.SESSIONES;
        Object.keys(SESSIONES).map((key) => {
            var sess = getSession(key);
            if (sess) {
                if (sess.isActivo()) {
                    states.socketClienteReducer.sessiones[key] = {
                        isOpen: true,
                        estado: "conectado",
                        send: (json,isDisp) => {
                            sess.send(json,isDisp);
                        }
                    }
                    return;
                }
            }
            open(key);
            states.socketClienteReducer.sessiones[key] = {
                isOpen: false,
                estado: "desconectado",
                send: (json) => {
                    //EL SOCKECT ESTA CERRADO 
                    Log("Error al enviar datos no existe socket");
                    open(key);
                }
            }
            return;

        });
        store.dispatch({
            component: "SSSocket",
            type: "dataChange",
        })
    }
}
export const open = (_SocketName) => {
    var sessionConfig = getSessionConfig(_SocketName);
    if (!sessionConfig) {
        Log("ERROR: Configuracion no encontrada " + _SocketName + " ::open");
        return false;
    }
    if (!SESSIONES[_SocketName]) {
        Log("Nueva Session creada ::open");
        SESSIONES[_SocketName] = new SSSession(sessionConfig, this.store, insertInReducer);
        var states = store.getState();
        states.socketClienteReducer.SESSIONES = SESSIONES;

    } else {
        Log("La session ya existe ::open");
    }
    SESSIONES[_SocketName].open();
    return true;
    // Log(JSON.stringify(session.getConfig()));
}

export const getSessionConfig = (_SocketName) => {
    if (!Config[_SocketName]) {
        Log("No existen configuraciones para el socket " + _SocketName + " ::getSessionConfig");
        return false;
    }
    Config[_SocketName]["nombre"] = _SocketName;
    return Config[_SocketName];
}
export const getSession = (_SocketName) => {
    if (!SESSIONES[_SocketName]) {
        Log("NO EXISTE LA SESSION " + _SocketName + " ::getSession");
        open(_SocketName);
    }
    SESSIONES[_SocketName].setStore(store);
    return SESSIONES[_SocketName];
}