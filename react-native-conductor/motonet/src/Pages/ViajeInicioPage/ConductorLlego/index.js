import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const ConductorLlego = (props) => {

    var mensaje = false;

    if (!props.state.ViajeReducer.data) {
        return <View />
    }
    if (!props.state.ViajeReducer.data.movimientos["conductor_cerca"]) {
        return <View />
    }

    if (props.state.ViajeReducer.data.movimientos["conductor_llego_destino"]) {
        return <View />
    }

    return (
        <TouchableOpacity
            onPress={() => {
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "viaje",
                    type: "conductorLlegoDestino",
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                    key_viaje: props.state.ViajeReducer.data.key,
                    estado: "cargando"
                }, true);
                return <View />
            }}
            style={{
                width: "50%",
                height: 50,
                position: "absolute",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#f00",
                top: 100,
                borderRadius: 10
            }} >
            <Text style={{
                color: "#fff"
            }}>
                Notificar que llegue a destino.
        </Text>
        </TouchableOpacity>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConductorLlego);
