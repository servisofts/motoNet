import React, { Component } from 'react';
import { SButtom, SHr, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class fin_viaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden center>
                <SText>El viaje finalizo</SText>
                <SHr />
                <SButtom type='danger'
                    onPress={() => {
                        Model.viaje.Action.CLEAR();
                    }}>SALIR</SButtom>

            </SPage>
        );
    }
}
