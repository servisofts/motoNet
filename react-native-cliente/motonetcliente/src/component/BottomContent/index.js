import React, { Component } from 'react';
import { View, Text } from 'react-native';
import STheme from '../../STheme';

export default class BottomContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: this.props.height,
                minHeight:100,
                backgroundColor: STheme.color.primary,
                borderTopRightRadius: 16,
                borderTopLeftRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
            }}>
                {this.props.children}
            </View>
        );
    }
}
