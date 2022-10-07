import React, { Component } from 'react';
import { SButtom, SHr, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class cancelado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden center>

                <SText>El viaje fue cancelado</SText>
                <SHr />
                <SButtom type='danger'
                    onPress={() => {
                        Model.viaje.Action.CLEAR();
                    }}>SALIR</SButtom>

            </SPage>
        );
    }
}
