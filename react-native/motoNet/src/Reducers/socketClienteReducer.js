const initialState = {
    estado: "Not Found",
    isOpen: false,
    open:(props)=>{
        return false;
    },
    close:()=>{
        return false;
    },
    history:[]
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "socketCliente") {
        state.history.push(action);
        switch (action.type) {
            case "open":
                open(state, action);
                break;
            case "initSocket":
                initSocket(state, action);
                break;
            case "error":
                error(state, action);
                break;
            case "close":
                close(state, action);
                break;
        }
        state = {...state};
    }
    return state;
}

const open = (state, action) => {
    state.estado = "Conectado."
    state.isOpen = true;
    state.send = action.send;
}

const initSocket = (state, action) => {
    state.estado = "Desconectado."
    state.open = action.open;
    state.close = action.close;
    state.isOpen = false;
}
const error = (state, action) => {
    state.estado = action.error;
}
const close = (state, action) => {
    state.estado = action.error;
    state.isOpen = false;
}