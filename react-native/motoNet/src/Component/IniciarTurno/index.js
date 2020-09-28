import React from 'react';
import { connect } from 'react-redux';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableWithoutFeedback

} from 'react-native';



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

            <Text style={{fontSize:20,color:"#ccc"}}>
                Bienvenido
            </Text>
            <Text style={{fontSize:30, color:"#fff"}}>
                {props.state.usuarioReducer.usuarioDatos["Nombres"].dato}
                {" " + props.state.usuarioReducer.usuarioDatos["Apellidos"].dato}.
                </Text>
                <Text style={{fontSize:20,color:"#ccc"}}>
                Para recibir viajes precione iniciar.
                </Text>
            <TouchableOpacity
                onPress={() => {
                    props.state.backgroundLocationReducer.open()
                }}
                style={{
                    marginTop:20,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>Iniciar</Text>
            </TouchableOpacity>

        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(iniciarTurno);
