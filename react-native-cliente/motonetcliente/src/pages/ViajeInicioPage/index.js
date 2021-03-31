import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Svg from '../../Svg';
import MapaViaje from '../../component/MapaViaje';
// import CancelarViaje from '../../component/InicioViajeComponet/CancelarViaje';
import AppParams from "../../Json"
import EstadoViaje from '../../component/InicioViajeComponent/EstadoViaje';
import { stat } from 'react-native-fs';

class ViajeInicioPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            abrirModal: false
        }
    }

    Cancelar() {

        if (this.props.state.viajesReducer.data.movimientos["inicio_ruta"]) {
            return <View />
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        "Alerta",
                        "Al aceptar la cancelación, puede que tenga un costo",
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
                                        component: "viaje",
                                        type: "cancelarViajeCliente",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.viajesReducer.data.key,
                                        estado: "cargando"
                                    }, true);
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }}
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#f00",
                    bottom: 30,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    CANCELAR VIAJE
                    </Text>
            </TouchableOpacity>

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

        if (!this.props.state.viajesReducer.data) {
            this.props.navigation.replace("CargaPage");
            return <View />
        }

        if (this.props.state.viajesReducer.data.movimientos["conductor_cobro_viaje"]) {
            this.props.navigation.replace("CalificarViajePage");
        }

        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapaViaje />
                <EstadoViaje />
                {this.Cancelar()}
            </View >
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajeInicioPage);
