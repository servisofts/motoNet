import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import Ayuda from '../../Component/Ayuda';

class AsociacionPage extends Component {
    static navigationOptions = {
        title:"Ayuda"
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
                <Text style={{color:"#000"}}>AYUDA</Text>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(AsociacionPage);
