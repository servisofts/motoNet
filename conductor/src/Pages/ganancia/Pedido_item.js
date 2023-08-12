import React, { Component } from 'react';
import { SDate, SHr, SIcon, SMath, SPage, SText, STheme, SView } from 'servisofts-component';

class Pedido_item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { state, precio, fecha_on, comision_delivery, cantidad, key_pedido, horario, delivery, tipo_pago } = this.props.data;
        let tipo_pago_str = "Online";
        const diasSemana = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
        if (tipo_pago) {
            if (tipo_pago.find(a => a.type == "efectivo")) {
                tipo_pago_str = "Efectivo";
            }
        }
        return <SView col={"xs-12"} card row style={{
            padding: 9, borderRadius: 8
        }} center>
            <SView col={"xs-2.2"}
                height
                center
                style={{ borderRightColor: "#DADADA", borderRightWidth: 2 }}
            >
                <SText fontSize={17} color={STheme.color.gray} >
                    {diasSemana[new SDate(fecha_on).getDayOfWeek()]}
                </SText>
                <SText fontSize={14} color={STheme.color.gray}>
                    {new SDate(fecha_on).toString("dd/MM")}
                </SText>
                <SText fontSize={10.5} color={STheme.color.gray}>
                    {new SDate(fecha_on).toString("hh:mm:ss")}
                </SText>
            </SView>
            <SView col={"xs-3.5"} center
                height
                style={{ borderRightColor: "#DADADA", borderRightWidth: 2 }}
            >
                <SText bold fontSize={11} color={STheme.color.primary}>DELIVERY</SText>
                <SText fontSize={16} bold>{"Bs."} {SMath.formatMoney(delivery)}</SText>
            </SView>
            <SView col={"xs-3.5"} center
                height
                style={{ borderRightColor: "#DADADA", borderRightWidth: 2 }}
            >
                <SText bold fontSize={11} color={STheme.color.primary}>COMISIÓN</SText>
                <SText bold fontSize={16} color={STheme.color.danger}> - Bs. {SMath.formatMoney(comision_delivery ?? 0)}</SText>
            </SView>
            <SView col={"xs-2.8"} style={{ alignItems: "flex-end" }} height center>
                <SIcon name={(delivery > 0 ? "Idelivery" : "Irecoger")} width={30} fill={STheme.color.lightGray} />
                <SText bold fontSize={10.5} color="#96BE00"
                    style={{
                        textTransform: "uppercase"
                    }}
                >
                    {state}
                </SText>
                <SView style={{ alignItems: "flex-end" }}>
                    <SView col={"xs-12"} row center>
                        <SIcon name='Ipago' height={9} width={14} fill={STheme.color.lightGray} />
                        <SView width={5} />
                        <SText fontSize={10}
                            style={{
                                textTransform: "uppercase",
                                color: STheme.color.gray
                            }}
                        >{tipo_pago_str}</SText>
                    </SView>
                </SView>
            </SView>
            <SView flex />
            {/* <SText fontSize={10}>{horario?.porcentaje_comision}%</SText>
            <SHr />
            <SText bold fontSize={14}
                style={{
                    textTransform: "capitalize"
                }}
            >
                {state}
            </SText>
            <SView flex />
            <SText bold>{"Bs."} {SMath.formatMoney(precio)}</SText>
            <SView width={10} />
            <SText bold color={STheme.color.danger}> - {SMath.formatMoney(comision_restaurante ?? 0)}</SText> */}
        </SView>
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(Pedido_item);
export default (Pedido_item);