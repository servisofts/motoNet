import Model from "../Model";

export type Rule = {
    resetTo: string,
    when: () => Promise<boolean>,
    black_list?: string[] // Block routes includes in black_list if when is true
    withe_list?: string[] // Block all routes not includes in withe_list if when is true

}
const rules: Rule[] = [
    {
        resetTo: "/",
        when: async () => { //existe usuario logueado
            return !!Model.usuario.Action.getUsuarioLog();
        },
        black_list: [
            "/login"
        ],
    },
    {
        resetTo: "/login",
        when: async () => { //No existe usuario logueado
            return !Model.usuario.Action.getUsuarioLog()
        },
        withe_list: [
            "/login",
            "/registro",
        ],
    },
    {
        resetTo: "/",
        when: async () => { //Si no hay un viaje en curso;
            var viaje = Model.viaje.Action.getActivo();
            if (!viaje) return true;
            if (!viaje.key) return true;
            return false;
        },
        black_list: [
            "/viaje"
        ],
    },
    {
        resetTo: "/viaje",
        when: async () => { //Si hay un viaje en curso;
            var viaje = Model.viaje.Action.getActivo();
            if (!viaje) return false;
            if (!viaje.key) return false;
            return true;
        },
        withe_list: [

        ],
    },
]
export default rules;