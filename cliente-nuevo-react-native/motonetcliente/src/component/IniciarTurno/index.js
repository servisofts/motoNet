import React from 'react';
import { connect } from 'react-redux';

import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
const iniciarTurno = (props) => {

    return (
        <View style={{
            position: "absolute",
            height: "50%",
            top: "30%",
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <Text style={{
                width: "100%",
            }}>

            </Text>
            <TouchableOpacity
                onPress={() => {
                 /*     props.state.socketClienteReducer.sessiones["motonet"].send({
                        component: "viaje",
                        type: "buscar",
                        estado: "cargando"
                    }, true);  */
                }}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {/* <Text >
                    Bienvenido
                 {props.state.usuarioReducer.usuarioDatos["Nombres"].dato}
                    {" " + props.state.usuarioReducer.usuarioDatos["Apellidos"].dato}.
                </Text> */}
                <Text  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign:"center"
                }}>
                    Para recivir viajes precion iniciar.
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(iniciarTurno);
