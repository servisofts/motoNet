const initialState = {

}
export default (state, action) => {
    if(!state)state = initialState
    if (action.component === "mapa") {
        var newState = { ...state }

        switch (action.type) {
            case "setMapa":
                newState = setMapa(newState, action);
                break;
            case "getVertices":
                newState = getVertices(newState, action);
                break;
            case "setVertice":
                newState = setVertice(newState, action);
                break;
            case "deleteVertice":
                newState = deleteVertice(newState, action);
                break;
            case "conectarVertice":
                newState = conectarVertice(newState, action);
                break;
            case "getAristas":
                newState = getAristas(newState, action);
                break;
            case "deleteArista":
                newState = deleteArista(newState, action);
                break;
            default : break;
        }
        return {
            ...newState
        }
    }
    return state
}


const setMapa = (newState, action) => {
    newState = { ...newState, ...action }
    return newState;
}
const getVertices = (newState, action) => {
    if (action.estado === "exito") {
        newState.vertices = action.data;
    }
    newState.estado = action.estado;
    return newState;
}
const setVertice = (newState, action) => {
    if (action.estado === "exito") {
        action.data["aristas"] = [];
        newState.vertices.push(action.data);
    }
    return newState;
}
const deleteVertice = (newState, action) => {
    if (action.estado === "exito") {
        newState.vertices.map((obj, key) => {
            if (obj.key === action.data.key) {
                newState.vertices.splice(key, 1);
            }
            return true;
        });
        newState.estado = action.estado;
    }
    return newState;
}

const getAristas = (newState, action) => {
    newState.type = action.type;
    if (action.estado === "exito") {
        newState.aristas = action.data;
    }
    newState.estado = action.estado;
    return newState;
}
const deleteArista = (newState, action) => {
    newState.type = action.type;
    if (action.estado === "exito") {
        newState.aristas.map((obj, key) => {
            if (obj.key === action.data.key) {
                newState.aristas.splice(key, 1);
            }
            return true;
        });
        newState.vertices.map((obj, key) => {
            if (obj.key === action.data.key_vertice_from) {
                obj.aristas.map((obj2, key2) => {
                    if (obj2.key === action.data.key) {
                        newState.vertices[key].aristas.splice(key2, 1);
                    }
                    return true;
                });
            }
            return true;
        });
    }
    newState.estado = action.estado;
    return newState;
}
const conectarVertice = (newState, action) => {
    newState.type = action.type;
    if (action.estado === "exito") {
        action.data.map((nArista, keyNArista) => {
            newState.vertices.map((obj, key) => {
                if (obj.key === action.data[keyNArista].key_vertice_from) {
                    var inserto = false;
                    if(!newState.vertices[key].aristas){
                        newState.vertices[key].aristas=[];
                    }
                    obj.aristas.map((obj2, key2) => {
                        if (obj2.key === action.data[keyNArista].key) {
                            newState.vertices[key].aristas[key2] = action.data[keyNArista];
                            inserto = true;
                        }
                        return true;
                    });
                    if (!inserto) {
                        newState.vertices[key].aristas.push(action.data[keyNArista]);
                    }
                }
                return true;
            });
            return true;
        });
    }
    newState.estado = action.estado;
    return newState;
}