import React from 'react';
import { connect } from 'react-redux';

import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import IniciarTurno from '../../IniciarTurno';
import ConfirmarViaje from '../../ConfirmarViaje';
const ComponenteInicio = (props) => {
    switch (props.state.componenteInicioReducer.seleccionado) {
        case "IniciarTurno":
            return <IniciarTurno />
        case "ConfirmarViaje":
            return <ConfirmarViaje />
        default: return <View />
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponenteInicio);
