export const getAllOpen = (socket) => async (dispatch) => {

    const _obj = {
        component: "location",
        type: "getAllOpen",
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
export const getAllClose = (socket) => async (dispatch) => {



    const _obj = {
        component: "location",
        type: "getAllClose",
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