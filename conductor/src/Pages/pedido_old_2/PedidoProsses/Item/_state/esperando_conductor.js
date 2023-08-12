import React, { Component } from 'react';
import { Linking } from 'react-native';
import { SButtom, SHr, SIcon, SImage, SInput, SList, SMapView, SNavigation, SPage, SPopup, SText, STheme, SView, SLoad } from 'servisofts-component';
import Model from '../../../../../Model';
import SSocket from 'servisofts-socket';
import BtnNavegar from '../../../../../Components/BtnNavegar';
import Detalle from '../Detalle';
import QR from '../QR';

export default class esperando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        var data = this.props.data;
        let usuario = Model.usuario.Action.getByKey(data.key_usuario) ?? {};
        return (<SView col={"xs-12"} center style={{ overflow: "hidden", borderRadius: 8 }} backgroundColor={STheme.color.accent}>
            <SView col={"xs-12"} height={50} center >
                <SText bold fontSize={16} color={STheme.color.white} center>Dirígete a recoger el pedido al restaurante</SText>
                <SHr height={8} />
                <SView col={"xs-11"} center>
                    {/* <BarraCargando /> */}
                </SView>
            </SView>
            <SView col={"xs-12"} center
                style={{
                    // borderTopLeftRadius: 30,
                    // borderTopRightRadius: 30,
                    overflow: "hidden",
                    backgroundColor: STheme.color.white,
                }}
            >
                <SHr h={4} />
                <SView col={"xs-11"}>
                    <SHr height={4} />
                    <SText bold col={"xs-12"}>Para: {usuario["Nombres"] ?? ""} {usuario["Apellidos"] ?? ""}</SText>
                    <SHr />
                    <Detalle data={this.props.data} interline={1} padding={5} />
                    <SHr h={8} />
                    <SView col={"xs-12"} row flex>
                        {/* <SHr height={10} /> */}
                        <SView col={"xs-6"} flex >
                            
                            <SHr height={5} />
                            <SText fontSize={12} color={STheme.color.lightGray} center>Recuerda que el restaurante debe escanear el QR para entregarte el pedido.</SText>
                            <SHr height={5} />
                            <SView center row>
                                <SText>Click en QR</SText>
                                <SView width={5} />
                                <SIcon name='ArrowRight' fill={STheme.color.primary} width={25} />
                            </SView>
                        </SView>
                        <SView col={"xs-6"} center style={{
                            alignItems:"flex-end"
                        }}>
                            <SView center>
                                <SView width={110} card height={110} col={"xs-12"} center>
                                    <QR data={data} />
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                </SView>
                <SHr height={4} />
            </SView>
        </SView>
        );
    }
}
