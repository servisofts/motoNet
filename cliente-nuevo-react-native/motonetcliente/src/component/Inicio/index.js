import React from 'react';
import Mapa from '../BuscardorDireccion/Mapa';
import { connect } from 'react-redux';
import { View } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import BuscadorComponenteMap from '../BuscardorDireccion/BuscadorComponenteMap';
import MarkerMedio from '../BuscardorDireccion/MarkerMedio';
import ConfirmacionBusqueda from './ConfirmacionBusqueda';
const Inicio = (props) => {
    if (props.state.componenteInicioReducer.seleccionado != "IniciarTurno") {
        props.state.componenteInicioReducer.navigate("IniciarTurno", props.dispatch);
    }
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa />
            <MarkerMedio  navigation={props.navigation}/>
            <BuscadorComponenteMap navigation={props.navigation} />
            <ConfirmacionBusqueda/>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);
