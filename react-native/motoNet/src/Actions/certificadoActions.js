export const identificadorKey = (key) => async (dispatch) => {
    var obj = {
        component: "certificado",
        key,
        type: "",
        estado: "cargando"
    }
    dispatch({
        ...obj,
    })
}