import { SModel } from "servisofts-model";

import Usuario from "servisofts-rn-usuario";
import Chat from 'servisofts-rn-chat'
import Roles_permisos from "servisofts-rn-roles_permisos";
import motonet from "./motonet";
import tapeke from "./tapeke";
const Model = {
    ...Usuario.Model,
    ...Roles_permisos.Model,
    ...Chat.Model,
    ...motonet,
    ...tapeke

}

Usuario.init({
    // cabecera: "conductor",
    cabecera: "usuario_app",
    Columns: {
        "key": { type: "text", pk: true },
        "Nombres": { type: "text", notNull: true, editable: true },
        "Apellidos": { type: "text", notNull: true, editable: true },
        "CI": { type: "text", notNull: true, editable: true },
        "Correo": { type: "text", notNull: true, editable: true },
        "Telefono": { type: "text", notNull: true, editable: true },
        "Password": { type: "text", notNull: true, editable: true },
    },
});
Roles_permisos.init({});
Chat.init({});
export default {
    ...Model,
    ...SModel.declare(Model)
}