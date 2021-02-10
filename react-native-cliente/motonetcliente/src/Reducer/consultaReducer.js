const initialState = {
    estado: "",
    data: false,
    lastSend: new Date().getTime(),
    doctores: {}
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }
    if (action.component == "consulta") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByUsuario":
                getAllByUsuario(state, action);
                break;
            case "confirmarConsulta":
                confirmarConsulta(state, action);
                break;
            case "cancelarConsulta":
                cancelarConsulta(state, action);
                break;
            case "getByDoctorFecha":
                getByDoctorFecha(state, action);
                break;
        }
        state.lastSend = new Date().getTime();
        state.type = action.type;
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        state.dataRegistrado = action.data;
    }
}

const getAllByUsuario = (state, action) => {
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


const confirmarConsulta = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
    }
}

const cancelarConsulta = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
    }
}


const getByDoctorFecha = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        var key_doctor = action.key_doctor;
        var fecha = action.fecha;
        if (!state.doctores[key_doctor]) {
            state.doctores[key_doctor] = {}
        }
        if (!state.doctores[key_doctor][fecha]) {
            state.doctores[key_doctor][fecha] = [];
            state.doctores[key_doctor][fecha] = action.data;
        }
    }
}