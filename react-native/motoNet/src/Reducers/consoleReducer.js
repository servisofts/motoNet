const initialState = {
    session: false,
    data: []
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "console") {
        if (action.type == "mensaje") {
            state.data.push(action.data);
            return {
                ...state
            }
        }
        if (action.type == "open") {
            state.send = action.client;
            return {
                ...state
            }
        }
         if (action.type == "socketClient") {
            state.socketClient = action.socketClient;
            return {
                ...state
            }
        }
    }

    return state;
} 