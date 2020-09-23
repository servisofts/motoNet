export const registrarUser = (socket,usuario) => async (dispatch) => {
    const _obj = {
        component: "usuario",
        type: "registrar",
        estado:"cargando",
        usuario
    }

    if (!socket) {
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
export const registro = (socket, data) => async (dispatch) => {
    var objSend = {
        component: "usuario",
        type: "registro",
        estado: "cargando",
        cabecera:"registro_conductor",
        data
    }
    if (!socket.isOpen) {
        dispatch({
            ...objSend,
            estado: "error"
        })
        return;
    }
    socket.send(objSend);
    dispatch({
        ...objSend,
    })
}
