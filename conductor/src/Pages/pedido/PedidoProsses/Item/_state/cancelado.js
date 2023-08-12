import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SInput, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import PButtom from '../../../../../Components/PButtom';
import Model from '../../../../../Model';

export default class cancelado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        Model.pedido.Action.CLEAR();
        SNavigation.reset("/");
    }
    render() {
        // Model.viaje.Action.CLEAR();
        return (
            <SPage center hidden disableScroll>
                <SText>Cancelado</SText>
                {/* <SText>{JSON.stringify(this.props.data)}</SText> */}
                <PButtom onPress={() => {
                    Model.pedido.Action.CLEAR();
                    SNavigation.reset("/");
                }}>SALIR</PButtom>
            </SPage >
        );
    }
}
