import React from 'react';
import Mapa from './Mapa';

import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import TerminarTurno from '../TerminarTurno';
import Svg from '../../Svg';

const Inicio = (props) => {

    /* if (props.state.componenteInicioReducer.seleccionado != "ConfirmarViaje") {
        props.state.componenteInicioReducer.navigate("ConfirmarViaje", props.dispatch);
    } */

    if (props.state.ViajeReducer.data) {
        props.state.componenteInicioReducer.navigate("ConfirmarViaje", props.dispatch);
    } else {
        if (props.state.componenteInicioReducer.seleccionado != "IniciarTurno" && !props.state.backgroundLocationReducer.isOpen) {
            props.state.componenteInicioReducer.navigate("IniciarTurno", props.dispatch);
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa />
            <ComponenteInicio />
            <TerminarTurno />

            <TouchableOpacity
                onPress={() => {
                    props.state.naviDrawerReducer.openBar()
                }}
                style={styles.icono}>
                <Svg name="LogoMoto"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#fff"
                    }} />
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    icono: {
        width: 65,
        height: 65,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#f00",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        left: 10,        
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);
