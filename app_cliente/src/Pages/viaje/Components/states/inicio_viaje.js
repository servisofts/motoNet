import React, { Component } from 'react';
import { SButtom, SHr, SMapView2, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../../Model';
import BottomBox from '../../../../Components/BottomBox';
import Buttom from '../../../../Components/Buttom';
import Container from '../../../../Components/Container';


export default class inicio_viaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    showMapa() {
        return <SView col={"xs-12"} height center >
            <SMapView2 initialRegion={
                {
                    // latitude: (this.props.data?.restaurante?.latitude + this.props.data?.direccion?.latitude) / 2,
                    // longitude: (this.props.data?.restaurante?.longitude + this.props.data?.direccion?.longitude) / 2,
                    latitude: -17.778419187503097,
                    longitude: -63.17582805962242,
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }} preventCenter>
                {/* <Restaurante.Marker data={this.props.data?.restaurante} lat={this.props.data?.restaurante?.latitude??0} lng={this.props.data?.restaurante?.longitude??0} height={5-} />
            <SMarker lat={this.props.data?.direccion?.latitude??0} lng={this.props.data?.direccion?.longitude??0} >
                <SIcon name={"Marker"} width={50} height={50} fill={"#FA790E"} />
            </SMarker>
            <SMarker lat={this.state.region.latitude??0} lng={this.state.region.longitude??0} >
                <SIcon name={"Bicicleta"} width={50} height={50} stroke={STheme.color.accent} />
            </SMarker> */}
            </SMapView2>

            <SView height={50} />
        </SView>
    }
    getCondutor = () => {
        // var movimiento = this.props.viaje.movimientos[0];
        // var negociacion = movimiento.data
        var viaje = Model.viaje.Action.getActivo()
        if (!viaje) return <SLoad />

        console.log(viaje)
        console.log("uuuuu")
        // var data = {}
        var data = Model.usuario.Action.getByKey(viaje.key_conductor);
        if (!data) return <SLoad />
        return (
            <SView style={{
                alignItems: "center"
            }}>
                <SView style={{
                    backgroundColor: "#ccc",
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                </SView>
                <SText>
                    {data["Nombres"]} {data["Apellidos"]}
                </SText>
                <SText>
                    {data["Correo"]}
                </SText>
               

            </SView>
        )
    }

    render() {
        return (
            <>
                <SPage title={"Transporte"} disableScroll>
                    <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}>


                        {this.showMapa()}

                        {/* <SHr />
                         <SText fontSize={16}>{'Inicio el viaje'}</SText>
                        <SButtom type='danger' onPress={() => {

                            Model.viaje.Action.action("cancelar", this.props.viaje.key).then((resp) => {
                                Model.viaje.Action.CLEAR();
                            })

                        }}>Salir</SButtom> */}
                    </SView>


                </SPage>
                <BottomBox>
                    <Container  >
                        <SHr height={20} />
                        <SView col={"xs-12"}>
                            <SText fontSize={14} color={STheme.color.gray}>Estado:</SText>
                            <SText fontSize={18} bold>Conductor viene</SText>
                        </SView>
                        <SHr height={7} />
                        <SHr height={0.5} color={STheme.color.gray} />
                        <SHr height={10} />
                        {this.getCondutor()}
                        <SHr height={40} />

                    </Container>
                </BottomBox>
            </>

        );
    }
}
