import React from 'react';
import Mapa from './Mapa';

import { connect } from 'react-redux';
import { View } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import TerminarTurno from '../TerminarTurno';

const Inicio = (props) => {
    if( props.state.componenteInicioReducer.seleccionado != "IniciarTurno" && !props.state.backgroundLocationReducer.isOpen){
        props.state.componenteInicioReducer.navigate("IniciarTurno",props.dispatch);
    }
    return (
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
            }}>
            <Mapa/>
            <ComponenteInicio/>
           <TerminarTurno/>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);
