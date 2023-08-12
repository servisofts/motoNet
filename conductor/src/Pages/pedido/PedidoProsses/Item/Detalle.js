import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SImage, SInput, SList, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getTipoPago() {
        var tipo = "cargando...";
        if (this.props.data.tipo_pago) {
            tipo = "Online";
            var efectivo = this.props.data.tipo_pago.find(o => o.type == "efectivo");
            if (efectivo) {
                tipo = "Efectivo"
            }
        }
        return tipo;
    }

    renderDetallePago() {
        const { payment_type, precio, cantidad, delivery } = this.props.data;
        let delivery_incentivos = delivery;
        if (this.props.data.incentivos) {
            this.props.data.incentivos.map(a => delivery_incentivos += a.monto)
        }

        return <SView col={"xs-12"} center card style={{
            padding: this.props.padding
        }}

        >
            <SView row col={"xs-12"} >
                <SText col={"xs-8"} fontSize={12}>Método de pago</SText>
                <SText col={"xs-4"} fontSize={12} style={{ alignItems: 'flex-end', }}>{this.getTipoPago()}</SText>
            </SView>
            <SHr height={this.props.interline} />
            <SView row col={"xs-12"}>
                <SText col={"xs-6"} fontSize={12}>{cantidad} x Tapekes</SText>
                <SText col={"xs-6"} fontSize={12} style={{ alignItems: 'flex-end', }}>Bs. {SMath.formatMoney(cantidad * precio)}</SText>
            </SView>
            <SHr height={this.props.interline} />
            <SView row col={"xs-12"}>
                <SText col={"xs-6"} fontSize={12}>Delivery</SText>
                <SText col={"xs-6"} fontSize={12} style={{ alignItems: 'flex-end', }} >Bs. {SMath.formatMoney(delivery_incentivos)}</SText>
            </SView>
            <SHr height={this.props.interline} />
            <SHr height={1} color={STheme.color.lightGray} />
            <SHr height={this.props.interline} />
            <SView row col={"xs-12"}>
                <SText col={"xs-6"}></SText>
                <SText col={"xs-6"} fontSize={12} style={{ alignItems: 'flex-end', }} bold>Bs. {SMath.formatMoney(delivery_incentivos + (precio * cantidad))}</SText>
            </SView>
        </SView>
    }

    render() {
        return this.renderDetallePago()
    }
}
