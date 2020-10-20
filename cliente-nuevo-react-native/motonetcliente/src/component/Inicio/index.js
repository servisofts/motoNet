import React from 'react';
import Mapa from '../BuscardorDireccion/Mapa';
import { connect } from 'react-redux';
import { View } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import BuscadorComponenteMap from '../BuscardorDireccion/BuscadorComponenteMap';
import MarkerMedio from '../BuscardorDireccion/MarkerMedio';
import ButtonPosition from '../BuscardorDireccion/ButtonPosition';
import TiposDeViajes from './TiposDeViajes';
import DetalleDeViajes from './DetalleDeViajes';


const Inicio = (props) => {

    const [ventanaSelect, setVentanaSelect] = React.useState("tipoDeViaje");

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa  ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect}/>
            <MarkerMedio navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect}/>
            <BuscadorComponenteMap navigation={props.navigation} />
            <TiposDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            <DetalleDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Inicio);
