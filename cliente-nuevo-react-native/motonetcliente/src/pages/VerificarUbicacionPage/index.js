import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import BuscadorComponenteMap from '../../component/BuscardorDireccion/BuscadorComponenteMap';
import Mapa from '../../component/BuscardorDireccion/Mapa';
import MarkerMedio from '../../component/BuscardorDireccion/MarkerMedio';
class VerificarUbicacionPage extends Component {
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
                <Mapa navigation={this.props.navigation} />
                <MarkerMedio  navigation={this.props.navigation}/>
                <BuscadorComponenteMap  navigation={this.props.navigation}/>
            </View>
        )

    };
};


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(VerificarUbicacionPage);
