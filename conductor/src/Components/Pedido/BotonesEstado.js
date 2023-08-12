import React, { Component } from 'react';
import { SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BarraCargando from '../BarraCargando';
import Restaurante from '../Restaurante';
export type BotonesEstadoPropsType = {
    data: any,
    onPress?: (obj) => {},
}
class index extends Component<BotonesEstadoPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;
        this.props.onPress(this.props.data)
    }

    render_buttom({ label, icon, loading, complete }) {
        return <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center>
            <SHr height={8} />
            <SView width={48} height={48}>
                <SIcon name={icon} fill={STheme.color.primary} />
            </SView>
            <SHr height={8} />
            <SView col={"xs-12"} height={10} backgroundColor={STheme.color.card} style={{ borderRadius: 16, overflow: 'hidden', }} >
                {!!loading ? <BarraCargando height={8} /> : null}
                {!!complete ? <SView col={"xs-12"} height backgroundColor={STheme.color.primary} /> : null}
            </SView>
            <SHr height={4} />
            <SText color={STheme.color.primary} style={{ fontSize: 12 }} bold>{label}</SText>
        </SView>
    }
    getBotones() {
        const state = this.props?.data?.state;
        var confirmado = false;
        var preparacion = false;
        var delivery = false;

        if (state == "listo" || state == "buscando_conductor" || state == "confirmando_conductor") {
            confirmado = true;
        }
        if (state == "esperando_conductor" || state == "entregado_conductor" || state == "conductor_llego") {
            console.log(state)
            confirmado = true;
            preparacion = true;
        }
        if (state == "entregado") {
            confirmado = true;
            preparacion = true;
            delivery = true;
        }
        return (
            <SView col={"xs-12  "} height={90} row center >
                {/* <SHr width={10} height={5} color={STheme.color.text} /> */}
                {this.render_buttom({ label: "Confirmación", icon: "PedConfirmacion", loading: !confirmado, complete: confirmado })}
                <SView width={5} height />
                {this.render_buttom({ label: "Preparación", icon: "PedPreparacion", loading: !preparacion && confirmado, complete: preparacion })}
                <SView width={5} height />
                {this.render_buttom({ label: "Delivery", icon: "PedDelivery", loading: !delivery && preparacion, complete: delivery })}

            </SView>
        );
    }


    popupConfirmacion() {
        var INSTACE = this;
        return <SView
            style={{ width: "100%", maxWidth: 365, height: 300, borderRadius: 30, padding: 8 }}
            center
            withoutFeedback
            backgroundColor={STheme.color.background}
        >
            <SView flex />
            <SView col={"xs-12  "} center row style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SView col={"xs-12"}>
                        <SHr height={15} />
                        <SText fontSize={18} style={{ fontWeight: "bold" }}>Detalle pedido</SText>
                        <SHr height={15} />
                    </SView>
                    <SView col={"xs-12"} row backgroundColor={"transparent"} >
                        <SView center width={85} height={85} backgroundColor={"#eee"} style={{ borderRadius: 8, overflow: 'hidden', }}>
                            <Restaurante.FotoPerfil data={this.props.data.restaurante} style={{ resizeMode: "cover" }} />
                        </SView>
                        <SView row flex height border={'transparent'} >
                            <SView width={4} />
                            <SView flex row >
                                <SView col={"xs-12"} border={'transparent'}>
                                    <SText color={STheme.color.text} fontSize={14} style={{ fontWeight: "bold" }}  >{this.props.data?.restaurante?.nombre}</SText>
                                </SView>
                                <SHr height={6} />
                                <SView col={"xs-6"} style={{ justifyContent: 'flex-start', }}>
                                    <SText fontSize={14} color={STheme.color.primary} bold> Precio</SText>
                                    <SHr height={5} />
                                    {/* <SText fontSize={20}   bold>Bs. {SMath.formatMoney(this.props?.data?.pack?.precio ?? 0)}</SText> */}
                                </SView>
                                <SView col={"xs-6"} center row>
                                    <SView col={"xs-12"} center>
                                        <SText fontSize={14} color={STheme.color.primary} >Cantidad</SText>
                                    </SView>
                                    <SHr height={5} />
                                    <SView col={"xs-12"} center   >
                                        <SView col={"xs-6"} center style={{ height: 40, backgroundColor: STheme.color.card, borderRadius: 6 }}>
                                            <SText fontSize={14}     >  {this.props.data?.cantidad ?? 0}</SText>
                                        </SView>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                    </SView>

                    <SHr height={15} />
                    {/* <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView> */}
                    {/* <SHr height={18} /> */}
                </SView>
            </SView>

            {/* <SView col={"xs-12"} style={{ alignItems: "center", }}>
                <SView row col={"xs-11"}>
                 </SView>
            </SView> */}

            <SView flex />
            <SView col={"xs-11"} center>
                <SText color={STheme.color.darkGray} style={{ fontSize: 12 }} center >IMPORTANTE: Por favor tome en cuenta que no se podrá cancelar el pedido posteriormente.</SText>
            </SView>
            <SHr />
            <SHr />
        </SView>
    }

    render() {

        return <SView col={"xs-12"} center >
            <SView col={"xs-12 md-7"} row center style={{ borderRadius: 12, }}>
                <SHr height={10} />
                <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={STheme.color.gray} center
                    onPress={() => {
                        SPopup.open({ key: "confirmar", content: this.popupConfirmacion() });
                    }} />
                <SHr height={5} />
                {/* <SView col={"xs-3.5"} style={{ borderBottomWidth: 3, }} border={'transparent'} center  /> */}
                <SText col={"xs-12"} color={STheme.color.text} style={{ fontSize: 40 }} bold center>{this.props.data.horario.hora_inicio} - {this.props.data.horario.hora_fin}</SText>
                {/* <SText col={"xs-12"} color={STheme.color.lightGray} style={{ fontSize: 12 }} bold center>{this.props.data.state}</SText> */}
                {/* <SText col={"xs-12"} color={STheme.color.text} style={{ fontSize: 12 }} bold center>Esperando la hora de comer.</SText> */}
                {this.getBotones()}
                <SHr />
            </SView >
        </SView >
    }
}
export default (index);