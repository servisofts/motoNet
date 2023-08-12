import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SView } from 'servisofts-component';

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4 xxl-3"} center>
                    {this.props.children}
                </SView>
            </SView>
        );
    }
}
