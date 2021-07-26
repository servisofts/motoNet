import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { STheme } from '../STheme';

export default class SActivityIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ActivityIndicator color={STheme().colorSecondary} size={"large"} />
        );
    }
}
