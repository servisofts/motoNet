import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, } from 'react-native';
import * as popupActions from '../../action/popupActions'
import BuscadorComponenteMap from '../../component/BuscardorDireccion/BuscadorComponenteMap';
import Mapa from '../../component/BuscardorDireccion/Mapa';
import MarkerMedio from '../../component/BuscardorDireccion/MarkerMedio';
import ButtonAceptarMap from '../../component/BuscardorDireccion/ButtonAceptarMap';

class VerificarUbicacionPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                    borderColor: "#ccc",
                    borderWidth: 2,
                    // borderRadius:0
                }}>
                <Mapa navigation={this.props.navigation} />
                <MarkerMedio navigation={this.props.navigation} />
                <BuscadorComponenteMap navigation={this.props.navigation} />
                <ButtonAceptarMap navigation={this.props.navigation} />
            </View>
        )

    };
};

const initActions = ({
    ...popupActions,
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(VerificarUbicacionPage);
