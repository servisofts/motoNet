import React, { Component } from 'react';
import { SButtom, SHr, SNavigation, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class inicio_viaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden center>
                <SText fontSize={16}>{'Incio el viaje'}</SText>
                <SHr />
                <SButtom type='danger' onPress={() => {

                    Model.viaje.Action.action("cancelar", this.props.viaje.key).then((resp) => {
                        Model.viaje.Action.CLEAR();
                    })

                }}>Salir</SButtom>
            </SPage>
        );
    }
}
