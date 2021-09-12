import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import Ayuda from '../../Component/Ayuda';
import BarraSuperior from '../../Component/BarraSuperior';

class AyudaPage extends Component {
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
                <BarraSuperior title={"Ayuda"} goBack={()=>{
                    this.props.navigation.goBack();
                }}/>
                <Text style={{ color: "#000" }}>AYUDA</Text>
            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(AyudaPage);
