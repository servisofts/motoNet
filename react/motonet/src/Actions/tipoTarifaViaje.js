

export const TipoTarifa = (data) => async (dispatch) => {
    dispatch(
        {
            component:"tipoTarifa", //componet nombre tiene que ser igual al reducer
            type:"seleccionarTipoViaje",
            estado:"cargando",
            dataEnviada:data
        }
    )
}