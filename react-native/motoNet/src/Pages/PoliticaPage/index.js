import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import Politica from '../../Component/Politica';

class PoliticaPage extends Component {
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
                <Politica />
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PoliticaPage);
