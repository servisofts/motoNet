
export const changeSelectDato = (data) => async (dispatch) => {
    dispatch(
        {
            component:"datosPersonales",
            type:"changeSelectDato",
            dataEnviada:data
        }
    )
}