export const actualizarUbicacion = (dato) => async (dispatch) => {
    dispatch({
        component: "viaje",
        type: "actualizarUbicacion",
        data: dato,
        estado:"exito"
    })

}
export const actualizarViaje = (dato) => async (dispatch) => {
    dispatch({
        component: "viaje",
        type: "actualizarViaje",
        data: dato,
        estado:"exito"
    })

}
