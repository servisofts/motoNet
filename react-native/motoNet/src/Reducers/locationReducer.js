const initialState = {
    isOpen: false,
    history: [],
    estado: false
}
export default (state, action) => {
    if (!state) state = initialState
    if (action.component === "location") {
        var newState = { ...state }
        //console.log(action)
        switch (action.type) {
            case "init":
                newState = init(newState, action);
                break;
            case "open":
                newState = open(newState, action);
                break;
            case "onLocationChange":
                newState = onLocationChange(newState, action);
                break;
            case "close":
                newState = close(newState, action);
                break;
            case "send":
                newState = send(newState, action);
                break;
            default: break;
        }
        return {
            ...newState
        }
    }
    return state
}


const init = (newState, action) => {
    newState.isOpen = false;
    newState.estado = "close";
    newState.open = action.open;
    newState.close = action.close;
    return newState;
}
const open = (newState, action) => {
    newState.isOpen = true;
    newState.estado = "exito";
    return newState;
}
const onLocationChange = (newState, action) => {
    newState.isOpen = true;
    newState.estado = "exito";
    newState.data = action.data;
    newState.history.push(action.data);
    return newState;
}

const close = (newState, action) => {
    newState.isOpen = false;
    newState.estado = "close";
    return newState;
}

const send = (newState, action) => {
    console.log("entro send location");
    return newState;
}