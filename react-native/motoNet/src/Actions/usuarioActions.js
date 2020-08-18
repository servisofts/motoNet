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
