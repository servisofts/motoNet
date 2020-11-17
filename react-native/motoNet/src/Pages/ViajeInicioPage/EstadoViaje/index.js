import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const EstadoViaje = (props) => {

    var mensaje = false;

    if (!props.state.ViajeReducer.data) {
        return <View />
    }
  
    if (props.state.ViajeReducer.data.movimientos["inicio_viaje"]) {
        mensaje = "Dirijete a tu destino"
    }

    if (props.state.ViajeReducer.data.movimientos["conductor_cerca"]) {
        mensaje = "Ya estas llegando."
    }
    if (props.state.ViajeReducer.data.movimientos["conductor_llego_destino"]) {
        mensaje = "Espera a el cliente. Recuerda se amable."
    }
    if (props.state.ViajeReducer.data.movimientos["inicio_ruta"]) {
        mensaje = "Dirijete al destino. se amable."
    }
    if (props.state.ViajeReducer.data.movimientos["conductor_termino_viaje"]) {
        mensaje = "Esperamos que ayas tenido un buen viaje."
    }
    if (props.state.ViajeReducer.data.movimientos["conductor_cobro_viaje"]) {
        mensaje = "Viaje cobrado."
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

export default connect(initStates)(EstadoViaje);
