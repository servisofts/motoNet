import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';
// import Svg from '../../../Svg';
import ComponentDetalleProducto from './ComponentDetalleProducto';

export default class DetalleProducto extends Component {
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
                height: 400,
                backgroundColor: "#fff",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                justifyContent: "space-around",
                alignItems: "center",
                transform: [{
                    translateY: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [400, 0]
                    })
                }]
            }}>

                <ComponentDetalleProducto data={this.props.data} close={this.props.close} />

            </Animated.View >
        );
    }
}
