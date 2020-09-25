export const getAllOpen = (socket) => async (dispatch) => {

    const _obj = {
        component: "location",
        type: "getAllOpen",
        estado: "cargando"
    }

    if (!socket.isOpen) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(_obj);
    dispatch({
        ..._obj,
        estado: "cargando"
    })

}
export const getAllClose = (socket) => async (dispatch) => {

    const _obj = {
        component: "location",
        type: "getAllClose",
        estado: "cargando"
    }


    if (!socket.isOpen) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }

    socket.send(_obj);
    dispatch({
        ..._obj,
        estado: "cargando"
    })
}
export const repuestaUbicacion = (repuesta) => async (dispatch) => {

    dispatch({
        component: "locationGoogle",
        type: "actualizar",
        repuesta
    })

}