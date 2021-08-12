
const getUsuario = () => {
    if (!sessionStorage.getItem("usuarioLog"), false) {
        return false;
    }
    return JSON.parse(sessionStorage.getItem("usuarioLog"), false);
}

const initialState = {
    estado: "",
    usuarioLog: getUsuario(),
    dataUsuario: {},
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
            case "insertarDato":
                insertarDato(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
                break;
            case "bloquear":
                bloquear(state, action);
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

const bloquear = (state, action) => {
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

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {

        var obj = action.data.datos[0];
        if (typeof obj.data == "string") {
            obj.data = JSON.parse(obj.data);
        }
        console.log(obj);

        var usuario = { ...action.data };
        delete usuario["datos"];
        state.registrado = obj;
        if (!state.data) {
            return;
        }
        console.log(usuario)
        state.data[obj.key_usuario] = {
            data: obj.data,
            usuario: usuario,
            key: usuario.key
        };
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
        if (!state.dataUsuario) {
            state.dataUsuario = {};
        }
        if (action.data[0]) {
            state.dataUsuario[action.key] = JSON.parse(action.data[0].data)
        } else {
            state.dataUsuario[action.key] = {};
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

const insertarDato = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            return;
        }
        if (!state.data[action.key_usuario]) {
            return;
        }
        if (action.dato) {
            if (action.data.length > 0) {
                state.data[action.key_usuario].data[action.dato] = action.data[0]
            } else {
                state.data[action.key_usuario].data[action.dato] = true;
            }
        } else {
            var usrTemp = {};
            action.data.map((obj, key) => {
                Object.keys(state.data[action.key_usuario].data).map((keyDatoAdmin) => {
                    var datoTemp = state.data[action.key_usuario].data[keyDatoAdmin];
                    if (datoTemp.key == obj.key) {
                        usrTemp[keyDatoAdmin] = obj;
                    }
                });
            });
            state.data[action.key_usuario].data = usrTemp;
        }

    }
}
const eliminar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data[action.key_admin]) {
            delete state.data[action.key_admin];
        }
        /* if (state.data[action.key_especialidad]) {
             delete state.data[action.key_especialidad][action.key_doctor];
         }*/
    }
}