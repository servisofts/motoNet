import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const EstadoViaje = (props) => {

    var mensaje = "Conductor cerca";

    var tamanho = Dimensions.get("window").height * 0.1;
    if (!props.state.viajesReducer.data) {
        return <View />
    }

    // if (props.state.viajesReducer.data.movimientos["inicio_emergencia"]) {
    //     mensaje = "Esperando confirmacion."
    // }

    // if (props.state.viajesReducer.data.movimientos["acepto_secretaria"]) {
    //     mensaje = "Estamos en busca de tu ambulancia";
    //     tamanho = Dimensions.get("window").height * 0.1
    // }

    // if (props.state.viajesReducer.data.movimientos["acepto_conductor"]) {
    //     mensaje = "Tu ambulancia viene en camino";
    //     tamanho = Dimensions.get("window").height * 0.1
    // }

    // if (props.state.viajesReducer.data.movimientos["ambulancia_cerca"]) {
    //     mensaje = "Ya llegó tu Ambulancia";

    //     tamanho = Dimensions.get("window").height * 0.25
    // }

    if (!mensaje) {
        return <View />
    }

    return (
        <View
            style={{
                width: "95%",
                minHeight: tamanho,
                position: "absolute",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#2C4C7E",
                top: 10,
                borderRadius: 10,
                padding: 10
            }} >
            <Text style={{
                color: "#fff",
                fontSize: Dimensions.get("window").height * 0.02,
                fontWeight: "bold"
            }}>
                {mensaje}
            </Text>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(EstadoViaje);
