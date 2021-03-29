import React from 'react'
import { connect } from 'react-redux';
const UsuarioCabeceras = (props) => {
    if (!props.state.cabeceraDatosReducer.cabeceras) {
        if (!props.state.socketReducer.socket) {
            return "Buscando socket.";
        }
        if (props.state.cabeceraDatosReducer.estado == "cargando") {
            return "Cargando"
        }
        if (props.state.cabeceraDatosReducer.estado == "error") {
            return "props.state.cabeceraDatosReducer.error"
        }
        var objSend = {
            component: "cabeceraDato",
            type: "getAll",
            estado: "cargando"
        };
        props.state.socketReducer.send(objSend);
        return "No hay cabeceras"
    }
    var cabeceras = props.state.cabeceraDatosReducer.cabeceras;
    return "cabeceras cargadas"

}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(UsuarioCabeceras);