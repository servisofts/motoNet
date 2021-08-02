
const getCabeceras = () => {
    if (!sessionStorage.getItem("cabeceras"), false) {
        return false;
    }
    return JSON.parse(sessionStorage.getItem("cabeceras"), false);
}
const initialState = {
    estado: "",
    data: {},
    dataCabecera: {},
    cabeceras: getCabeceras()
}

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (action.component == "cabeceraDato") {
        switch (action.type) {
            case "getDatoCabecera":
                getDatoCabecera(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
        }

        state = { ...state };
    }
    return state;
}

const getDatoCabecera = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera] = action.data;

        if (!state.dataCabecera[action.cabecera]) {
            state.dataCabecera[action.cabecera] = {};
        }
        action.data.map((obj) => {
            state.dataCabecera[action.cabecera][obj.dato.descripcion] = obj;
        });

    }
}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.cabeceras) {
            state.cabeceras = {};
        }
        action.data.map((obj, key) => {
            state.cabeceras[obj.key] = obj;
        })
        sessionStorage.setItem("cabeceras", JSON.stringify(state.cabeceras));
    }
}

