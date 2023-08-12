
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SMapView, SMarker, SNavigation, SPage, SPolyline, SPopup, SText, STheme, SThread, SView } from 'servisofts-component';
import { Params } from '.';
import BottomBox from '../../Components/BottomBox';
import Buttom from '../../Components/Buttom';
import InputLocation from '../../Components/InputLocation';
import Ruta from '../../Components/Ruta';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import buscar_abstract from './buscar_abstract';

class index extends buscar_abstract {
    constructor(props) {
        super("transporte-moto", props);
    }

    getOption({ type, label , icon}) {
        return <SView width={130} height={50} row style={{
            borderRadius: 8,
            ...(type == this.state.key_tipo_viaje ? {
                borderWidth: 2,
                borderColor: STheme.color.primary
            } : {})

        }} center onPress={() => {
            this.setState({ key_tipo_viaje: type })
        }}>
            <SIcon name={icon} width={40} height={40} />
            <SText bold>{label}</SText>
        </SView>

    }
    getMenu() {
        return <BottomBox>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} height={120} center>
                <SHr />
                <SView col={"xs-11"} row height={50}>
                    {this.getOption({ type: "transporte-moto", label: "Moto" , icon:"Imoto"})}
                    <SView flex />
                    {this.getOption({ type: "transporte-torito", label: "Torito", icon: "Itorito" })}
                </SView>
                <SHr />
                <Buttom onPress={() => {
                    var p1 = this.state?.destinos[0];
                    var p2 = this.state?.destinos[1];
                    if (!p1.latitude || !p1.longitude) {
                        SPopup.alert("Deve seleccionar la direccion incio")
                        return;
                    }
                    if (!p2.latitude || !p2.longitude) {
                        SPopup.alert("Deve seleccionar la direccion destino")
                        return;
                    }
                    Model.viaje.Action.saveViaje(this.state);
                    SNavigation.navigate("/buscar/confirmar")

                }}>
                    {"Pedir ahora"}
                </Buttom>
            </SView>
        </BottomBox>
    }
    async centerMap() {
        if (!this.mapa) return;
        var destinos = this.state.destinos;
        if (!destinos[0]) return;
        if (!destinos[0].latitude || !destinos[0].longitude) return;
        if (!destinos[1] || (!destinos[1].latitude || !destinos[1].longitude)) {
            this.mapa.fitToCoordinates(this.state.destinos, { edgePadding: Params.edgePadding });
            return;
        }
        this.mapa.fitToCoordinates(this.state.destinos, { edgePadding: Params.edgePadding });
    }

    setDestino(key = 0, location) {
        var destinos = [...this.state.destinos]
        destinos[key] = { ...location };
        this.state.destinos = destinos;
        this.setState({ ...this.state })
        this.centerMap();

    }

    render() {
        return (
            <SPage title={'index'} hidden disableScroll center>
                <SView col={"xs-12"} center height>
                    <TopBar title={"Transporte"} >
                        <SHr />
                        <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={100}>
                            <InputLocation
                                icon={"Marker"}
                                placeholder={"¿Punto de Recogida?"}
                                value={this.state.destinos[0] ?? {}}
                                onChange={(evt) => { this.setDestino(0, evt) }} />
                            <SHr />
                            <InputLocation
                                icon={"pointer"}
                                placeholder={"Destino"}
                                value={this.state.destinos[1] ?? {}}
                                onChange={(evt) => { this.setDestino(1, evt) }} />
                        </SView>
                    </TopBar>
                    <SView col={"xs-12"} flex >
                        <SMapView
                            initialRegion={Params.region}
                            ref={ref => {
                                this.mapa = ref;
                                new SThread(200, "sta", true).start(() => { this.centerMap(); })
                            }}
                        >
                            {this.state.destinos.map(latlng => <SMapView.SMarker {...latlng} />)}
                            {/* {Ruta(this, { start: this.state.destinos[0], end: this.state.destinos[1] })} */}
                        </SMapView>
                        <SHr height={100} />
                    </SView>
                </SView>
                {this.getMenu()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);