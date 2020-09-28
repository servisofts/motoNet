import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ConfirmacionBusqueda = (props) => {
    return (
        <TouchableOpacity style={{
            justifyContent: "center",
            alignItems: 'center',
            position: "absolute",
            bottom: 10,
            width: 180,
            height: 40,
            borderRadius: 20,
            backgroundColor: "red"
        }}>
            <Text style={{color:"#fff", fontSize:18}}>Confirmar...</Text>
        </TouchableOpacity>
    )
}

export default ConfirmacionBusqueda;

