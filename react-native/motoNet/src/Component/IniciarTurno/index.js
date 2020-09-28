import React from 'react';
import { connect } from 'react-redux';

import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';



const iniciarTurno = (props) => {
    if (props.state.backgroundLocationReducer.isOpen) {
        return <View />
    }
    return (
        <View style={{
            position: "absolute",
            width: "80%",
            height: "50%",
            borderRadius: 20,
            backgroundColor: "red",
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <Text style={{
                width: "100%",
            }}>

            </Text>
            <TouchableOpacity
                onPress={() => {
                    props.state.backgroundLocationReducer.open()
                }}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>
                 Bienvenido {"\n"} 
                 {props.state.usuarioReducer.usuarioDatos["Nombres"].dato}
                 {" "+props.state.usuarioReducer.usuarioDatos["Apellidos"].dato}.
                </Text>
                <Text >
                 Para recibir viajes precione iniciar.
                </Text>
            </TouchableOpacity>
        
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(iniciarTurno);
