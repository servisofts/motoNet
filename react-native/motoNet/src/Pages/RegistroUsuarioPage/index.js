import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import RegistroUsuario from '../../Component/RegistroUsuario';
class RegistroUsuarioPage extends Component {
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
            }}>
                <RegistroUsuario navigation={this.props.navigation}/>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RegistroUsuarioPage);
