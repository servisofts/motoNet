import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, } from 'react-native';
import Inicio from '../../component/Inicio';
import NaviDrawer from '../../component/NaviDrawer';

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
            }}>
                <Inicio navigation={this.props.navigation} />
                {/* <NaviDrawer navigation={this.props.navigation} /> */}
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
