import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';

import Inicio from '../../Component/Inicio';
import NaviDrawer from '../../Component/NaviDrawer';
class InicioPage extends Component {
    static navigationOptions = ({ navigation }) => (
        navigation.state.prop ? ({ ...navigation.state.prop }) : {}
      );
    constructor(props) {
        super(props);
        props.state.navigationReducer.setParams(props.navigation, {
            title: "Inicio",
            headerShown: false,
            headerTitleStyle: {
              color: '#fff',
            },
          })
    }
    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <Inicio navigation={this.props.navigation} />
                <NaviDrawer navigation={this.props.navigation} />
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
