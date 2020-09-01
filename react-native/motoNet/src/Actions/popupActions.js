export const cerrarPopup = () => async (dispatch) =>{
    dispatch({

        component:"popup", 
        estado:false,
        type:"cerrarPopup",
        barra:true
    })

}
export const abrirPopup = (element) => async (dispatch) =>{
    dispatch({
        component:"popup", 
        estado:true,
        type:"abrirPopup",
        element:element
    })

}