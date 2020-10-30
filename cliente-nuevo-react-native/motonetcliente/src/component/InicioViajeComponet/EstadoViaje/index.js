import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const CancelarViaje = (props) => {

    var mensaje = false;

    if (!props.state.viajesReducer.viaje) {
        return <View />
    }

    if (props.state.viajesReducer.viaje.movimientos["inicio_viaje"]) {
        mensaje = "esperado Conductor"
    }

    if (props.state.viajesReducer.viaje.movimientos["conductor_cerca"]) {
        mensaje = "el conductor esta llegando a tu ubicación"
    }

    if (!mensaje) {
        return <View />
    }

    return (
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
                {mensaje}
            </Text>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CancelarViaje);
