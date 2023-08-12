import { SDate } from "servisofts-component";
import Model from "../Model";
import SBLocation from "servisofts-background-location";

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
            "/test",
            "/welcome",
            "/login",
            "/login/**",
            "/registro/**",
            "/sms"
        ],
    },
    // {
    //     resetTo: "/welcome",
    //     when: async () => { //No existe usuario logueado
    //         return !Model.usuario.Action.getUsuarioLog()
    //     },
    //     withe_list: [
    //         "/test",
    //         "/welcome",
    //         "/login",
    //         "/login/**",
    //         "/registro/**",
    //         "/sms"
    //     ],
    // },
    {
        resetTo: "/datos",
        when: async () => { //Si el usuario_app tiene conflicto
            if (!Model.usuario.Action.getUsuarioLog()) {
                return false;
            }
            // var usuario = Model.usuario.Action.getByKey(Model.usuario.Action.getKey(), {}, "");
            // if (!usuario.enable) return true;
            return false;
        },
        withe_list: [

        ],

    },
    {
        resetTo: "/trabajo",
        when: async () => { //Si hay un trabajo en curso;
            // return false;
            if (!Model.usuario.Action.getUsuarioLog()) {
                return false;
            }
            if (!JSON.parse(Model.usuario.Action.getUsuarioLog()?.enable ?? false)) {
                return false;
            }
            var activo: any = Model.conductor_horario.Action.getEnCurso();
            if (!activo) return false;
            if (!activo.key) return false;
            return true;
        },
        withe_list: [
            "/test",
            "/ganancia/**",
            "/profile",
            "/soporte/**",
            "/condiciones",
            // "/documento/**",
            "/pedido",
            "/pedido/**",
            "/pedido2",
            "/notificaciones/**",
            "/notification/**",
            "/chat/**",
            "/driver_cuenta/**",
        ],

    },
    {
        resetTo: "/pedido",
        when: async () => { //Si hay un pedido en curso;
            if (!Model.usuario.Action.getUsuarioLog()) {
                return false;
            }
            var activo = Model.pedido.Action.getActivo();
            if (!activo) return false;
            if (!activo.key) return false;
            if (activo.state == "entregado") return false;

            console.log(activo)
            SBLocation.isActive().then(e => {
                // console.log(e)
            }).catch(e => {
                SBLocation.start({
                    nombre: "Tapeke",
                    label: "Accediendo a tu ubicacion.",
                    minTime: 1000,
                    minDistance: 1
                });
            })
            return true;
        },
        withe_list: [
            "/test",
            "/ganancia/**",
            "/profile",
            "/soporte",
            "/pedido/**",
            "/pedido2",
            // "/trabajo/**",
            "/chat/**",
            "/notification/**",
            "/notificaciones/**",
            "/chat/profile",
            "/driver_cuenta/**",
        ],

    },
    {
        resetTo: "/esperando_aprobacion",
        when: async () => { //Si hay un pedido en curso;
            if (!Model.usuario.Action.getUsuarioLog()) return false;
            if (!JSON.parse(Model.usuario.Action.getUsuarioLog()?.enable ?? false) || Model.usuario.Action.getUsuarioLog()?.enable == "false") {
                return true;
            }
            return false;
        },
        withe_list: [
            "/test",
            "/ganancia",
            "/profile",
            "/profile/**",
            "/soporte/**",
            "/documento/**",
            "/notification/**",
            "/chat/**",
            "/condiciones",
            "/driver_cuenta/**",
        ],

    },
]
export default rules;