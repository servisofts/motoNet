const initialState = {
}
export default (state , action) => {
    if (!state) return initialState
    if (action.component === "imagePicker") {
        return {
            ...state,
            ...action
        }
    }
    return state
} 