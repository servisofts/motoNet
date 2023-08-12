import React, { Component } from 'react';
import { SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';

type propsType = {

}

export default class DetallePedido extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return <SView col={"xs-12  "} center row style={{ backgroundColor: STheme.color.white }}>
            <SView col={"xs-11"} row center>
                <SView col={"xs-12"}>
                    <SHr height={15} />
                    <SText fontSize={18} style={{ fontWeight: "bold" }}>Detalle pedido</SText>
                    <SHr height={15} />
                </SView>
                <SView col={"xs-12"} row backgroundColor={"transparent"} >
                    <SView center width={85} height={85} backgroundColor={"#eee"} style={{ borderRadius: 8, overflow: 'hidden', }}>

                        <SImage src={SSocket.api.root + "restaurante/" + this.props?.data?.restaurante?.key} style={{
                            resizeMode: "cover"
                        }} />
                        {/* <SImage src={`${SSocket.api.root}restaurante/${this.props?.data?.restaurante?.key}`} style={{ width: "100%", resizeMode: "cover" }} /> */}
                    </SView>
                    <SView row flex height border={'transparent'} >
                        <SView width={4} />
                        <SView flex row >
                            <SView col={"xs-12"} border={'transparent'}>
                                <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.props.data?.restaurante?.nombre}</SText>
                            </SView>
                            <SHr height={6} />
                            <SView col={"xs-6"} style={{ justifyContent: 'flex-start', }}>
                                <SText fontSize={14} color={STheme.color.primary} bold>Precio</SText>
                                <SHr height={5} />
                                <SText fontSize={20} bold>Bs. {SMath.formatMoney(this.props?.data?.pack?.precio ?? 0)}</SText>
                            </SView>
                            <SView col={"xs-6"} center row>
                                <SView col={"xs-12"} center>
                                    <SText fontSize={14} color={STheme.color.primary} >Cantidad</SText>
                                </SView>
                                <SHr height={5} />
                                <SView col={"xs-12"} center   >
                                    <SView col={"xs-6"} center style={{ height: 40, backgroundColor: STheme.color.card, borderRadius: 6 }}>
                                        <SText fontSize={14}     >{this.props.data?.cantidad ?? 0}</SText>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                </SView>

                <SHr height={15} />
                <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }} />
                <SHr height={18} />
                <SText>{!this.props.data.delivery ? "Recoger del lugar." : "Entrega por Tapeke."}</SText>
                <SHr height={18} />
            </SView>
        </SView>
    }
}