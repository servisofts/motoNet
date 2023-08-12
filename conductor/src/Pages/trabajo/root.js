
import React, { Component } from 'react';
import { Linking, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux';
import SBLocation from 'servisofts-background-location';
import { SDate, SHr, SIcon, SImage, SList, SLoad, SMapView, SMapView2, SMarker, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import BarraCargando from '../../Components/BarraCargando';
import Marker from '../../Components/Marker';
import SwitchRastreo from '../../Components/SwitchRastreo';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import Config from '../../Config';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
        if (!this.state.load) {
            new SThread(200, "load", true).start(() => {
                this.setState({ load: true });
            })
        }
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.state.load = false;
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        this.handleThread();
        new SThread(10 * 1000, "hilo_pedido_prueba", true).start(() => {
            this.hilo();
        })
    }
    handleThread() {
        Model.pedido.Action.getActivos(true);
    }


    getZona(key_zona) {
        const zonas = Model.zona.Action.getByKey(key_zona);
        if (!zonas) return null;
        var obj = zonas;
        return <SMapView.SCircle
            strokeColor={STheme.color.primary + "FF"}
            // strokeOpacity={0.8}
            strokeWidth={3}
            fillColor={STheme.color.primary + "44"}
            // fillOpacity={0.3}
            center={{
                latitude: obj.latitude,
                longitude: obj.longitude
            }}
            radius={obj.radio}

        />

    }



    getSwicth() {
        return <SwitchRastreo
            height={38}
            callback={(resp) => {
                if (!resp.active) {
                    SBLocation.start({
                        nombre: "Tapeke Driver",
                        label: "Utilizando tu ubicacion.",
                        minTime: 1000,
                        minDistance: 1
                    }).then(e => {

                    }).catch(e => {
                        if (e.error == "permision") {
                            Linking.openSettings();
                        }
                    })
                } else {
                    SBLocation.stop();
                }
            }} />
    }
    getLocation() {
        var location = Model.background_location.Action.getCurrentLocation();
        if (!location) return null;
        return <SMapView.SMarker latitude={location.latitude} longitude={location.longitude} />
    }
    getRestaurantes(restaurantes) {
        let size = 50;
        return Object.values(restaurantes).map((obj) => {
            if (!obj.latitude || !obj.longitude) return null;
            return <SMapView.SMarker latitude={obj.latitude} longitude={obj.longitude} width={size}>
                <SView center>
                    <SIcon name={"MarcadorMapa"} width={size} height={size} />
                    <SView style={{
                        position: 'absolute',
                        top: size * 0.03,
                        width: size * 0.56,
                        height: size * 0.56,
                        backgroundColor: "#ffffff66",
                        borderRadius: size,
                        overflow: 'hidden',
                    }} center>
                        <SImage src={Model.restaurante._get_image_download_path(SSocket.api, obj.key)} style={{
                            position: 'absolute',
                            resizeMode: 'cover',
                            width: size * 0.56,
                            height: size * 0.56,
                        }} />
                    </SView>
                </SView>
            </SMapView.SMarker>
        })
    }

    render_mensaje() {
        return <SView col={"xs-8 sm-6 md-4 lg-3 xl-2"} height={120} style={{
            backgroundColor: STheme.color.accent,
            position: "absolute",
            borderRadius: 16,
            bottom: 20,
            padding: 16
        }} center>
            <SIcon name={"FlechaDir"} height={30} />
            <SHr />
            <SText center fontSize={12} color={STheme.color.white}>{"Trabajo en curso dirígete a la zona asignada y actívate para recibir envíos."}</SText>
            <SHr />
            <BarraCargando />
        </SView>
    }
    render() {
        if (!this.state.load) return <SLoad />
        // return <SText>Aqui esta el error</SText>
        var trabajo = Model.conductor_horario.Action.getEnCurso();

        if (!trabajo) return <SLoad />;
        if (!trabajo.key) {
            // SNavigation.reset("/")
            return <SLoad />;
        }
        let restaurantes = Model.restaurante.Action.getAll();
        const zona = Model.zona.Action.getByKey(trabajo.key_zona);
        if (!zona) return <SLoad />;
        if (!restaurantes) return <SLoad />;
        // return <SView>
        //     <SText>{"Hola"}</SText>
        // </SView>
        return (<SPage title={'index'} hidden disableScroll center onRefresh={() => {
            Model.conductor_horario.Action.CLEAR();
        }}>
            <TopBar type={"usuario"} />
            <SView col={"xs-12"} height={60} center backgroundColor={STheme.color.barColor}>
                <SView col={"xs-12"} center row>
                    <SView flex center>
                        <SText color={STheme.color.secondary} bold fontSize={16}>{trabajo.hora_inicio}</SText>
                        <SText color={STheme.color.secondary} fontSize={10}>{"Desde"}</SText>
                    </SView>
                    {this.getSwicth()}
                    <SView flex center>
                        <SText color={STheme.color.secondary} bold fontSize={16}>{trabajo.hora_fin}</SText>
                        <SText color={STheme.color.secondary} fontSize={10}>{"Hasta"}</SText>
                    </SView>
                </SView>
            </SView>
            <SView col={"xs-12"} flex>
                <SMapView initialRegion={{
                    latitude: zona.latitude,
                    longitude: zona.longitude,
                    latitudeDelta: (zona.radio * 2) * 0.000009,
                    longitudeDelta: (zona.radio * 2) * 0.000009,
                }}
                    showsUserLocation={true}
                    onPress={(evt) => {
                        console.log("Envio ubic", evt)
                        if (Config.debug) {
                            Model.background_location.Action.onChange({
                                ...evt.coordinate,
                                rotation: 1,
                            }, "onChange");
                        }
                    }}
                >
                    <></>
                    {this.getZona(trabajo.key_zona)}
                    {this.getLocation()}
                    {this.getRestaurantes(restaurantes)}
                </SMapView>
            </SView>
            {this.render_mensaje()}
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);