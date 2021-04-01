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
    if (props.state.tipoViajeReducer.estado == "cargando") {
        resp = {
            estado: false,
            component: <CircularProgress color="#fff" style={{ display: "block" }} />,
        }
        return resp;
    }
    if (props.state.tipoViajeReducer.estado == "error") {
        resp = {
            estado: false,
            component: <div>{props.state.tipoViajeReducer.error}</div>,
        }
        return resp;
    }
    var dataResp = props.state.tipoViajeReducer.tipoViaje[data.key_tipo_viaje];
    if (!dataResp) {
        var objSend = {
            component: "tipoViaje",
            type: "getById",
            estado: "cargando",
            key_usuario: data.key_usuario,
            key_tipo_viaje: data.key_tipo_viaje,
            data: ""
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
