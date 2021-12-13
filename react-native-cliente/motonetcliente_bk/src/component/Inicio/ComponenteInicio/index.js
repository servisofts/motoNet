import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import IniciarTurno from '../../IniciarTurno';
const ComponenteInicio = (props) => {
    switch (props.state.componenteInicioReducer.seleccionado) {
        case "IniciarTurno": return <IniciarTurno />
        default: return <View />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponenteInicio);
