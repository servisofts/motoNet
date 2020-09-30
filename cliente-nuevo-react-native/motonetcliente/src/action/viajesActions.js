export const actualizarUbicacion = (dato) => async (dispatch) => {
    dispatch({
        component: "viaje",
        type: "actualizarUbicacion",
        data: dato
    })

}
export const actualizarViaje = (dato) => async (dispatch) => {
    dispatch({
        component: "viaje",
        type: "actualizarViaje",
        data: dato
    })

}
