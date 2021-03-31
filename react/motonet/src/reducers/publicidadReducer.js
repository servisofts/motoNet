
const initialState = {
    estado: "",
    data: false
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "publicidad") {
        switch (action.type) {
         
            case "getAll":
                getAll(state, action);
                break;
            case "getAllNuevo":
                getAllNuevo(state, action);
                break;
            case "subirFoto":
                subirFoto(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
                break;
        }


        state = { ...state };
    }
    return state;
}



const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.getAll = true;

        if (!state.data) {
            state.data = {}
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = obj;
        });
    }
}

const getAllNuevo = (state, action) => {
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
const subirFoto = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data[action.data.key] = action.data;
       //state.data[action.key].publicidad = url;
    }

}
const eliminar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var key= action.key;
        delete state.data[key];
    }

}