import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const ejecutar = (data, props) => {
    var resp = {
        estado: false,
        component: "ERROR DESCONOCIDO",
    }
    if (!props.state.socketReducer.socket) {
        resp = {
            estado: false,
            component: <CircularProgress color="#fff" style={{ display: "block" }} />,
        }
        return resp;
    }
    if (props.state.usuarioReducer.estado == "cargando") {
        resp = {
            estado: false,
            component: <CircularProgress color="#fff" style={{ display: "block" }} />,
        }
        return resp;
    }
    if (props.state.usuarioReducer.estado == "error") {
        resp = {
            estado: false,
            component: <div>{props.state.glupReducer.error}</div>,
        }
        return resp;
    }
    var dataResp = props.state.usuarioReducer.dataUsuario[data.key];
    if (!dataResp) {
        var objSend = {
            component: "usuario",
            type: "getById",
            estado: "cargando",
            key: data.key,
            cabecera: data.cabecera,
        };
        props.state.socketReducer.send(objSend);
        resp = {
            estado: false,
            component: <div>enviando</div>,
        }
        return resp;
    }
    resp = {
        estado: true,
        data:dataResp,
    }
    return resp;
}
