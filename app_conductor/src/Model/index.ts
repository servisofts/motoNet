import { SModel } from "servisofts-model";

import Usuario from "servisofts-rn-usuario";
import motonet from "./motonet";
const Model = {
    ...Usuario.Model,
    ...motonet

}
Usuario.init({
    cabecera: "registro_conductor",
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
export default {
    ...Model,
    ...SModel.declare(Model)
}