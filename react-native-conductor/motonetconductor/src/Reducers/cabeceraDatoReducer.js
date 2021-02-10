const initialState = {
    estado: "",
    data:{}
}
export default (state, action) => {
    if (!state) return initialState
    
    if (action.component == "clearReducer") {
        
        state = initialState;
        state = { ...state };
    }
    if (action.component == "cabeceraDato") {
        switch (action.type) {
            case "getDatoCabecera":
                getDatoCabecera(state, action);
                break;
        }
        if (action.estado == "error") {
            state.error = action.error;
        }
        state = { ...state };
    }
    return state;
}

const getDatoCabecera = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera] = action.data;
    }
}
