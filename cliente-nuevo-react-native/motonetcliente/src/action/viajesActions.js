export const actualizarUbicacion = (dato) => async (dispatch) => {
    dispatch({
        component: "viaje",
        type: "actualizarViaje",
        data: dato
    })

}
export const addViaje = (element) => async (dispatch) => {
    dispatch({
        component: "popup",
        estado: true,
        type: "abrirPopup",
        element: element,
    })

}
