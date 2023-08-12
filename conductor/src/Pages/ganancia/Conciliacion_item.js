import React, { Component } from 'react';
import { SDate, SHr, SIcon, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

class Conciliacion_item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { state, key, fecha_cierre, total_pagado } = this.props.data;
       
        return <SView col={"xs-12"} card row style={{
            padding: 9, borderRadius: 8
        }} center
        onPress={()=>{
            // SNavigation.navigate();
            SNavigation.navigate("/ganancia/historial/detalle",  { pk: key });
        }}
        >

            <SView col={"xs-6"} center
                height
                style={{ borderRightColor: "#DADADA", borderRightWidth: 2 }}
            >
                <SText bold fontSize={11} color={STheme.color.primary}>FECHA CIERRE</SText>
                <SText fontSize={16} bold color={STheme.color.gray}> {new SDate(fecha_cierre).toString("dd/MM/yyyy")}</SText>
            </SView>
            <SView col={"xs-6"} center
                height
            >
                <SText bold fontSize={11} color={STheme.color.primary}>MONTO PAGADO</SText>
                <SText bold fontSize={16} color={STheme.color.text}>  Bs. {SMath.formatMoney(total_pagado ?? 0)}</SText>
            </SView>
            <SView flex />
        </SView>
    }
}
// const initStates = (state) => {
//     return { state }
// };
// export default connect(initStates)(Pedido_item);
export default (Conciliacion_item);