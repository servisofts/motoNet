const initialState = {
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "socketTest") {
        if(action.type == "ping"){
            if(action.estado == "exito"){
                state.time = action.time;
                state.ping = new Date().getTime() - action.time ;
                console.log("PING SERVER : " + state.ping);
                return {...state}
             }
        }
    }
    return state;
} 