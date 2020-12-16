import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const BarraDeEstado = (props) => {

    var mensaje = false;
    mensaje = "Esperando viaje."

    if (!mensaje) {
        return <View />
    }
    if (!props.state.backgroundLocationReducer.isOpen) {
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

export default connect(initStates)(BarraDeEstado);
