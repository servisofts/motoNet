import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';

import Prueba from '../../Component/Prueba';
import TiempoReal from '../../Component/Prueba/TiempoReal';
class PruebaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: "#00000055",
            }}>
               <TiempoReal navigation={this.props.navigation}/>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PruebaPage);
