import React, { Component } from 'react';
import { SButtom, SHr, SNavigation, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class no_conductor_disponible extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden>

                <SText fontSize={16}>{'Lo sentimos no encontramos conductores disponibles.'}</SText>

                <SHr />
                <SHr />
                <SButtom type='danger' onPress={() => {
                    Model.viaje.Action.action("cancelar", this.props.viaje.key).then((resp) => {
                        SNavigation.reset("/");
                    })

                }}>Salir</SButtom>
            </SPage>
        );
    }
}
