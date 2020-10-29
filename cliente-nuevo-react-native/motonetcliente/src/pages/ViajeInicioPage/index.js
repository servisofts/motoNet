import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';
import MapaViaje from '../../component/MapaViaje';

class ViajeInicioPage extends Component {

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
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapaViaje />

               

                <TouchableOpacity
                    onPress={() => {
                        this.props.state.naviDrawerReducer.openBar()
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 15,
                        left: 10,
                    }} >
                    <Svg name="menu"
                        style={{
                            width: 20,
                            height: 20,
                            fill: "#000",
                        }} />
                </TouchableOpacity>
            </View>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajeInicioPage);
