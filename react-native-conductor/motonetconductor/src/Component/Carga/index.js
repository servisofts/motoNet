import React from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json/index.json'
const delay = ms => new Promise(res => setTimeout(res, ms));
var cabecera = "registro_conductor";
var DEBUG = true;
var lastSend = 0;
const Carga = (props) => {
    const [mensaje, setMensaje] = React.useState("");

    const getMensaje = () => {
        if (!props.navigation) {
            return "No se encontro navegacion.";
        }
        if (!props.state.socketClienteReducer.sessiones[AppParams.socket.name]) {
            return "Conectando al servidor...";
        }

        if (!props.state.socketClienteReducer.sessiones[AppParams.socket.name].isOpen) {
            return "Conectando al servidor...";
        }

        if (!props.state.usuarioReducer.usuarioCargado) {
            AsyncStorage.getItem(AppParams.storage.usuarioLog).then((value) => {
                props.state.usuarioReducer.usuarioCargado = true;
                if (!value) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return;
                }
                if (value.length <= 0) {
                    props.state.usuarioReducer.usuarioLog = false;
                    return;
                }
                props.state.usuarioReducer.usuarioLog = JSON.parse(value)
                return;
            });
            return "Buscando usuario...";
        }
        //Verificar si existe usuario
        if (!props.state.usuarioReducer.usuarioLog) { //Cuando no existe usuario
            if (!props.state.cabeceraDatoReducer.data[cabecera]) {
                if (props.state.cabeceraDatoReducer.estado == "cargando") {
                    return "Cargando datos de registro..."
                }
                props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                    component: "cabeceraDato",
                    type: "getDatoCabecera",
                    estado: "cargando",
                    cabecera: cabecera
                });
                props.state.cabeceraDatoReducer.estado = "cargando";
                return "Buscando datos de registro...";
            } else {
                props.state.usuarioReducer.estado = "";
                props.navigation.replace("LoginPage");
            }
        } else { //Cuando existe usuario
            if (!props.state.usuarioReducer.usuarioDatos) {//Cuando no existe Datos de usuario
                if (props.state.usuarioReducer.estado == "cargando") {
                    const reintent = async () => {
                        await delay(4000);
                        if (props.state.usuarioReducer.usuarioDatos) {
                            return;
                        }
                        if (props.state.usuarioReducer.estado == "cargando") {
                            var curTime = new Date().getTime();
                            if (curTime - lastSend > 3000) {
                                props.state.usuarioReducer.estado = "";
                                setMensaje("Reintentado Cargar usuario");
                                return;
                            }

                        }
                        reintent();
                    };
                    reintent();
                    return "Cargando datos de usuario...";
                }
                props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                    component: "usuario",
                    type: "getById",
                    key: props.state.usuarioReducer.usuarioLog.key,
                    cabecera: cabecera,
                    estado: "cargando"
                }, true);
                lastSend = new Date().getTime();
                props.state.usuarioReducer.estado = "cargando";
                return "Buscando datos de usuario...";
            } else {//Cuando existe Datos de usuario
                if (!props.state.ViajeReducer.estadoConsultado) {//Cuando el viaje no se consultado
                    if (props.state.ViajeReducer.estado == "cargando") { //Cuando el viaje esta cargando
                        return "Esperando viaje..."
                    }
                    props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                        component: "viaje",
                        type: "getViajeByKeyUsuario",
                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                        estado: "cargando"
                    }, true);
                    props.state.ViajeReducer.estado = "cargando";
                    return "Buscando viaje...";
                } else { //Cuando el viaje ya se consulto
                    if (!props.state.ViajeReducer.data) {  //Cuando no tenemos viaje
                        //Verificamos los datos de el usuario;
                        var estados = false
                        Object.keys(props.state.usuarioReducer.usuarioDatos).map((key) => {
                            var obj = props.state.usuarioReducer.usuarioDatos[key]
                            if (key === "Foto perfil") {
                                return <View /> //omitir 
                            }
                            if (key === "Password") {
                                return <View />//omitir 
                            }
                            if (obj.estado === 0) {
                                estados = true
                                return <View />
                            }
                        })
                        if (estados) {
                            props.state.usuarioReducer.estado = ""
                            props.navigation.replace("EsperandoConfirmacionPage");
                            return "Ir a espera de confirmacion."
                        } else {

                            props.navigation.replace("InicioPage");
                            return "Ir al inicio."
                        }

                    } else {//Cuando tenemos viajeif()
                        if (!props.state.ViajeReducer.data.movimientos) {
                            return "No hay movimientos";
                        }
                        if (props.state.ViajeReducer.data.estado == 0) {
                            props.navigation.replace("InicioPage");
                            return "Ir a confirmar viaje.";
                        }
                        if (props.state.ViajeReducer.data.key_conductor != props.state.usuarioReducer.usuarioLog.key) {
                            props.navigation.replace("InicioPage");
                            return "Ir a confirmar viaje.";
                        }
                        if (!props.state.ViajeReducer.data.movimientos["inicio_viaje"]) {
                            props.navigation.replace("ConfirmarPage");
                            return "Ir a confirmar viaje.";
                        } else {
                            if(props.state.ViajeReducer.data.movimientos["termino_viaje_conductor"]){
                                props.navigation.replace("InicioPage");
                                return "Inicio page"
                            }
                            props.navigation.replace("ViajeInicioPage");
                            // props.navigation.replace("InicioPage");

                            return "Ir al viaje.";
                        }
                    }
                }
            }
        }
        return "Cargando...";
    }
    var mensajeTemp = getMensaje();
    if (mensajeTemp != mensaje) {
        setMensaje(mensajeTemp);
        return <View />;
    }
    return (
        <View style={{
            position: "absolute",
            bottom: "10%",
        }}>
            <Text>{mensaje}</Text>
        </View>
    );
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);