import React from 'react';
import Mapa from './Mapa';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import TerminarTurno from './TerminarTurno';
import Svg from '../../Svg';
import BarraDeEstado from './BarraDeEstado';

const Inicio = (props) => {

    /* if (props.state.componenteInicioReducer.seleccionado != "ConfirmarViaje") {
        props.state.componenteInicioReducer.navigate("ConfirmarViaje", props.dispatch);
    } */

    // if (props.state.ViajeReducer.estado == "exito") {
    // props.state.componenteInicioReducer.navigate("ConfirmarViaje", props.dispatch);
    //} else {
    if (props.state.componenteInicioReducer.seleccionado != "IniciarTurno" && !props.state.backgroundLocationReducer.isOpen) {
        props.state.componenteInicioReducer.navigate("IniciarTurno", props.dispatch);
    }
    // }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa />
            <BarraDeEstado/>
            <ComponenteInicio />
            <TerminarTurno />
            
            <TouchableOpacity
                onPress={() => {
                    props.state.naviDrawerReducer.openBar()
                }}
                style={styles.icono}>
                <Svg name="logoRecurso"
                    style={{
                        width: 40,
                        height: 40,
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
        borderColor: "#ff0000",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#fff",
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
