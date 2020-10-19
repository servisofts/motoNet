const initialState = {
    estado: "",
    data:{},
    seleccionado:false,
    navigate:(select,dispatch)=>{
        initialState.seleccionado =select; 
        dispatch({
            component:"componenteInicio",
            type:"change",
            select
        })
    }
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "componenteInicio") {
        if(action.type == "change"){
            state.seleccionado = action.select
        }
        state = { ...state };
    }
    return state;
}

