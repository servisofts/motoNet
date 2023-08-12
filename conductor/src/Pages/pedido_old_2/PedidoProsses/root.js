import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SDate, SHr, SList, SLocation, SMath, SText, STheme, SView } from 'servisofts-component';
import Item from './Item';
import SinPedidos from './SinPedidos';
import TopBar from '../../../Components/TopBar';
import Header from './Header';
import Model from '../../../Model';
import SBLocation from 'servisofts-background-location';

export default class root extends Component {



    filtros() {

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
    renderContent() {
        let arr = Object.values(this.data ?? {}).sort((a, b) => {
            if (b.state == "entregado_conductor") return -1
            if (a.state == "esperando_conductor") return 1
            if (b.state == "confirmando_conductor") return 1


            return -1;
        })

        arr = arr.filter(a => a.key_conductor == Model.usuario.Action.getKey())
        if (!arr || arr.length <= 0) {
            return <SinPedidos />
        }
        let cantidad = 0;
        let all_entregados = true;
        arr.map((a) => {
            // if (a.state == "confirmando_conductor") all_entregados = false;
            if (a.state == "esperando_conductor" || a.state == "confirmando_conductor") all_entregados = false;
            cantidad += a.cantidad;
            // if (a.state == "entregado_conductor") all_recogidos = false;
        })


        if (all_entregados) {
            // let myubic = Model.background_location.Action.getCurrentLocation();

            // if (myubic) {
            //     arr.map((a) => {
            //         a.distancia_to_driver = this.getDistance(myubic.latitude, myubic.longitude, a.direccion.latitude, a.direccion.longitude);
            //     })
            //     arr = arr.sort((a, b) => {
            //         return a.distancia_to_driver - b.distancia_to_driver
            //     })
            // } else {
            arr = arr.sort((a, b) => {
                return a.index - b.index
            })
            // }


            return <>
                <SView col={"xs-12"} height={30} backgroundColor={STheme.color.accent} center>
                    <SText color={STheme.color.secondary}>Pedidos por entregar {arr.length}</SText>
                </SView>
                <Item parent={this.props.parent} data={arr[0]} />
            </>
        }
        return <>
            <Header {...this.props} />
            <SText>{new SDate().toString("yyyy-MM-ddThh:mm:ss")}</SText>
            {/* <SList
                // limit={5}
                data={arr}
                space={8}
                render={(obj) => <SView key={obj.key} padding={8}>
                    <SText>{obj.key}</SText>
                </SView>}
            /> */}
            <SList
                // limit={5}
                data={arr}
                space={8}
                render={(obj) => <SView key={obj.key} padding={8}><Item parent={this.props.parent} data={obj} /></SView>}
            />
        </>
    }
    render() {
        this.data = this.props.parent.data;
        this.cantidad = Object.values(this.data ?? {}).length
        if (!this.cantidad) return <SinPedidos />
        // let restaurante = arr[0].restaurante;
        return (<SView col={"xs-12"} height backgroundColor={STheme.color.card}>
            <TopBar type={"usuario"} />
            {this.renderContent()}
        </SView>
        )
    }
}