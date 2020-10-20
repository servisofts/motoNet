const initialState = {   
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "tipoViaje") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
        
        }
        state = { ...state };
    }
    return state;
}

const getAll = (state, action) => {  
    state.estado = action.estado
    if (action.estado === "exito") {
        if(!state.data){
            state.data={};
        }
        action.data.map((obj,key)=>{
            state.data[obj.key] = obj;
        })
    }
}

