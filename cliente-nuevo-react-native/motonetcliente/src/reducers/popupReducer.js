const initialState = {
    estado: false,
    estadoNotificacion: false,
    onChange: false
}
export default (state = initialState, action) => {
    switch (action.component) {
        case "popup":
            return {
                ...state,
                ...action
            }
            break;
        case "popupNotificacion":
            return {
                ...state,
                ...action
            }

        default:
            break;
    }


    if (action.component == "popup") {

    }
    return state
} 