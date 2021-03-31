import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const EstadoViaje = (props) => {

    var mensaje = false;

    var tamanho = Dimensions.get("window").height * 0.1;
    if (!props.state.viajesReducer.data) {
        return <View />
    }

    if (props.state.viajesReducer.data.movimientos["inicio_viaje"]) {
        // mensaje = "Esperando confirmacion."
        mensaje = "Esperando Conductor...",
            tamanho = Dimensions.get("window").height * 0.1
    }

    if (props.state.viajesReducer.data.movimientos["acepto_secretaria"]) {
        // mensaje = "Estamos en busca de tu ambulancia";
        mensaje = "ESTAMOS EN BUSCA DE TU AMBULANCIA";
        tamanho = Dimensions.get("window").height * 0.1
    }

    if (props.state.viajesReducer.data.movimientos["acepto_conductor"]) {
        // mensaje = "Tu ambulancia viene en camino";
        mensaje = "TU AMBULANCIA VIENE EN CAMINO";
        tamanho = Dimensions.get("window").height * 0.1
    }

    if (props.state.viajesReducer.data.movimientos["ambulancia_cerca"]) {
        // mensaje = "Ya llegó tu Ambulancia";
        mensaje = "YA LLEGÓ TU AMBULANCIA";
        tamanho = Dimensions.get("window").height * 0.1
    }

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
                top: 10,
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#f6f6f4",
                shadowOffset: { width: 1, height: 1, },
                shadowColor: 'black',
                shadowOpacity: 1.0,
                shadowRadius: 20,
                elevation: 3,
            }} >
            <Text style={{
                color: "#f00",
                fontSize: Dimensions.get("window").height * 0.03,
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
