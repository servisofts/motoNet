const initialState = {
    componente: "inicio"
}
export default (state, action) => {
    if (!state) return initialState;
    if (action.component === "modeloComponente") {
        state.componente = action.componente
        return {
            ...state,
        }
    }
    return state
} 