import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SImage, SInput, SList, SLocation, SMapView, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BarraCargando from '../../../../../Components/BarraCargando';
import Marker from '../../../../../Components/Marker';
// import PButtom from '../../../../../Components/PButtom';
import Model from '../../../../../Model';
import SSocket from 'servisofts-socket';
import Detalle from '../Detalle';
import BarraTiempo from '../../../../../Components/BarraTiempo';
// import Detalle from '../Detalle';
// import Validator from '../../../../Validator';

export default class confirmando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleOnPress = () => {
        //  Se llama para confirmar el pedido
        Model.pedido.Action.action("confirmar_conductor", this.props.data.key, {}).then(e => {
            let data = e.data;
            if (e.data.state != "esperando_conductor") {
                SPopup.alert("Lo sentimos al parecer no llegaste a tiempo o el viaje ya no esta disponible.");
                // SNavigation.reset("/");
                return;
            }
            if (e.data.key_conductor != Model.usuario.Action.getKey()) {
                SPopup.alert("Lo sentimos al parecer otro conductor ya confirmo el viaje.");
                // Model.pedido.Action.CLEAR();
                // SNavigation.reset("/");
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
            // Model.pedido.Action.CLEAR();
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
        let distStr = "";
        let distancia = this.getDistance(this.props.data.direccion.latitude, this.props.data.direccion.longitude, this.props.data.restaurante.latitude, this.props.data.restaurante.longitude)
        if (distancia > 1000) {
            distStr = parseFloat(distancia / 1000).toFixed(1) + " Km."
        } else {
            distStr = parseFloat(distancia).toFixed(0) + " Metros"
        }
        return <SView col={"xs-12"} row >
            <SHr height={5} />
            <SView col={"xs-12"} center>
                {/* {/* <SText fontSize={12} center>{this.props.data.restaurante.direccion}</SText> */}
                <SHr h={4} />
                <SText fontSize={12} center>{this.props.data.direccion.direccion}</SText>
            </SView>
            <SHr />
            <SView col={"xs-12"} center>
                <SText fontSize={12} center>{distStr} del partner al cliente.</SText>
                {/* <SText bold fontSize={15}> {distStr}</SText> */}
            </SView>
        </SView>
    }

    renderButtoms() {
        return <SView col={"xs-12"} row center >
            <SView col={"xs-5.5"} padding={4} style={{ alignItems: "flex-end" }}>
                <SView width={120} height={35} center
                    onPress={this.handleCancelar}
                    style={{
                        backgroundColor: "#DF2732",
                        borderRadius: 8
                    }}>
                    <SText bold color={STheme.color.white}>RECHAZAR</SText>
                </SView>
                {/* <PButtom secondary onPress={this.handleCancelar}>RECHAZAR</PButtom> */}
            </SView>
            <SView col={"xs-1"} ></SView>
            <SView col={"xs-5.5"} padding={4} style={{ alignItems: "flex-start" }} >
                <SView width={120} height={35} center
                    onPress={this.handleOnPress}
                    style={{
                        backgroundColor: "#99CC00",
                        borderRadius: 8
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
        let env = ""
        if (this.props?.parent?.enviroments) {
            env = this.props.parent.enviroments["tiempo_de_espera_confirmando_conductor"]?.value
        }

        let usuario = Model.usuario.Action.getByKey(data.key_usuario) ?? {};
        return (<SView col={"xs-12"} center style={{ overflow: "hidden", borderRadius: 8 }} backgroundColor={STheme.color.accent}>
            <SView col={"xs-12"} height={50} center>
                <SText fontSize={16} bold color={STheme.color.white}>Confirmar pedido</SText>
                <SHr height={8} />
                <SView col={"xs-11"}>
                    {/* <BarraTiempo pk={data.key} sdate={new SDate(data?.fecha_edit, "yyyy-MM-ddThh:mm:ss")} millis={env * 1000} /> */}
                </SView>
            </SView>
            <SView col={"xs-12"}
                style={{
                    overflow: "hidden",
                    alignItems: "center",
                    backgroundColor: STheme.color.white,
                }}
            >
                <SView col={"xs-11"} center style={{
                }}>
                    <SHr height={8} />
                    <SText bold col={"xs-12"}>Para: {usuario["Nombres"] ?? ""} {usuario["Apellidos"] ?? ""}</SText>
                    <SHr />
                    <Detalle data={this.props.data} interline={1} padding={3} />
                    {this.getDistancia()}
                </SView>
                <SHr />
                {this.renderButtoms()}
            </SView>
        </SView>
        );
    }
}
