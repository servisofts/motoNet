import React, { Component } from 'react';
import { SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';

type propsType = {

}

export default class CantidadPedidos extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
            total_pedidos: 0
        };

    }
    getContent() {
        var activos = Model.pedido.Action.getActivos();
        // if (!activos) return <SLoad />

        if (activos) {
            var total_pedidos = 0;
            Object.values(activos ?? {}).map(a => {
                total_pedidos += 1;
            })
            if (this.state.total_pedidos != total_pedidos) {
                this.state.total_pedidos = total_pedidos;
                console.log("EL TOTAL", this.state.total_pedidos)
            }
        }
        console.log("EL ENTRO RENDER", this.state.total_pedidos, activos)
        return <SText fontSize={18} color={STheme.color.secondary} bold>{`Pedidos pendientes de entregar ${this.state.total_pedidos}`}</SText>
    }
    render() {

        return <SView col={"xs-12"} center backgroundColor={STheme.color.accent}>
            <SHr height={16} />
            {this.getContent()}
            <SHr height={16} />
        </SView>
    }
}