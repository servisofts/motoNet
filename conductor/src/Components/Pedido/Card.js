import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraCargando from '../BarraCargando';
export type PedidoCardPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<PedidoCardPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.data)
    }
    _buildMessage(pedido) {
        switch (pedido.state) {
            case "pagado":
                return "Esperando la hora de entrega."
            case "pago_en_proceso":
                return "Pago en proceso."
            default:
                return pedido.state;
        }
    }

    render() {
        var { key, state, fecha, horario, restaurante } = this.props.data;
        return (
            <SView
                width={320}
                // col={"xs-11"}
                height={124} style={{
                    borderRadius: 8,
                    backgroundColor: STheme.color.primary,
                    borderColor: "#AAAAAA22",
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderBottomWidth: 3,
                    // marginTop: 8,
                    overflow: "hidden",
                    padding: 8,
                }}
                activeOpacity={0.9}
                onPress={!this.props.onPress ? null : this.handlePress.bind(this)}>
                <SText color={STheme.color.secondary} bold>{restaurante.nombre}</SText>
                <SHr height={4} />
                <SText fontSize={12} color={STheme.color.secondary}>{this._buildMessage(this.props.data)}</SText>
                <SView flex />
                <SHr />
                <SView row >
                    <SText fontSize={12} color={"white"} >{new SDate(fecha, "yyyy-MM-dd").toString("dd de MONTH")}</SText>
                    <SView width={8} />
                    <SText fontSize={12} color={"white"} >{horario.hora_inicio} - {horario.hora_fin}</SText>
                </SView>
                <SHr />
                <BarraCargando />
                <SView col={"xs-12"} center>
                    <SHr height={8} />
                    <SText color={STheme.color.secondary} fontSize={11}>{"Ver los detalles > "}</SText>
                    {/* <SHr height={8} /> */}
                </SView>
                <SView style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    width: 40,
                    height: 40,
                }}>
                    <SIcon name={"Menu"} fill={STheme.color.secondary} />
                </SView>
            </SView >

        );
    }
}
export default (index);