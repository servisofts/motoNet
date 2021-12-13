import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';
import MapaViaje from '../../component/MapaViaje';
import AppParams from "../../Json"
import EstadoViaje from '../../component/InicioViajeComponent/EstadoViaje';
import Geolocation from '@react-native-community/geolocation';
const delay = ms => new Promise(res => setTimeout(res, ms));
var lastSend = new Date().getTime();
class EmergenciaViajePage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            abrirModal: false
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                // if (!this.state.region) {
                //     return <View />
                // }
                // if (data.region.isRender) {
                //     return <View />
                // }
                var region = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }
                this.props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    data: region,
                });

            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                throw error;
            },
        );
    }

    Cancelar() {
        if (this.props.state.emergenciaReducer.data.movimientos["termino_viaje_conductor"]) {
            return <View />
        }
        if (this.props.state.emergenciaReducer.data.movimientos["ambulancia_cerca"]) {
            return <View />
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        "CONFIRMAR CANCELACIÓN",
                        "¿seguro que desea cancelar la emergencia?",
                        [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "Aceptar",
                                onPress: () => {
                                    this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                        component: "emergencia",
                                        type: "cancelarViajeCliente",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.emergenciaReducer.data.key,
                                        estado: "cargando"
                                    }, true);
                                    //this.props.navigation.replace("CargaPage");
                                    return <View />
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }}
                style={{
                    width: "90%",
                    height: 40,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#2C4C7E",
                    bottom: 10,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    CANCELAR
                    </Text>
            </TouchableOpacity>

        )
        // this.setState({
        //     abrirModal: true
        // })
    }
    Terminar() {
        if (!this.props.state.emergenciaReducer.data.movimientos["ambulancia_cerca"]) {
            return <View />
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.dispatch({
                        component: "emergencia",
                        type: "eliminarViaje",
                        estado: "exito"
                    })
                    //this.props.navigation.replace("CargaPage");
                    return <View />
                }
                }
                style={{
                    width: "90%",
                    height: 40,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#2C4C7E",
                    bottom: 10,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    Terminar
                    </Text>
            </TouchableOpacity >

        )
        // this.setState({
        //     abrirModal: true
        // })
    }
    closeModal() {
        this.setState({
            abrirModal: false
        })
        return <View />
    }

    render() {
        if (!this.props.state.emergenciaReducer.data) {
            this.props.navigation.replace("CargaPage");
            return <View />
        }
        var _instProps = this.props;
        const getViajeHilo = async () => {
            await delay(10000);
            var timeActual = new Date().getTime();
            if (timeActual - lastSend < 10000) {
                getViajeHilo();
                return;
            }
            lastSend = timeActual;
            console.log("HILO DEL VIAJE COMPLETADO");
            if (!_instProps.state.emergenciaReducer.data) {
                return;
            }
            if (!_instProps.state.emergenciaReducer.data["key"]) {
                return;
            }
            _instProps.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "emergencia",
                type: "getViajeByKeyUsuario",
                key_usuario: _instProps.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            getViajeHilo();
        };
        getViajeHilo();
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapaViaje />
                <EstadoViaje />
                {this.Cancelar()}
                {this.Terminar()}
                {/* <CancelarViaje navigation={this.props.navigation} /> */}
            </View >
        )
    }
}


const initStates = (state) => {
    return { state }
};


export default connect(initStates)(EmergenciaViajePage);
