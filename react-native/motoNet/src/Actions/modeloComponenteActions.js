export const cambiarComponente = (componente) => async (dispatch) => {
    dispatch({

        component: "modeloComponente",
        type: "modelo",
        componente
    })

}