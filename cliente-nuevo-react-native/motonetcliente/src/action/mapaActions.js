export const setVertice = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:{...obj},
        type: "setVertice",
    }

    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
    dispatch({
        ..._obj,
        estado: "cargando"
    })

}
export const deleteVertice = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:{...obj},
        type: "deleteVertice",
    }

    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
    dispatch({
        ..._obj,
        estado: "cargando"
    })

}
export const getVertices = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:{...obj},
        type: "getVertices",
        estado: "cargando"
    }
    dispatch({..._obj})
    if (!socket) {
        obj.estado="";
        dispatch({..._obj})
        return;
    }
    socket.send(JSON.stringify(_obj));
}
export const conectarVertices = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:obj,
        type: "conectarVertice",
    }
    dispatch({
        ..._obj,
        estado: "cargandoArista"
    })

    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
  

}

export const getAristas = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:{...obj},
        type: "getAristas",
    }
    dispatch({
        ..._obj,
        estado: "cargandoArista"
    })

    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
  

}
export const deleteArista = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "mapa",
        data:{...obj},
        type: "deleteArista",
    }
    dispatch({
        ..._obj,
        estado: "cargandoArista"
    })

    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
  

}