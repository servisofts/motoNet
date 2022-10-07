import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText, SView } from 'servisofts-component';
import states from './states';
export default class ViajeState extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var viaje = this.props.viaje;
        const StateComponent = states[viaje.state];
        if (StateComponent) {
            return <StateComponent viaje={viaje} />
        }
        return <SText>{viaje.state}</SText>

    }
}