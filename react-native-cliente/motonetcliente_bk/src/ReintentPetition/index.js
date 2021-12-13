var _store;
const delay = ms => new Promise(res => setTimeout(res, ms));

const PeticionesEnCurso = {};
const EsperarYComprobar = async (key) => {
    await delay(4000);
    var peticionRetrasada = PeticionesEnCurso[key];
    if (peticionRetrasada) {
        console.log("LA PETICION SE RETRASO ")
        _store.dispatch({
            component: peticionRetrasada.component,
            type: peticionRetrasada.type,
            estado: "",
        })
        if (peticionRetrasada.intentos > 3) {
            _store.dispatch({
                component: "socketCliente",
                type: "close",
                nombre: peticionRetrasada.socketName,
                error: "Se perdio la coneccion."
            })
        }
        peticionRetrasada.intentos += 1;

    }
}

export const initStore = (store) => {
    _store = store;
}
export const setPetition = (obj) => {
    var component = obj.component;
    var type = obj.type;
    var estado = obj.estado;
    if (estado == "cargando") {
        var key = component + type;
        obj.intentos = 0;
        PeticionesEnCurso[key] = obj;
        EsperarYComprobar(key);
        console.log("----TEST-PETITION-ENVIANDO-----");
    }

}
export const recivePetition = (obj) => {
    var component = obj.component;
    var type = obj.type;
    var estado = obj.estado;
    if (estado == "exito") {
        var key = component + type;
        delete PeticionesEnCurso[key];
        console.log("----TEST-PETITION-RECIVER-----");
    }

}
