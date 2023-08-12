import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SInput, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';

export default class buscando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        Model.pedido.Action.CLEAR();
        SNavigation.reset("/");
        // SNavigation.goBack();
    }
    render() {
        // Model.viaje.Action.CLEAR();
        return (
            <SPage center hidden disableScroll>
                <SText>BUSCANDO CONDUCTOR ESTATE</SText>
            </SPage >
        );
    }
}
