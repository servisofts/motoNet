import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';
// import Svg from '../../../Svg';
import ComponentDetalleViaje from './ComponentDetalleViaje';

export default class PerfilConductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };
        this.open()
    }
    open() {
        new Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 200,
                backgroundColor: "#fff",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                justifyContent: "space-around",
                alignItems: "center",
                transform: [{
                    translateY: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0]
                    })
                }]
            }}>

                <ComponentDetalleViaje data={this.props.data} close={this.props.close} />

            </Animated.View >
        );
    }
}
