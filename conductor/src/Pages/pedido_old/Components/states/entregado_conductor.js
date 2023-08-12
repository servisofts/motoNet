import React, { Component } from 'react';
import { Linking } from 'react-native';
import { SButtom, SHr, SIcon, SImage, SInput, SList, SMapView, SNavigation, SPage, SPopup, SText, STheme, SView, SLoad } from 'servisofts-component';
import Model from '../../../../Model';
import SSocket from 'servisofts-socket';
import BarraCargando from '../../../../Components/BarraCargando';
import PButtom from '../../../../Components/PButtom';
import BtnNavegar from '../../../../Components/BtnNavegar';
import Pedido from '../../../../Components/Pedido';
import TopBar from '../../../../Components/TopBar';
import Config from '../../../../Config';

export default class entregado_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    handleOnPress() {
        // Avisar llegada al cliente
        Model.pedido.Action.action("conductor_llego", this.props.data.key, {});
    }
    render() {
        var data = this.props.data;
        var userClient = Model.usuario.Action.getByKey(data.key_usuario);
        // if (!userClient) return <SLoad />
        return (<SPage preventBack disableScroll hidden header={<TopBar type={"usuario"} />} >
            <SView col={"xs-12"} center height>
                <SView col={"xs-12"} height={70} center backgroundColor='#96BE00'>
                    <SView col={"xs-11"} center>
                        <SText bold fontSize={17} color={STheme.color.white}>Dirígete al cliente para entregar el pedido</SText>
                        <SHr height={16} />
                        <BarraCargando />
                    </SView>
                </SView>
                <SMapView
                    initialRegion={{
                        latitude: data.direccion.latitude,
                        longitude: data.direccion.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                    onPress={(evt) => {
                        if (Config.debug) {
                            Model.background_location.Action.onChange({
                                ...evt.coordinate,
                                rotation: 1,
                            });
                        }

                    }}
                >
                    <></>
                    <SMapView.SMarker latitude={data.direccion.latitude} longitude={data.direccion.longitude} />
                </SMapView>
                <SView col={"xs-12"} center
                    style={{
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        overflow: "hidden",
                        backgroundColor: STheme.color.white,
                        top: -22
                    }}
                >
                    <Pedido.CantidadPedidos />
                    <SHr height={8} />
                    <SView col={"xs-11"} center row height={120}>
                        <SView width={85} height={85} style={{
                            padding: 4,
                            borderRadius: 8,
                            overflow: 'hidden',
                        }}>
                            <SImage src={SSocket.api.root + 'usuario/' + data.key_usuario} style={{
                                resizeMode: "cover", borderRadius: 8,
                                overflow: "hidden"
                            }} />
                        </SView>
                        <SView flex>
                            <SHr height={5} />
                            <SText bold fontSize={13}>{userClient?.Nombres} {userClient?.Apellidos}</SText>
                            <SHr height={1} />
                            <SText fontSize={12}>Dir.: {data?.direccion?.direccion}</SText>
                            <SText fontSize={12}>Ref.: {data?.direccion?.referencia}</SText>
                            <SHr height={3} />
                            <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }} height={50}>
                                <BtnNavegar latLng={{
                                    latitude: data.direccion.latitude,
                                    longitude: data.direccion.longitude,
                                }}><SView><SIcon name='IMapa' width={35} /></SView></BtnNavegar>
                                <SView width={25} />
                                <SView onPress={() => {
                                    let numero = userClient?.Telefono;
                                    Linking.openURL(`tel:${numero}`);
                                }}><SIcon name='ILlamar' width={30} /></SView>
                                <SView width={25} />
                                <Pedido.Chat data={data}><SView><SIcon name='IChat' width={30} /></SView></Pedido.Chat>
                            </SView>
                        </SView>
                    </SView>
                    <SHr height={8} />
                    <PButtom onPress={this.handleOnPress.bind(this)}>LLEGUÉ</PButtom>
                    <SHr height={4} />
                </SView>
            </SView>
        </SPage>
        );
    }
}
