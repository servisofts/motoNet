import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';

import Inicio from '../../Component/Inicio';
class InicioPage extends Component {
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
                width: "100%",
                justifyContent: 'center',
            }}>
                <Inicio navigation={this.props.navigation} />
                <TouchableOpacity style={{
                    width: 200,
                    height: 50,
                    borderRadius: 20,
                    position: "absolute",
                    bottom: 30,
                    backgroundColor: "red",
                    left: "25%",
                    alignItems: 'center',
                    justifyContent: 'center',

                }}>
                    <Text>Pedir moto</Text>
                </TouchableOpacity>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
