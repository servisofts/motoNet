import React, { Component } from 'react'
import { SIcon, SText, STheme, SView } from 'servisofts-component';

export default class SolicitarServicio extends Component {
    render() {
        return (
            <SView width={150} height={20} row center onPress={this.props.onPress}>
                <SText color={STheme.color.secondary} bold style={{
                    paddingBottom: 2,
                }}>Soliciar servicio</SText>
                <SView width={4} />
                <SIcon name='addicon' width={20} height={20} />
            </SView>
        )
    }
}