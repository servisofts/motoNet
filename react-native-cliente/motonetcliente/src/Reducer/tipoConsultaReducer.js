const initialState = {
    estado: "",
    // Aqui se registran las que cada doctor tiene activas
    doctores: {}

}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "tipoConsulta") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registroDoctor":
                registroDoctor(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = obj;
        });
    }
}
const registroDoctor = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.doctores[action.key_doctor] = action.data;
    }
}


