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
        element:element,
    })

}
export const cerrarPopupNotificacion= () => async (dispatch) =>{
    dispatch({

        component:"popupNotificacion", 
        estadoNotificacion:false,
        type:"cerrarPopupNotificacion",
        barra:true
    })

}
export const abrirPopupNotificacion = (element) => async (dispatch) =>{
    dispatch({
        component:"popupNotificacion", 
        estadoNotificacion:true,
        type:"abrirPopupNotificacion",
        element:element,
    })

}