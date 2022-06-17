import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Linking, TouchableOpacity, Animated } from 'react-native';
import ConfirmarViaje from '../../Component/ConfirmarViaje';
import { SBLocation } from 'servisofts-background-location';
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
        if (!SBLocation.connected) {
            SBLocation.start({
                nombre: "test nombre",
                label: "test label",
                minTime: 0,
                minDistance: 1
            }).then(resp => {
                console.log("start", resp);
            }).catch(err => {
                Linking.openSettings();
            });
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
