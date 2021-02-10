import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const BarraDeEstado = (props) => {

    var mensaje, mensaje2 = false;
    mensaje = "Activado"
    mensaje2 = "esperando una alerta..."

    if (!mensaje && !mensaje2) {
        return <View />
    }
    if (!props.state.backgroundLocationReducer.isOpen) {
        return <View />
    }

    const getLats = () => {
        if (!props.state.backgroundLocationReducer.last) {
            return <ActivityIndicator  size="small" color="#0000ff"/>
        }
        return (<Text style={{
            fontSize: 15,
            color: "#2c4b81"
        }}>
            {props.state.backgroundLocationReducer.last.toLocaleTimeString()}
        </Text>)
    }
    return (
        <View
            style={{
                width: "90%",
                height: 120,
                position: "absolute",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#fff",
                borderWidth: 3,
                borderColor: "#2c4b81",
                top: "15%",
                borderRadius: 20
            }} >
                <Text style={{
                    fontSize: 20,
                    color: "#2c4b81", 
                    fontWeight:'bold',
                    textAlign:'center'
                }}>
                    {mensaje}
                </Text>
                <Text style={{
                    fontSize: 20,
                    color: "#2c4b81", 
                    textAlign:'center',
                    paddingBottom: 10,
                }}>
                    {""+ mensaje2}
                </Text>

                
                <Text style={{
                    fontSize: 13,
                    color: "#2c4b81",
                }}>
                    Ubicación última ves enviada a las :
                </Text>
            {getLats()}
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BarraDeEstado);
