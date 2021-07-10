import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const EstadoViaje = (props) => {

    var mensaje = "Conductor cerca";

    if (!props.state.viajesReducer.data) {
        return <View />
    }

    // if (props.state.viajesReducer.data.movimientos["inicio_emergencia"]) {
    //     mensaje = "Esperando confirmacion."
    // }

    // if (props.state.viajesReducer.data.movimientos["acepto_secretaria"]) {
    //     mensaje = "Estamos en busca de tu ambulancia";
    // }

    // if (props.state.viajesReducer.data.movimientos["acepto_conductor"]) {
    //     mensaje = "Tu ambulancia viene en camino";
    // }

    // if (props.state.viajesReducer.data.movimientos["ambulancia_cerca"]) {
    //     mensaje = "Ya llegó tu Ambulancia";

    // }

    if (!mensaje) {
        return <View />
    }

    return (
        <View>
            <Text style={{
                color: "#000",
                fontSize: 15,
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
