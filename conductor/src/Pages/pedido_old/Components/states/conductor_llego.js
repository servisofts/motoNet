import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SImage, SInput, SList, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Container from '../../../../Components/Container';
import PButtom from '../../../../Components/PButtom';
import Model from '../../../../Model';
import SSocket from 'servisofts-socket'
import BarraCargando from '../../../../Components/BarraCargando';
import Detalle from '../Detalle';
import TopBar from '../../../../Components/TopBar';
export default class conductor_llego extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOnPress() {
        Model.pedido.Action.action("entregar", this.props.data.key, {}).then((resp) => {
            console.log(resp);
        })

    }
    renderUsuario() {
        const { key_usuario } = this.props.data;
        // console.log(JSON.stringify(this.props.data) + " aqui")
        var usuario = Model.usuario.Action.getByKey(key_usuario);
        return <SView col={"xs-12"} center card row>
            <SHr height={8} />
            <SView width={60} height={60} style={{ padding: 8 }}>
                <SView flex height card style={{ borderRadius: 8, overflow: "hidden" }}>
                    <SImage enablePreview src={SSocket.api.root + "usuario/" + key_usuario} style={{ resizeMode: "cover" }} /></SView>
            </SView>
            <SView flex >
                <SText bold fontSize={16}>{usuario?.Nombres} {usuario?.Apellidos}</SText>
                <SText fontSize={14}>{usuario?.Telefono}</SText>
                <SText fontSize={12}>Ref.: {this.props.data?.direccion?.referencia}</SText>
            </SView>
            <SHr height={8} />
        </SView>
    }


    renderPedido() {
        const { restaurante, cantidad, fecha, horario } = this.props.data;
        // var usuario = Model.usuario.Action.getByKey(key_usuario);
        return <SView col={"xs-12"} center card row height={120}>
            <SView width={80} height={80} style={{ padding: 8 }}>
                <SView flex height card style={{ borderRadius: 8, overflow: "hidden" }}>
                    <SImage enablePreview src={SSocket.api.root + "restaurante/" + restaurante.key} style={{ resizeMode: "cover" }} /></SView>
            </SView>
            <SView flex >
                <SText bold fontSize={16}>{restaurante.nombre}</SText>
                <SText fontSize={12}>{new SDate(fecha, "yyyy-MM-dd").toString("dd de MONTH")}  {horario.hora_inicio} - {horario.hora_fin}</SText>
            </SView>
            <SView width={100} center>
                <SText fontSize={14} bold>{cantidad}</SText>
                <SText fontSize={12} color={STheme.color.lightGray}>Cantidad</SText>
            </SView>
        </SView>
    }


    renderInstrucciones() {
        return <SView col={"xs-12"} center height={70} backgroundColor='#96BE00'>
            <SView col={"xs-11"} center>
                <SText center bold fontSize={14} color={STheme.color.white}>Entrega el pedido al cliente y confirma la entrega</SText>
                <SHr height={20} />
                <BarraCargando />
            </SView>
        </SView>
    }

    // getTipoPago() {
    //     var tipo = "Pago online";
    //     if (this.props.data.tipo_pago) {
    //         var efectivo = this.props.data.tipo_pago.find(o => o.type == "efectivo");
    //         if (efectivo) {
    //             tipo = "Efectivo"
    //         }
    //     }
    //     return tipo;
    // }
    
    // renderDetallePago() {
    //     console.log(this.props.data)
    //     const { payment_type, precio, cantidad, delivery } = this.props.data;
    //     let delivery_incentivos = delivery;
    //     if (this.props.data.incentivos) {
    //         this.props.data.incentivos.map(a => delivery_incentivos += a.monto)
    //     }

    //     return <SView col={"xs-12"} center card style={{
    //         padding: 8
    //     }}>
    //         <SView row col={"xs-12"}>
    //             <SText col={"xs-6"}>Método de pago</SText>
    //             <SText col={"xs-6"} style={{ alignItems: 'flex-end', }}>{this.getTipoPago()}</SText>
    //         </SView>
    //         <SHr />
    //         <SHr />
    //         <SView row col={"xs-12"}>
    //             <SText col={"xs-6"}>{cantidad} x Tapekes</SText>
    //             <SText col={"xs-6"} style={{ alignItems: 'flex-end', }}>Bs. {SMath.formatMoney(cantidad * precio)}</SText>
    //         </SView>
    //         <SHr />
    //         <SHr />
    //         <SView row col={"xs-12"}>
    //             <SText col={"xs-6"}>Delivery</SText>
    //             <SText col={"xs-6"} style={{ alignItems: 'flex-end', }} >Bs. {SMath.formatMoney(delivery_incentivos)}</SText>
    //         </SView>
    //         <SHr />
    //         <SHr height={1} color={STheme.color.lightGray} />
    //         <SHr />
    //         <SView row col={"xs-12"}>
    //             <SText col={"xs-6"}></SText>
    //             <SText col={"xs-6"} style={{ alignItems: 'flex-end', }} bold>Bs. {SMath.formatMoney(delivery_incentivos + (precio * cantidad))}</SText>
    //         </SView>
    //     </SView>
    // }
    render() {
        return (
            <SPage preventBack disableScroll hidden header={<TopBar type={"usuario"} />} >
                {this.renderInstrucciones()}
                <Container>
                    {/* <SHr height={50} /> */}

                    <SHr height={30} />
                    <SText col={"xs-12"}>Detalle del pedido:</SText>
                    <SHr />
                    {this.renderPedido()}
                    <SHr height={20} />
                    <SText col={"xs-12"}>Detalle del cliente:</SText>
                    <SHr />
                    {this.renderUsuario()}
                    <SHr height={50} />
                    <SText col={"xs-12"}>Detalle del pago:</SText>
                    <SHr />
                    {/* {this.renderDetallePago()} */}
                    <Detalle data={this.props.data} interline={10} padding={8}/>
                   
                    <SHr height={50} />
                    <PButtom onPress={this.handleOnPress.bind(this)}>Confirmar entrega</PButtom>
                    <SHr height={50} />
                    {/* <SText>{JSON.stringify(this.props.data, "\n", "\t")}</SText> */}
                </Container>
            </SPage >
        );
    }
}
