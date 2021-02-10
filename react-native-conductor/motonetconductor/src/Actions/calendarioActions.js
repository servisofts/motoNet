export const getAllMes = (socket, obj) => async (dispatch) => {

    const _obj = {
        component: "calendario",
        type: "getAll",
        exr:obj
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
