import React from 'react';
import Mapa from '../BuscardorDireccion/Mapa';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
// import ComponenteInicio from './ComponenteInicio';
import BuscadorComponenteMap2 from '../BuscardorDireccion/BuscadorComponenteMap2';
import MarkerMedio from '../BuscardorDireccion/MarkerMedio';
import TiposDeViajes from './TiposDeViajes';
import DetalleDeViajes from './DetalleDeViajes';
import BarraSuperiorBuscador from '../BarraSuperiorBuscador';
import ListaBusqueda from '../BuscardorDireccion/ListaBusqueda';
import MapaAux from '../BuscardorDireccion/MapaAux';
// import PerfilConductorPage from '../../pages/Per/filConductorPage';

const Inicio = (props) => {

    const [ventanaSelect, setVentanaSelect] = React.useState("tipoDeViaje");

    const [ventanaBusqueda, setVentanaBusqueda] = React.useState(false);

    const VentaBusqueda = () => {
        if (ventanaBusqueda == false) {
            return <View />
        } else {
            return (
                <ListaBusqueda ventanaBusqueda={ventanaBusqueda} setVentanaBusqueda={setVentanaBusqueda} />
            )
        }
    }

    return (
        <View style={{
            flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
        }}>
            <View style={{
                width: "100%",
                height: 160,
                backgroundColor: "#fff",
            }}>
                <BarraSuperiorBuscador goBack={() => { props.navigation.goBack(); }} ventanaBusqueda={ventanaBusqueda} setVentanaBusqueda={setVentanaBusqueda} navigation={props.navigation} />

            </View>

            <View style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Mapa ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect}/>
                {/* <MapaAux ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect}/> */}
                {/* <MarkerMedio navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} /> */}
                {/* <BuscadorComponenteMap2 ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} navigation={props.navigation} /> */}
                <TiposDeViajes ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
                <DetalleDeViajes navigation={props.navigation} ventanaSelect={ventanaSelect} setVentanaSelect={setVentanaSelect} />
            </View>

            {VentaBusqueda()}

        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Inicio);
