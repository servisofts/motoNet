import React, { Component } from 'react';
import { SButtom, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class cancelado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'cancelado'}>

                <SText>{'cancelado'}</SText>
                <SButtom type='danger'
                    onPress={() => {
                        Model.viaje.Action.CLEAR();
                    }}>CANCELAR</SButtom>
            </SPage >
        );
    }
}
