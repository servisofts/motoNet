
const initialState = {
    estado: ""
 
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "asociacionMoto") {
        switch (action.type) {
            case "Registro":
                Registro(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
        }

        state = { ...state };
    }
    return state;
}

const Registro = (state, action) => {
    state.estado = action.estado
}

const getAll = (state, action) => {
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

