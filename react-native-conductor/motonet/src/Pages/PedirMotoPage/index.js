import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import * as popupActions from '../../Actions/popupActions'
import Svg from '../../Svg';
import BuscadorComponenteMap from '../../Component/BuscardorDireccion/BuscadorComponenteMap';
import ListaBusqueda from '../../Component/BuscardorDireccion/ListaBusqueda';
import Mapa from '../../Component/BuscardorDireccion/Mapa';
import MarkerMedio from '../../Component/BuscardorDireccion/MarkerMedio';
class PedirMotoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                }}>
                <Mapa />
                <BuscadorComponenteMap />
                <MarkerMedio />
            </View>
        )

    };
};
const styles = StyleSheet.create({
    buscar: {
        width: 250,
        height: 50,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    touchableOpacity: {
        width: 150,
        height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },
    touchableOpacity2: {
        width: 150,
        height: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },

});
const initActions = ({
    ...popupActions,
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(PedirMotoPage);
