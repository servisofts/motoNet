import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText } from '../../../SText';
import { STheme } from '../../../STheme';
import { SView } from '../../../SView';

export default class SHAjustes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView
                props={{
                    variant: "center"
                }}
                style={{
                    width: 200,
                    height: 300,
                    backgroundColor: STheme().backgroundColor,
                    borderRadius: 8,
                }}>
                <SText props={{
                    variant: "h4"
                }}> {this.props.data.label} </SText>
                <SText>Width: {this.props.data.width} </SText>
            </SView>
        );
    }
}
