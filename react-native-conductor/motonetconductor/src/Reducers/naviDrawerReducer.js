const initialState = {
    openBar: false
}
export default (state, action) => {
    if (!state) return initialState;
    if (action.component === "naviDrawer") {
        return {
            ...state,
            ...action
        }
    }
    return state
} 