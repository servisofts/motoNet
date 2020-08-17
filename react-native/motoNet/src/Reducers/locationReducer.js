const initialState = {
    isOpen: false,
    isMotos: false,
    history: [],
    estado: false
}
export default (state, action) => {
    if (!state) state = initialState
    if (action.component === "location") {
        var newState = { ...state }
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
            case "onLocationChangeSend":
                newState = onLocationChangeSend(newState, action);
                break;
            case "getAllOpen":
                newState = getAllOpen(newState, action);
                break;
            case "getAllClose":
                newState = getAllClose(newState, action);
                break;
            case "getAllUpdate":
                newState = getAllUpdate(newState, action);
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

const onLocationChangeSend = (newState, action) => {
    console.log("entro send location");
    return newState;
}
const getAllClose = (newState, action) => {
    console.log("entro al cerrar ");
    newState.isMotos = false;
    return newState;
}
const getAllOpen = (newState, action) => {
    console.log("emtrp open");
    newState.isMotos = true;
    if (action.estado == "exito") {
        if (!newState.locations) {
            newState.locations = {};
        }
        action.data.map((obj, key) => {
            newState.locations[obj.key] = action.data[key];
        })
       
    }
    return newState;
}

const getAllUpdate = (newState, action) => {
    
    if (action.estado == "exito") {
        newState.isMotos = true;
        if (!newState.locations) {
            newState.locations = {};
        }
        action.data.map((obj, key) => {
            newState.locations[obj.key] = action.data[key];
        })
    }
    return newState;
}