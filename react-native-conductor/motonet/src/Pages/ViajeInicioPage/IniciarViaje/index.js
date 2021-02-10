import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const IniciarViaje = (props) => {

    var mensaje = false;

    if (!props.state.ViajeReducer.data) {
        return <View />
    }
    if (!props.state.ViajeReducer.data.movimientos["conductor_llego_destino"]) {
        return <View />
    }
    if (props.state.ViajeReducer.data.estado == 0) {
        return <View />
    }
    if (props.state.ViajeReducer.data.movimientos["inicio_ruta"]) {
        return <View />

    }
    return (
        <TouchableOpacity
            onPress={() => {
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "viaje",
                    type: "inicioDeRuta",
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
                Iniciar viaje.
        </Text>
        </TouchableOpacity>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(IniciarViaje);
