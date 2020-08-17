
const initialState = {
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "servicio") {


        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "registrar":
                registarServicio(state, action);
                break;
            case "getLog":
                getLog(state, action);
                break;
            case "getServicioHabilitado":
                getServicioHabilitado(state, action);
                break;
            case "switchHabilitado":
                switchHabilitado(state, action);
                break;
                
        }
        state = { ...state };
    }

    return state;
}

const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado == "exito") {
        if (!state.data) {
            state.data = {};
        }
        action.data.map((obj, key) => {
            state.data[obj.key] = action.data[key];
        })
    }
}
const registarServicio = (state, action) => {
    state.estado = action.estado;
    if (action.estado == "exito") {
        if (!state.data) {
            state.data = {};
        }
        state.data[action.data.key] = action.data;
    }
}
const getLog = (state, action) => {
    state.estado = action.estado;
    console.log(action)
    if (action.estado == "exito") {
        if (!state.data) {
            state.data = {};
        }
        if(!state.data[action.key]){
            state.data[action.key]={};
        }
        state.data[action.key].log=action.data;        
    }
}
const getServicioHabilitado = (state, action) => {
    state.estado = action.estado;
    if (action.estado == "exito") {
        if (!state.data) {
            state.data = {};
        }
        state.data[action.key].servicioHabilitado = action.data;   
    }
    
    
}

const switchHabilitado = (state, action) => {
    state.estado = action.estado;
    if (action.estado == "exito") {
        if(action.data == "off"){
            state.data[action.key_servicio].servicioHabilitado.map((obj,key)=>{
                if(obj.key_habilitado == action.key_habilitado){
                    state.data[action.key_servicio].servicioHabilitado.splice(key,1);
                }
            })
        }else if(action.data == "on"){
            state.data[action.key_servicio].servicioHabilitado.push({key_habilitado:action.key_habilitado, key_servicio:action.key_servicio});
        }
        //state.data[action.key].servicioHabilitado = action.data;   
    }
    
    
}