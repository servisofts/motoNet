import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SNavigation, STable, SText, STheme, SThread, SView } from 'servisofts-component'
import BarraCargando from '../../../Components/BarraCargando'

export default class SinPedidos extends Component {
    componentDidMount() {
        this.valid = true;
        new SThread(2 * 1000, "no_hay_pedidos", true).start(() => {
            if (this.valid) {
                SNavigation.replace("/root");
            }
        })
    }
    componentWillUnmount() {
        this.valid = false;
    }
    render() {
        return (
            <SView col={"xs-12"} height center padding={8} backgroundColor={STheme.color.background}>
                {/* <SText>Esperando pedidos...</SText> */}
                <SView col={"xs-6"} colSquare>
                    <SIcon name='Logo' />
                </SView>
                <SHr h={30} />
                <SView col={"xs-8"}>
                    <BarraCargando />
                </SView>
                {/* <SText></SText> */}
            </SView>
        )
    }
}