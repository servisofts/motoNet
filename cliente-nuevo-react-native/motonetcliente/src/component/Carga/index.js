import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json/index.json'
const delay = ms => new Promise(res => setTimeout(res, ms));
var cabecera = "registro_cliente";

const Carga = (props) => {
    const [validaciones, setValidaciones] = React.useState({
        tiempoEspera: false,
        socket: false,
        usuario: false,
        viaje: false
    });
    const [paginaDestino, setPaginaDestino] = React.useState(false);

    //Compruebo si existe ek navigation
    if (!props.navigation) {
        return <Text>No existe navegacion</Text>
    }
    if (!validaciones.tiempoEspera) {
        const EsperarAwait = async () => {
            await delay(1000);
            validaciones.tiempoEspera = "exito";
            setValidaciones({ ...validaciones });
            return <View />;
        };
        validaciones.tiempoEspera = true;
        setValidaciones({ ...validaciones });
        EsperarAwait();
        return <View />
    }
    if (validaciones.tiempoEspera != "exito") {
        return <View />
    }
    if (!validaciones.socket) {
        if (props.state.socketClienteReducer.sessiones[AppParams.socket.name].isOpen) {
            validaciones.socket = true;
            setValidaciones({ ...validaciones });
            return <View />;
        }
    }
    if (!validaciones.usuario) {
        AsyncStorage.getItem("motonet_usuarioLog").then((value) => {
            if (!value) {
                validaciones.usuario = "no_existe";
                setValidaciones({ ...validaciones });
                return;
            }
            props.state.usuarioReducer.usuarioLog = JSON.parse(value)
            validaciones.usuario = "existe";
            setValidaciones({ ...validaciones });
            return;

        });
        validaciones.usuario = "cargando";
        setValidaciones({ ...validaciones });
        return <View />
    }
    if (validaciones.usuario == "cargando") {
        return <View />
    }

    if (validaciones.usuario == "no_existe") {
        if (!props.state.cabeceraDatoReducer.data[cabecera]) {
            if (props.state.cabeceraDatoReducer.estado == "cargando") {
                return <View />
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "cabeceraDato",
                type: "getDatoCabecera",
                estado: "cargando",
                cabecera: cabecera
            });
            return <View />
        }
        props.navigation.replace("LoginPage");
    }

    if (validaciones.usuario == "existe") {
        if (!props.state.usuarioReducer.usuarioDatos) {
            if (props.state.usuarioReducer.estado == "cargando") {
                return <View />
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "getById",
                key: props.state.usuarioReducer.usuarioLog.key,
                cabecera: cabecera,
                estado: "cargando"
            }, true);
            return <View />
        }
    }

    if (!validaciones.viaje) {
        AsyncStorage.getItem("motonet_viaje").then((value) => {
            if (!value) {
                validaciones.viaje = "no_existe";
                setValidaciones({ ...validaciones });
                return;
            }
            props.state.viajesReducer.viaje = JSON.parse(value)
            validaciones.viaje = "existe";
            setValidaciones({ ...validaciones });
            return;

        });
        validaciones.viaje = "cargando";
        setValidaciones({ ...validaciones });
        return <View />
    }
    if (validaciones.viaje == "cargando") {
        return <View />
    }

    if (validaciones.viaje == "no_existe") {
        props.navigation.replace("InicioPage");
    }

    if (validaciones.viaje == "existe") {
        if (props.state.viajesReducer.estado != "cargando") {
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "viaje",
                type: "getViaje",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_viaje: props.state.viajesReducer.viaje.key,
                estado: "cargando"
            }, true);
        }
        if (props.state.viajesReducer.viaje.key_conductor.length > 0) {
            props.navigation.replace("ViajeInicioPage");
        } else {
            props.navigation.replace("ViajeEsperaPage");
        }
    }
    return (
        <View />
    );
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);