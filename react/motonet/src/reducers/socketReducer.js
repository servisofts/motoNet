const initialState = {
    estado: 'Desconectado',
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component === "socket") {
        return {
            ...state,
            ...action
        }
    }
    return state
} 