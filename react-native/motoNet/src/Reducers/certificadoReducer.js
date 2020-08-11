const initialState = {
    session: false,
    key_certificado: false,
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "certificado") {
        state.key_certificado = action.key
        return {
            ...state,
            estado: "exito"
        }

    }

    return state;
} 