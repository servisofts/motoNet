import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SInput, SList, SLocation, SMapView, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BarraCargando from '../../../../Components/BarraCargando';
import Marker from '../../../../Components/Marker';
import PButtom from '../../../../Components/PButtom';
import Model from '../../../../Model';
import SSocket from 'servisofts-socket';
import Detalle from '../Detalle';
import Validator from '../../../../Validator';

export default class confirmando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOnPress = () => {
        //  Se llama para confirmar el pedido
        Model.pedido.Action.action("confirmar_conductor", this.props.data.key, {}).then(e => {
            console.log(e);
            let data = e.data;
            if (e.data.state != "esperando_conductor") {
                SPopup.alert("Lo sentimos al parecer no llegaste a tiempo o el viaje ya no esta disponible.");
                SNavigation.reset("/");
                return;
            }
            if (e.data.key_conductor != Model.usuario.Action.getKey()) {
                SPopup.alert("Lo sentimos al parecer otro conductor ya confirmo el viaje.");
                Model.pedido.Action.CLEAR();
                SNavigation.reset("/");
                e.preventDefault = true;
                return;
            }
        }).catch(e => {
            console.error(e);
        })
    }
    handleCancelar = () => {
        //  Se llama para confirmar el pedido
        Model.pedido.Action.action("cancelar", this.props.data.key, {}).then((resp) => {
            Model.pedido.Action.CLEAR();
            // SNavigation.replace("/");
            // Validator.validate();
            // SNavigation.reset("/");

        })
    }
    getDistance = (lat1, lon1, lat2, lon2) => {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137; //Radio de la tierra en km 
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //aquí obtienes la distancia en metros por la conversion 1Km =1000m
        var d = R * c * 1000;
        return d;
    }
    getDistancia() {
        console.log(this.props.data)
        let distStr = "";
        let distancia = this.getDistance(this.props.data.direccion.latitude, this.props.data.direccion.longitude, this.props.data.restaurante.latitude, this.props.data.restaurante.longitude)
        if (distancia > 1000) {
            distStr = parseFloat(distancia / 1000).toFixed(1) + " Km."
        } else {
            distStr = parseFloat(distancia).toFixed(0) + " Metros"
        }
        return <SView col={"xs-12"} row height={40} >
            <SHr height={5} />
            <SView col={"xs-8"}>
                <SText fontSize={12}>{this.props.data.restaurante.direccion}</SText>
            </SView>
            <SView col={"xs-4"} style={{ alignItems: "flex-end" }} >
                <SText bold fontSize={15}> {distStr}</SText>
            </SView>
        </SView>
    }

    renderButtoms() {
        return <SView col={"xs-12"} row center >
            <SView col={"xs-5.5"} padding={4} style={{ alignItems: "flex-end" }}>
                <SView width={140} height={40} center
                    onPress={this.handleCancelar}
                    style={{
                        backgroundColor: "#DF2732",
                        borderRadius: 10
                    }}>
                    <SText bold color={STheme.color.white}>RECHAZAR</SText>
                </SView>
                {/* <PButtom secondary onPress={this.handleCancelar}>RECHAZAR</PButtom> */}
            </SView>
            <SView col={"xs-1"} ></SView>
            <SView col={"xs-5.5"} padding={4} style={{ alignItems: "flex-start" }} >
                <SView width={140} height={40} center
                    onPress={this.handleOnPress}
                    style={{
                        backgroundColor: "#99CC00",
                        borderRadius: 10
                    }}>
                    <SText bold color={STheme.color.white}>CONFIRMAR</SText>
                </SView>
                {/* <PButtom onPress={this.handleOnPress}>CONFIRMAR</PButtom> */}
            </SView>
        </SView>
    }
    render() {
        var data = this.props.data;
        const { restaurante, direccion } = data;
        return (
            <SPage hidden disableScroll  >
                <SView col={"xs-12"} center height>
                    <SView col={"xs-12"} height={70} center backgroundColor='#96BE00'>
                        <SText fontSize={20} bold color={STheme.color.white}>Confirmar pedido</SText>
                        <SHr height={16} />
                        <SView col={"xs-11"}>
                            <BarraCargando />
                        </SView>
                    </SView>
                    <SView col={"xs-12"} flex>
                        <SMapView initialRegion={{
                            latitude: (direccion.latitude + restaurante.latitude) / 2,
                            longitude: (direccion.longitude + restaurante.longitude) / 2,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03
                        }}>
                            <SMapView.SMarker latitude={direccion.latitude} longitude={direccion.longitude} />
                            <Marker latitude={restaurante.latitude} longitude={restaurante.longitude} data={restaurante} />
                        </SMapView>
                    </SView>
                    <SView col={"xs-12"}
                        style={{
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            overflow: "hidden",
                            alignItems: "center",
                            backgroundColor: STheme.color.white,
                            top: -22
                        }}
                    // height={250}
                    >
                        {/* <SHr height={25} /> */}
                        <SView col={"xs-11"} center style={{
                            // overflow:"hidden"
                        }}>
                            <SHr height={8} />
                            <SView height={10} col={"xs-12"} center
                            // onPress={() => {
                            // }}
                            >
                                {/* <SIcon name='Idetalle' height={10} /> */}
                                <SView col={"xs-4"} style={{ borderBottomWidth: 2, }} border={STheme.color.lightGray} center />
                            </SView>
                            <SView col={"xs-12"} row height={120} center>
                                <SView width={84} center height={84} style={{
                                    resizeMode: "cover"
                                }}>
                                    <SImage src={SSocket.api.root + 'restaurante/' + data.restaurante.key}
                                        style={{ borderRadius: 8, overflow: "hidden" }} enablePreview />
                                </SView>
                                <SView width={10} />
                                <SView flex row >
                                    <SHr height={4} />
                                    <SView col={"xs-12"} row >
                                        <SText bold fontSize={15}>{data.restaurante.nombre}</SText>
                                        <SHr height={0.5} />
                                        <SText fontSize={12} color={STheme.color.lightGray}>{data.horario.hora_inicio} - {data.horario.hora_fin}</SText>
                                        <SHr height={1} />
                                    </SView>
                                    {/* <SView col={"xs-12"} row>
                                        <SView row >
                                            <SView width={100} >
                                                <SText color={STheme.color.primary}>Delivery</SText>
                                                <SText fontSize={20} bold>{parseFloat(this.props.data.delivery).toFixed(0)} Bs.</SText>
                                            </SView>
                                        </SView>
                                        <SView row center>
                                            <SView width={100} center>
                                                <SText color={STheme.color.primary}>Cantidad</SText>
                                                <SView width={85} height={30} center style={{
                                                    borderRadius: 10,
                                                    backgroundColor: STheme.color.card
                                                }}>
                                                    <SText bold fontSize={16}>{data.cantidad}</SText>
                                                </SView>
                                            </SView>
                                        </SView>
                                    </SView> */}
                                    <Detalle data={this.props.data} interline={1} padding={5} />
                                </SView>


                            </SView>
                            <SHr height={10} />
                            <SView col={"xs-12"} style={{ borderBottomColor: "#D7D8D9", borderBottomWidth: 1 }} height={8} />
                            {this.getDistancia()}

                        </SView>
                        {this.renderButtoms()}
                        {/* <SHr height={16} /> */}

                    </SView>
                </SView>
            </SPage >
        );
    }
}
