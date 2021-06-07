import React from 'react';
import Mapa from '../BuscardorDireccion/Mapa';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
// import ComponenteInicio from './ComponenteInicio';
import BuscadorComponenteMap2 from '../BuscardorDireccion/BuscadorComponenteMap2';
import MarkerMedio from '../BuscardorDireccion/MarkerMedio';
import TiposDeViajes from './TiposDeViajes';
import DetalleDeViajes from './DetalleDeViajes';
import Svg from '../../Svg';
import BarraSuperiorBuscador from '../BarraSuperiorBuscador';
// import PerfilConductorPage from '../../pages/Per/filConductorPage';

const Inicio = (props) => {

    const [ventanaSelect, setVentanaSelect] = React.useState("tipoDeViaje");

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <BarraSuperiorBuscador goBack={() => { props.navigation.goBack(); }} cventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} navigation={props.navigation} />

            <View style={{
                flex: 1,
                width: "100%"
            }}>
                <Mapa ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
                <MarkerMedio navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
                {/* <BuscadorComponenteMap2 ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} navigation={props.navigation} /> */}
                <TiposDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
                <DetalleDeViajes navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            </View>
            {/* <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
                style={{
                    width: 60,
                    height: 60,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                }}>
                <Svg name="Close"
                    style={{
                        width: 20,
                        height: 20,
                        fill: "#000",
                    }} />
            </TouchableOpacity> */}
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Inicio);
