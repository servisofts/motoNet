import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SText, SView } from 'servisofts-component'
import BarraTiempo from '../../../../Components/BarraTiempo'

import confirmando_conductor from './_state/confirmando_conductor'
import esperando_conductor from './_state/esperando_conductor'
import entregado_conductor from './_state/entregado_conductor'
import conductor_llego from './_state/conductor_llego'
import entregado from './_state/entregado'
import no_recogido from './_state/no_recogido'
import cancelado from './_state/cancelado'
const STATES = {
    confirmando_conductor,
    esperando_conductor,
    entregado_conductor,
    conductor_llego,
    no_recogido,
    entregado,
    cancelado
}
export default class Item extends Component {
    render() {

        if(!this.props.data) return null;
        const { state, direccion, cantidad, fecha_edit, key } = this.props.data

        let COMPONENT = () => <SText>{state}</SText>
        if (STATES[state]) {
            COMPONENT = STATES[state]
        }
        return (
            <SView col={"xs-12"} center flex>
                <COMPONENT {...this.props} />
            </SView>
        )
    }
}