import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import Consola from '../../Component/Consola';
class LoginPage extends Component {
    static navigationOptions = {
        headerShown: true,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <Consola navigation={this.props.navigation}/>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(LoginPage);
