import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const ejecutar = (data, props) => {
    var resp = {
        estado: false,
        component: "ERROR DESCONOCIDO",
    }
    var dataResp = props.state.rolReducer.data;
    if (!dataResp) {
        if (!props.state.socketReducer.socket) {
            resp = {
                estado: false,
                component: <CircularProgress color="#fff" style={{ display: "block" }} />,
            }
            return resp;
        }
        if (props.state.rolReducer.estado == "cargando") {
            resp = {
                estado: false,
                component: <CircularProgress color="#fff" style={{ display: "block" }} />,
            }
            return resp;
        }
        if (props.state.rolReducer.estado == "error") {
            resp = {
                estado: false,
                component: <div>{props.state.rolReducer.error}</div>,
            }
            return resp;
        }

        var objSend = {
            component: "rol",
            type: "getAll",
            estado: "cargando"
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
        data: dataResp,
    }
    return resp;
}
