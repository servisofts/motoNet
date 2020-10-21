import React from 'react';
import Mapa from '../BuscardorDireccion/Mapa';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import ComponenteInicio from './ComponenteInicio';
import BuscadorComponenteMap from '../BuscardorDireccion/BuscadorComponenteMap';
import MarkerMedio from '../BuscardorDireccion/MarkerMedio';
import ButtonPosition from '../BuscardorDireccion/ButtonPosition';
import TiposDeViajes from './TiposDeViajes';
import DetalleDeViajes from './DetalleDeViajes';
import Svg from '../../Svg';


const Inicio = (props) => {

    const [ventanaSelect, setVentanaSelect] = React.useState("tipoDeViaje");

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Mapa />
            <MarkerMedio navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            <BuscadorComponenteMap ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} navigation={props.navigation} />
            <TiposDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            <DetalleDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            <TouchableOpacity
                onPress={() => {
                    props.state.naviDrawerReducer.openBar()
                }}
                style={{
                    width: 50,
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 5,
                    left: 10,                    
                }} >
                <Svg name="menu"
                    style={{
                        width: 20,
                        height: 20,
                        fill: "#000",
                    }} />
            </TouchableOpacity>
        </View>

    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Inicio);
