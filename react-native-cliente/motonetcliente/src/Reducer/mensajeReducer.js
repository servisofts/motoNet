const initialState = {
    estado: false,
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "mensaje") {
        switch (action.type) {
            case "enviar":
                enviar(state, action);
                break;
            case "getAllByViaje":
                getAllByViaje(state, action);
                break;
        }
        state.type = action.type;
        state = { ...state };
    }
    return state;
}
const enviar = (state, action) => {
    state.estado = action.estado;
    if (!state.data[action.data.key_viaje]) {
        state.data[action.data.key_viaje] = {};
    }
    state.data[action.data.key_viaje][action.data.key] = action.data;
}
const getAllByViaje = (state, action) => {
    state.estado = action.estado;
    if (action.estado == "exito") {
        state.data[action.key_viaje] = action.data;
    }
}

