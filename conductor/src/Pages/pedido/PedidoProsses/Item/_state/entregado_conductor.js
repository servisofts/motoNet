import React, { Component } from 'react';
import { Linking } from 'react-native';
import { SButtom, SHr, SIcon, SImage, SInput, SList, SMapView, SNavigation, SPage, SPopup, SText, STheme, SView, SLoad } from 'servisofts-component';
import Model from '../../../../../Model';
import SSocket from 'servisofts-socket';
import BarraCargando from '../../../../../Components/BarraCargando';
import PButtom from '../../../../../Components/PButtom';
import BtnNavegar from '../../../../../Components/BtnNavegar';
import Pedido from '../../../../../Components/Pedido';
import TopBar from '../../../../../Components/TopBar';
import Detalle from '../Detalle';
import Config from '../../../../../Config';

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
        this.setState({ loading: true })
        Model.pedido.Action.action("conductor_llego", this.props.data.key, {}).then((e) => {
            this.setState({ loading: false })
            this.props.parent.repaint();
        }).catch(e => {
            this.setState({ loading: false })
        })
    }

    reduceText(val, limit) {
        return (val ?? "").substring(0, limit) + "" + ((val ?? "").length > limit ? "..." : "")
    }
    render() {
        var data = this.props.data;

        let all_entregados = true;
        Object.values(this.props.parent.data).map((a) => {
            if (a.state == "esperando_conductor" || a.state == "confirmando_conductor") all_entregados = false;
        })

        if (!all_entregados) {
            return <SView col={"xs-12"} center style={{ overflow: "hidden", borderRadius: 8 }} backgroundColor={STheme.color.background}>
                <SView col={"xs-12"} height={50} center backgroundColor={STheme.color.accent} >
                    <SView col={"xs-11"} center>
                        <SText bold fontSize={16} center color={STheme.color.white}>Pedido recibido.</SText>
                        {/* <SHr height={16} /> */}
                        {/* <BarraCargando /> */}
                    </SView>
                </SView>
                <SHr />
                <SView col={"xs-11"}>
                    <Detalle data={this.props.data} interline={1} padding={3} />
                </SView>
                <SHr />
            </SView>
        }

        var userClient = Model.usuario.Action.getByKey(data.key_usuario);
        // if (!userClient) return <SLoad />
        return (<SView col={"xs-12"} center flex>
            <SView col={"xs-12"} height={70} center backgroundColor={STheme.color.accent}>
                <SView col={"xs-11"} center>
                    <SText bold fontSize={17} center color={STheme.color.white}>Dirígete al cliente para entregar el pedido</SText>
                    <SHr height={16} />
                    <BarraCargando />
                </SView>
            </SView>
            <SView col={"xs-12"} flex>
                <SMapView
                    initialRegion={{
                        latitude: data?.direccion?.latitude,
                        longitude: data?.direccion?.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onPress={(evt) => {
                        if (Config.debug) {
                            Model.background_location.Action.onChange({
                                ...evt.coordinate,
                                rotation: 1,
                            }, "onChange");
                        }
                    }}
                >
                    <></>
                    <SMapView.SMarker latitude={data?.direccion?.latitude} longitude={data?.direccion?.longitude} />
                </SMapView>
            </SView>
            <SView col={"xs-12"}
                height={300}
                center
                style={{
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    overflow: "hidden",
                    backgroundColor: STheme.color.white,
                }}>
                <SHr height={8} />
                <SView col={"xs-11"} row height={150}>
                    <SView width={85} height={85} style={{
                        padding: 4,
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        <SView col={"xs-12"} height card>
                            <SImage src={SSocket.api.root + 'usuario/' + data.key_usuario} style={{
                                resizeMode: "cover", borderRadius: 8,
                                overflow: "hidden"
                            }} />
                        </SView>
                    </SView>
                    <SView flex height>
                        <SHr height={5} />
                        {!userClient ? <SLoad /> : <SText bold fontSize={13}>{userClient?.Nombres} {userClient?.Apellidos}</SText>}
                        <SHr height={1} />
                        <SText fontSize={12}>Dir.: {this.reduceText(data?.direccion?.direccion, 80)}</SText>
                        <SText fontSize={12}>Ref.: {this.reduceText(data?.direccion?.referencia, 60)}</SText>
                        <SHr height={8} />
                        <SView col={"xs-12"} row style={{ justifyContent: "flex-end" }} height={50}>
                            <BtnNavegar latLng={{
                                latitude: data?.direccion?.latitude,
                                longitude: data?.direccion?.longitude,
                            }}><SView><SIcon name='IMapa' width={35} /></SView></BtnNavegar>
                            <SView width={25} />
                            <SView onPress={() => {
                                let numero = userClient?.Telefono;
                                // let numero = ""
                                if (!numero || numero == "undefined") {
                                    SPopup.alert("No se encontro el numero de telefono.");
                                    Model.usuario.Action.getByKey(data.key_usuario);
                                    Model.usuario.Action._getReducer().data = null
                                    return;
                                }

                                Linking.openURL(`tel:${numero}`);
                            }}><SIcon name='ILlamar' width={30} /></SView>
                            <SView width={25} />
                            <Pedido.Chat data={data}><SView><SIcon name='IChat' width={30} /></SView></Pedido.Chat>
                        </SView>
                    </SView>
                </SView>
                <SHr height={8} />
                <PButtom loading={this.state.loading} onPress={this.handleOnPress.bind(this)}>LLEGUÉ</PButtom>
                <SHr height={4} />
            </SView>
        </SView>
        );
    }
}
