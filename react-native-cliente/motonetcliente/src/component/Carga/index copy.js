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
    if (props.state.usuarioReducer.cargaLoaded) {
        props.state.usuarioReducer.cargaLoaded = false;
        setValidaciones({
            tiempoEspera: false,
            socket: false,
            usuario: false,
            viaje: false
        });
    }
    //Compruebo si existe el navigation
    if (!props.navigation) {
        return <Text>No existe navegacion</Text>
    }
    // console.log("CARGA - DEBUG -->" + "32");
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
        AsyncStorage.getItem("clinica_usuarioLog").then((value) => {
            // console.log(value)
            if (!value) {
                validaciones.usuario = "no_existe";
                setValidaciones({ ...validaciones });
                return <View />

            }

            props.state.usuarioReducer.usuarioLog = JSON.parse(value)
            validaciones.usuario = "existe";
            setValidaciones({ ...validaciones });
            return <View />


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
        props.state.usuarioReducer.estado = "";
        props.navigation.replace("LoginPage");
        return <View />
    }


    if (validaciones.usuario == "existe") {
        if (!props.state.usuarioReducer.usuarioDatos) {
            if (props.state.usuarioReducer.estado == "cargando"
                && (new Date().getTime() - props.state.usuarioReducer.lastSend.getTime()) < 3000
            ) {
                const EsperarUsuario = async () => {
                    await delay(2000);
                    validaciones.usuario = "existe";
                    setValidaciones({ ...validaciones });
                    return <View />;
                };
                EsperarUsuario();

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


    //console.log(validaciones.viaje)
    if (!validaciones.viaje) {
        if (!props.state.emergenciaReducer.estadoConsultado) {
            if (props.state.emergenciaReducer.estado == "cargando") {
                return <View />
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "emergencia",
                type: "getViajeByKeyUsuario",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        AsyncStorage.getItem("emergencia_viaje").then((value) => {
            if (!value) {
                validaciones.viaje = "no_existe";
                setValidaciones({ ...validaciones });
                return <View/>;
            }
            if (props.state.emergenciaReducer.data.estado == 0) {
                validaciones.viaje = "no_existe";
                setValidaciones({ ...validaciones });
                return <View/>;
            }
            props.state.emergenciaReducer.data = JSON.parse(value)
            validaciones.viaje = "existe";
            setValidaciones({ ...validaciones });
            return <View/>;

        });
        validaciones.viaje = "cargando";
        setValidaciones({ ...validaciones });
        return <View />
    }

    if (validaciones.viaje == "cargando") {
        return <View />
    }

    if (validaciones.viaje == "no_existe") {
        props.navigation.replace("ServicioPage");
        return <View />
    }

    if (validaciones.viaje == "existe") {
        if (props.state.emergenciaReducer.estado != "cargando") {
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "emergencia",
                type: "getViaje",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_viaje: props.state.emergenciaReducer.data.key,
                estado: "cargando"
            }, true);
            validaciones.viaje = true;
            setValidaciones({ ...validaciones });
        }
        // console.log(props.state.emergenciaReducer.data.key_conductor)
        if (!props.state.emergenciaReducer.data.key_conductor || props.state.emergenciaReducer.data.key_conductor.length <= 0) {
            // console.log("entrooooooo")
            props.navigation.replace("EmergenciaEsperaPage");
            return <View />
        } else {
            // console.log("entro viaje")
            props.navigation.replace("EmergenciaViajePage");
            return <View />
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