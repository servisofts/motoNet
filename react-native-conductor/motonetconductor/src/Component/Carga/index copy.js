import React from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json/index.json'
const delay = ms => new Promise(res => setTimeout(res, ms));

var cabecera = "registro_conductor";
const Carga = (props) => {
    const [validaciones, setValidaciones] = React.useState({
        tiempoEspera: false,
        socket: false,
        usuario: false,
        viaje: false,
        backlocation: false,
        cantReintent: 0,
    });
    const [paginaDestino, setPaginaDestino] = React.useState(false);
    const Reintentado = async () => {
        await delay(1000);
        validaciones.cantReintent += 1;
        console.log("reintentando")
        setValidaciones({ ...validaciones });
        return <View />;
    };

    // Reintentado();
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
        return <View />;
    }


    if (!validaciones.usuario) {
        AsyncStorage.getItem(AppParams.storage.usuarioLog).then((value) => {
            if (!value) {
                validaciones.usuario = "no_existe";
                setValidaciones({ ...validaciones });
                return;
            }
            if (value.length <= 0) {
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
        props.state.usuarioReducer.estado = "";
        return <View />
    }

    if (!props.state.usuarioReducer.usuarioDatos) {
        if (validaciones.usuario == "existe") {

            if (props.state.usuarioReducer.estado == "cargando") {
                return <View />
            }
            props.state.usuarioReducer.estado = "";
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "getById",
                key: props.state.usuarioReducer.usuarioLog.key,
                cabecera: cabecera,
                estado: "cargando"
            }, true);
            props.state.ViajeReducer.estado = "";
            const EsperarUsuario = async () => {
                await delay(2000);
                validaciones.usuario = "existe";
                setValidaciones({ ...validaciones });
                return <View />;
            };
            EsperarUsuario();
            return <View />
        }
    }

    if (!validaciones.backlocation) {
        AsyncStorage.getItem(AppParams.storage.isBackgroundLocation).then((value) => {
            if (!value) {
                validaciones.backlocation = "no_existe";
                setValidaciones({ ...validaciones });
                return;
            }
            // props.state.ViajeReducer.data = JSON.parse(value)
            validaciones.backlocation = "existe";
            setValidaciones({ ...validaciones });
            return;

        });
        validaciones.backlocation = "cargando";
        setValidaciones({ ...validaciones });
        return <View />
    }

    if (validaciones.backlocation == "cargando") {
        return <View />
    }
    if (validaciones.backlocation == "existe") {
        props.state.backgroundLocationReducer.close();
        props.state.backgroundLocationReducer.open();
        validaciones.backlocation = "vacio";
    }
    if (!validaciones.viaje) {

        if (!props.state.ViajeReducer.estadoConsultado) {
            if (props.state.ViajeReducer.estado == "cargando") {
                return <View />
            }
            props.state.ViajeReducer.estado = "";
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "emergencia",
                type: "getViajeByKeyUsuario",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            const EsperarViaje= async () => {
                await delay(2000);
                validaciones.viaje = false;
                setValidaciones({ ...validaciones });
                return <View />;
            };
            EsperarViaje();
            return <View />
        }

        AsyncStorage.getItem("clinica_viaje").then((value) => {
            if (!value) {
                validaciones.viaje = "no_existe";
                setValidaciones({ ...validaciones });
                return;
            }
            props.state.ViajeReducer.data = JSON.parse(value)
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
        //CUANDO YA TENEMOS USUARIO DATOS VALIDAMOS LOS ESTADOS DE LOS DATOS
        if (!props.state.usuarioReducer.usuarioDatos) {

            return <View />
        }
        if (validaciones.usuario == "existe") {

            var estados = false
            Object.keys(props.state.usuarioReducer.usuarioDatos).map((key) => {
                var obj = props.state.usuarioReducer.usuarioDatos[key]
                if (key === "Foto perfil") {
                    return <View />
                }
                if (key === "Password") {
                    return <View />
                }
                if (obj.estado === 0) {
                    estados = true
                    return <View />
                }
            })
            if (estados) {
                props.state.usuarioReducer.estado = ""
                props.navigation.replace("EsperandoConfirmacionPage");
                return <View />
            }
        }
        props.navigation.replace("InicioPage");
        setValidaciones({
            tiempoEspera: false,
            socket: false,
            usuario: false,
            viaje: false,
            backlocation: false,
            cantReintent: 0,
        })
    }

    if (validaciones.viaje == "existe") {
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "emergencia",
            type: "getViaje",
            estado: "cargando",
            key_viaje: props.state.ViajeReducer.data.key
        });

        if (!props.state.backgroundLocationReducer.isOpen) {
            props.state.backgroundLocationReducer.open()
        } else {
            props.state.backgroundLocationReducer.close();
            props.state.backgroundLocationReducer.open()
        }
        if (!props.state.ViajeReducer.data.movimientos["acepto_conductor"]) {
            props.navigation.replace("ConfirmarPage");
            setValidaciones({
                tiempoEspera: false,
                socket: false,
                usuario: false,
                viaje: false,
                backlocation: false,
                cantReintent: 0,
            })
        } else {
            props.navigation.replace("ViajeInicioPage");
            setValidaciones({
                tiempoEspera: false,
                socket: false,
                usuario: false,
                viaje: false,
                backlocation: false,
                cantReintent: 0,
            })
        }
        validaciones.viaje = "completado";
        setValidaciones({ ...validaciones });
        return <View />
    }

    return (
        <View />
    );
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);