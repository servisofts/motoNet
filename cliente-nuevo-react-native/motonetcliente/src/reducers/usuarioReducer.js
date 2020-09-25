const INITIAL_STATE = {
    loading: false,
    error: null,
    data: {
        results: []
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'traer_usuarios':
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case 'LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        default: return state;
    }
}  