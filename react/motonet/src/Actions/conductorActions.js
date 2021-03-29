
export const cambiarEstadoDatoConductor = (key_usuario, key_dato, estado) => async (dispatch) => {
    dispatch(
        {
            component:"usuario",
            cabecera: "registro_conductor",
            type: "cambiarEstadoDatoConductor",
            key_conductor: key_usuario,
            key_dato: key_dato,
            estado: estado
        }
    )
}

export const cambiarEstadoDatoConductorAll = (key_usuario, estado) => async (dispatch) => {
    dispatch(
        {
            component:"usuario",
            cabecera: "registro_conductor",
            type: "cambiarEstadoDatoConductorAll",
            key_conductor: key_usuario,
            estado: estado
        }
    )
}