const initialState = {
    estado: "Not Found",
    history: [],
    sessiones: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "SSSocket") {
        state = { ...state };
    }
    if (action.component == "socketCliente") {
        state.history.push(action);
        switch (action.type) {
            case "open":
                open(state, action);
                break;
            case "conectando":
                conectando(state, action);
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
        state = { ...state };
    }
    return state;
}

const conectando = (state, action) => {
    state.sessiones[action.data.nombre] = {
        isOpen: false,
        estado: "Conectado.",
        socket:action.socket
    }
}
const open = (state, action) => {
    state.sessiones[action.nombre].isOpen = true;
    state.sessiones[action.nombre].estado = "conectado";
    state.sessiones[action.nombre].send = action.send;
}

const initSocket = (state, action) => {
    state.open = action.open;
}
const error = (state, action) => {
    state.sessiones[action.nombre].estado = action.error;
}
const close = (state, action) => {
    state.sessiones[action.nombre].estado = action.error;
    state.sessiones[action.nombre].isOpen = false;
}