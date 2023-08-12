import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText, SView } from 'servisofts-component'

export default class SinPedidos extends Component {
  render() {
    return (
      <SView col={"xs-12"} height center>
        <SText fontSize={18}>Buscando pedidos...</SText>
      </SView>
    )
  }
}