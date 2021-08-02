import React, { Component } from 'react';
import { View, Text } from 'react-native';

export type TestPropsType = {
    detalle: String
}
export default class Test extends Component<TestPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getDetalle() {
        return this.props.detalle;
    }
    render() {
        return (
            <View>
                
            </View>
        );
    }
}
Test.defaultProps = {
    detalle: "Default detalle"
}
