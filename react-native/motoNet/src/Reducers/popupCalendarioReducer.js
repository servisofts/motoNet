const initialState = {
    estado : false,
    onChange:false
}


export default (state = initialState, action) => {

    
    if (action.component === "popupCalendario") {
        return {
            ...state,
            ...action
        }
    }

    return state
} 