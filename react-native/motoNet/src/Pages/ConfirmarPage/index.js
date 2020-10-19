import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Animated } from 'react-native';

class ConfirmarPage extends Component {
    static navigationOptions = {
        headerShown: true,
    }
    constructor(props) {
        super();
    }
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor:""
            }}>
                <Text>fsdfds</Text>
            </View>
        );
    }
};


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConfirmarPage);
