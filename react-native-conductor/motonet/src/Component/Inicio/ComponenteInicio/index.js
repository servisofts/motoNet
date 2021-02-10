import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import IniciarTurno from '../../IniciarTurno';
import ConfirmarViaje from '../../ConfirmarViaje';

const ComponenteInicio = (props) => {
    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "viajeEntrante") {
        props.state.navigationReducer.replace("ConfirmarPage");
        return <View />
    }
    switch (props.state.componenteInicioReducer.seleccionado) {
        case "IniciarTurno":
            return <IniciarTurno />
        default: return <View />
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponenteInicio);
