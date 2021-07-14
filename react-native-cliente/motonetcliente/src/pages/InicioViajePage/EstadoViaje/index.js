import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const EstadoViaje = (props) => {

    var mensaje = "Conductor cerca";
    console.log(Object.keys(props.state.viajesReducer.data.movimientos))
    if (!props.state.viajesReducer.data) {
        return <View />
    }

    if (props.state.viajesReducer.data.movimientos["inicio_viaje"]) {
        mensaje = "Conductor Viene"
    }

    if (props.state.viajesReducer.data.movimientos["conductor_cerca"]) {
        mensaje = "Su moto esta cerca";
    }

    if (props.state.viajesReducer.data.movimientos["conductor_llego"]) {
        mensaje = "Su moto llego";
    }

    if (props.state.viajesReducer.data.movimientos["conductor_inicio"]) {
        mensaje = "Viaje iniciado";
    }

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
