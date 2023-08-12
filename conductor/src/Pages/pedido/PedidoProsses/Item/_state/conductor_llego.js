import React, { Component } from 'react';
import { Linking } from 'react-native';

import { SButtom, SDate, SHr, SIcon, SImage, SInput, SList, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Container from '../../../../../Components/Container';
import PButtom from '../../../../../Components/PButtom';
import Model from '../../../../../Model';
import SSocket from 'servisofts-socket'
import BarraCargando from '../../../../../Components/BarraCargando';
import Detalle from '../Detalle';
import TopBar from '../../../../../Components/TopBar';
import BtnNavegar from '../../../../../Components/BtnNavegar';
import Pedido from '../../../../../Components/Pedido';
export default class conductor_llego extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOnPress() {
        this.setState({ loading: true })
        Model.pedido.Action.action("entregar", this.props.data.key, {}).then((resp) => {
            this.setState({ loading: false })
            console.log(resp);
            this.props.parent.repaint();
        }).catch(e => {
            this.setState({ loading: false })
        })

    }
    renderUsuario() {
        const { key_usuario } = this.props.data;
        let data = this.props.data;

        // console.log(JSON.stringify(this.props.data) + " aqui")
        var usuario = Model.usuario.Action.getByKey(key_usuario);
        return <SView col={"xs-12"} center card >
            <SView col={"xs-12"} center row>
                {/* <SHr height={8} /> */}
                <SView width={60} height={60} style={{ padding: 8 }}>
                    <SView flex height card style={{ borderRadius: 8, overflow: "hidden" }}>
                        <SImage enablePreview src={SSocket.api.root + "usuario/" + key_usuario} style={{ resizeMode: "cover" }} /></SView>
                </SView>
                <SView flex>
                    {!usuario ? <SLoad /> : <>
                        <SText bold fontSize={16}>{usuario?.Nombres} {usuario?.Apellidos}</SText>
                        <SText fontSize={14}>{usuario?.Telefono}</SText>
                        <SText fontSize={12}>Ref.: {this.props.data?.direccion?.referencia}</SText>
                    </>}

                </SView>

            </SView>
            <SHr height={8} />

            <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }} height={50}>
                <BtnNavegar latLng={{
                    latitude: data?.direccion?.latitude,
                    longitude: data?.direccion?.longitude,
                }}><SView><SIcon name='IMapa' width={35} /></SView></BtnNavegar>
                <SView width={25} />
                <SView onPress={() => {
                    let numero = usuario?.Telefono;
                    if (!numero || numero == "undefined") {
                        SPopup.alert("No se encontro el numero de telefono.");
                        Model.usuario.Action.getByKey(data.key_usuario);
                        Model.usuario.Action._getReducer().data = null
                        return;
                    }

                    Linking.openURL(`tel:${numero}`);
                }}><SIcon name='ILlamar' width={30} /></SView>
                <SView width={25} />
                <Pedido.Chat data={data}><SView><SIcon name='IChat' width={30} /></SView></Pedido.Chat>
            </SView>
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

    render() {
        return (
            <SPage hidden header={this.renderInstrucciones()}>

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
                    <Detalle data={this.props.data} interline={10} padding={8} />

                    <SHr height={50} />
                    <PButtom loading={this.state.loading} onPress={this.handleOnPress.bind(this)}>Confirmar entrega</PButtom>
                    <SHr height={50} />
                    {/* <SText>{JSON.stringify(this.props.data, "\n", "\t")}</SText> */}
                </Container>
            </SPage>
        );
    }
}
