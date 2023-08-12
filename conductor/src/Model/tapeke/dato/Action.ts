import { SAction } from "servisofts-model";
import Model from "../..";
export default class Action extends SAction {

    getAllByKeyUsuario(key_usuario) {
        var usuarioRol = Model.usuarioRol.Action.getAllByKeyUsuario(key_usuario);
        var roles = Model.rol.Action.getAll();
        var datos = Model.dato.Action.getAll();
        if (!usuarioRol) return null;
        if (!datos) return null;
        if (!roles) return null;
        var resp = {};
        Object.values(usuarioRol).map((obj: any) => {
            if (obj.estado == 0) return;
            if (!roles[obj.key_rol]) return;
            if (!roles[obj.key_rol].estado) return;
            var dato_rol = Model.rol_dato.Action.getAllBy({
                key_rol: obj.key_rol
            });
            if (!dato_rol) return null;
            Object.values(dato_rol).map((dr: any) => {
                var dato = datos[dr.key_dato]
                if (!dato) return;
                resp[dato.key] = dato;

            })
        });
        return resp;
    }
    getAllByKeyRol(keyRol) {
        var datos = Model.dato.Action.getAll();
        if (!datos) return null;
        var resp = {};
        var dato_rol = Model.rol_dato.Action.getAllBy({
            key_rol: keyRol
        });
        if (!dato_rol) return null;
        Object.values(dato_rol).map((dr: any) => {
            var dato = datos[dr.key_dato]
            if (!dato) return;
            resp[dato.key] = dato;

        })
        return resp;
    }

    getTiposDato() {
        return [
            { key: "", content: "--" },
            { key: "text", content: "Texto" },
            { key: "number", content: "Numero" },
            { key: "money", content: "Moneda" },
            { key: "date", content: "Fecha" },
            // { key: "image", content: "Imagen" },
            { key: "file", content: "Archivo" },
            { key: "files", content: "Multiples Archivo" },
            { key: "checkBox", content: "ON/OFF" },
            { key: "link", content: "Link" },
        ]
    }
}