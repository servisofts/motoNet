import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Svg from '../../Svg';
import MapaViaje from '../../component/MapaViaje';
import CancelarViaje from '../../component/ModalComponet/CancelarViaje';
import AppParams from "../../Json"

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
        this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "viaje",
            type: "cancelarViajeCliente",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            key_viaje: this.props.state.viajesReducer.viaje.key,
            estado: "cargando"
        }, true);
        // this.setState({
        //     abrirModal: true
        // })
        return <View />
    }


    closeModal() {
        this.setState({
            abrirModal: false
        })
        return <View />
    }


    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapaViaje />

                <View
                    style={{
                        width: "90%",
                        height: 50,
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#fff",
                        top: 30,
                        borderRadius: 10
                    }} >
                    <Text>
                        Estado del viaje
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        // this.Cancelar()
                        Alert.alert(
                            "Alert Title",
                            "My Alert Msg",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Aceptar",
                                    onPress: () => console.log("OK Pressed")
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
                        CANCELAR
                    </Text>
                </TouchableOpacity>

                <CancelarViaje />

            </View >
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajeInicioPage);
