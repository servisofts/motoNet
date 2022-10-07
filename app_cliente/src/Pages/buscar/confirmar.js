
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SMapView2, SMapView, SMarker, SNavigation, SPage, SPopup, SText, STheme, SView, SThread } from 'servisofts-component';
import { Params } from '.';
import BottomBox from '../../Components/BottomBox';
import Buttom from '../../Components/Buttom';
import InputLocation from '../../Components/InputLocation';
import Ruta from '../../Components/Ruta';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destinos: []
        };
        Model.viaje.Action.getViaje().then((resp) => {
            this.state = { ...this.state, ...(resp ?? {}) };
            this.centerMap();
            this.setState({ ...this.state })
        })
    }

    getTiposViaje() {
        var tipos = Model.tipo_viaje.Action.getAll();
        if (!tipos) return <SLoad />
        if (!this.state.key_tipo_viaje) return <SLoad />
        var tipo = Model.tipo_viaje.Action.getByKey(this.state.key_tipo_viaje)
        return <SText>{tipo.descripcion}</SText>
    }

    async pedirViaje() {
        if (!this.state.key_tipo_viaje) return;

        Model.viaje.Action.action("registro", "", this.state).then((resp) => {
            this.state = resp.data;
            Model.viaje.Action.saveViaje(this.state);
        }).catch((e) => {
            console.error(e)
        })
    }

    getMenu() {
        return <BottomBox>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} height={100} center>
                <SHr />
                <SView col={"xs-11"} row flex center>
                    <SView flex height>
                        <SText>{"Confirmar el viaje"}</SText>
                        <SHr />
                        <SText bold>{"17 min Aprox."}</SText>
                        <SHr height={4} />
                        <SText>{"5.0 Km Aprox."}</SText>
                        {this.getTiposViaje()}
                    </SView>
                    <SView width={130} height center>
                        <Buttom onPress={() => {
                            this.pedirViaje();
                        }}>
                            {"Confirmar"}
                        </Buttom>
                    </SView>
                </SView>
                <SHr />

            </SView>
        </BottomBox>
    }
    async centerMap() {
        new SThread(200, "sta", true).start(() => {
            if (!this.mapa) return;
            var destinos = this.state.destinos;
            if (!destinos[0]) return;
            if (!destinos[0].latitude || !destinos[0].longitude) return;
            if (!destinos[1] || (!destinos[1].latitude || !destinos[1].longitude)) {
                this.mapa.fitToCoordinates(this.state.destinos, { edgePadding: Params.edgePadding });
                return;
            }
            this.mapa.fitToCoordinates(this.state.destinos, { edgePadding: Params.edgePadding });
        })

    }
    render() {
        return (
            <SPage title={'index'} hidden disableScroll center>
                <SView height col={"xs-12"}>
                    <TopBar title={this.state.key_tipo_viaje} >
                        <SHr />
                        <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} >
                            {this.state.destinos.filter((o, i) => this.state.key_tipo_viaje != "pedido" || i > 0).map((o, i) => <>
                                <InputLocation
                                    icon={i == 0 ? "Marker" : "pointer"}
                                    value={o}
                                    disabled
                                />
                                <SHr />
                            </>
                            )}

                            <SHr />

                        </SView>
                    </TopBar>
                    <SView col={"xs-12"} flex >
                        <SMapView
                            initialRegion={Params.region}
                            ref={ref => {
                                this.mapa = ref;
                                this.centerMap();
                            }}>
                            {this.state.destinos.map(latlng => <SMapView.SMarker {...latlng} />)}
                            {Ruta(this, { start: this.state.destinos[0], end: this.state.destinos[1] })}
                        </SMapView>
                        <SHr height={100} />
                    </SView>
                    {this.getMenu()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);