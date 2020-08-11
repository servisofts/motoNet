const initialState = {
    session: false,
    years: []
}


export default (state, action) => {
    if (!state) return initialState;
    if (action.component === "calendario") {
        var newState = { ...state }
        if (action.type === 'getAll') {
            if (action.estado === 'exito') {


                action.data.map((obj) => {
                    if (!newState.years[obj.year]) {
                        newState.years[obj.year] = {
                            months: []
                        }
                    }
                    if (!newState.years[obj.year].months[obj.month]) {
                        newState.years[obj.year].months[obj.month] = {
                            days: []
                        }
                    }
                    if (obj.day < 10) {
                        obj.day = "0" + obj.day;
                    }
                    if (!newState.years[obj.year].months[obj.month].days[obj.day]) {
                        newState.years[obj.year].months[obj.month].days[obj.day] = obj.array_to_json;
                    }
                });

                return {
                    ...newState,
                    estado: "exito",
                }
            }
            if (action.estado === 'error') {
                return {
                    ...state,
                    estado: "error",
                }
            }
        }
    }

    return {
        ...state,
        ...action,
    }
} 