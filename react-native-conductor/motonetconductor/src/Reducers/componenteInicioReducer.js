const initialState = {
    estado: "",
    data: {},
    seleccionado: false,
    navigate: (select, dispatch) => {
        initialState.seleccionado = select;
        dispatch({
            component: "componenteInicio",
            type: "change",
            select
        })
    }
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "componenteInicio") {
        if (action.type == "change") {
            state.seleccionado = action.select
        }
        state = { ...state };
    }

    if (action.component == "viaje") {        
        if (action.type == "viajeEntrante") {
            state.seleccionado = "ConfirmarViaje";  
        }
        if (action.type == "cancelarBusquedaConductor") {            
            state.seleccionado = "IniciarTurno";            
        }
        state = { ...state };
    }


    return state;
}

