import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText, SView } from 'servisofts-component'

export default class InfoBar extends Component {
    render() {
        let cantidad = this.props.parent.pedidos_arr.length;
        return (
            <SView col={"xs-12"} height={24} card>
                <SText>#: {cantidad}</SText>
            </SView>
        )
    }
}