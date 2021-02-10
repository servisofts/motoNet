import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import ConfirmarViaje from '../../Component/ConfirmarViaje';

class ConfirmarPage extends Component {
    static navigationOptions = ({ navigation }) => (
        navigation.state.prop ? ({ ...navigation.state.prop }) : {}
    );
    constructor(props) {
        super(props);
        props.state.navigationReducer.setParams(props.navigation, {
            title: "Confirmar",
            headerShown: false,
        })
    }
    render() {
        if (this.props.state.backgroundLocationReducer.open) {
            if (!this.props.state.backgroundLocationReducer.isOpen) {
                this.props.state.backgroundLocationReducer.open()
            }
        }
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: ""
            }}>
                <ConfirmarViaje navigation={this.props.navigation} />
            </View>
        );
    }
};


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConfirmarPage);
