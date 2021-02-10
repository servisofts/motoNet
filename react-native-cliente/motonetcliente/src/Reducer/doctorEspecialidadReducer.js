
const initialState = {
    estado: "",
    data: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "doctorEspecialidad") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByKeyDoctor":
                getAllByKeyDoctor(state, action);
                break;
            case "getAllByKeyEspecialidad":
                getAllByKeyEspecialidad(state, action);
                break;
        }
        state = { ...state };
        
    }
    return state;
}


const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data[action.key_doctor]) {
            state.data[action.key_doctor] = {}
        }
        var obj = action.data;
        state.data[action.key_doctor][obj] = obj;
    }
}

const getAllByKeyDoctor = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data[action.key_doctor]) {
            state.data[action.key_doctor] = {}
        }
        action.data.map((obj, key) => {
            state.data[action.key_doctor][obj] = obj;
        });
    }
}

const getAllByKeyEspecialidad = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data[action.key_especialidad]) {
            state.data[action.key_especialidad] = {}
        }
        action.data.map((obj, key) => {
            state.data[action.key_especialidad][obj] = obj;
        });
    }
}