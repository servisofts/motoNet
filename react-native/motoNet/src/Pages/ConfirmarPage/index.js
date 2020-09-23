import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import Confirmar from '../../Component/Confirmar';

class ConfirmarPage extends Component {
    static navigationOptions = {
        headerShown: true,
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>                
                <Confirmar />
            </View>
        );
    }
};

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConfirmarPage);
