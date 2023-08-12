
import React, { Component } from 'react';
import { Linking, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux';
import SBLocation from 'servisofts-background-location';
import { SDate, SHr, SIcon, SInput, SList, SLoad, SMapView, SMapView2, SMarker, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import BarraCargando from '../Components/BarraCargando';
import Marker from '../Components/Marker';
import SwitchRastreo from '../Components/SwitchRastreo';
import TopBar from '../Components/TopBar';
import Model from '../Model';
import Validator from '../Validator';

class index extends Component {

    static TOPBAR = <TopBar type={"usuario"} />
    constructor(props) {
        super(props);
        this.state = {
            load: false
        };

        this.isRun = true;
    }

    componentDidMount() {
        if (!this.state.load) {
            new SThread(200, "load", true).start(() => {
                if(!this.isRun) return;
                this.setState({ load: true });
            })
        }

        this.isRun = true;
        // this.hilo();
    }
    componentWillUnmount() {
        this.state.load = false;
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        this.setState({ ...this.state })
        new SThread(60000, "hilo_del_usuario_root", true).start(() => {
            if (!this.isRun) return;
            Model.usuario.Action.syncUserLog()
            Validator.validate();
            this.hilo();
            // Model.pedido.Action.getDetalle(this.pk, true);
        })
    }

    getRetaurantes() {
        const restaurantes = Model.restaurante.Action.getAll();
        if (!restaurantes) return null;
        return Object.values(restaurantes).map((obj) => {
            if (!obj.delivery) return null;
            if (!obj.latitude || !obj.longitude) return null;
            return <Marker latitude={obj.latitude} longitude={obj.longitude} data={obj} />
        })
    }
    getZonas() {
        const zonas = Model.zona.Action.getAll();
        if (!zonas) return null;
        return Object.values(zonas).map((obj) => {
            return <SMapView.SCircle
                strokeColor={STheme.color.primary}
                // strokeOpacity={0.8}
                strokeWidth={2}
                fillColor={STheme.color.primary + "44"}
                // fillOpacity={0.3}
                center={{
                    latitude: obj.latitude,
                    longitude: obj.longitude
                }}
                radius={obj.radio}
                onPress={(event) => {
                    console.log("asdasd");
                    SNavigation.navigate("/zona/profile", { key: obj.key })
                }}
            />

        })
    }

    getHorariosActivos() {
        var data = Model.conductor_horario.Action.getActivosByUser();
        const zonas = Model.zona.Action.getAll();
        if (!zonas) return <SText>Cargando zonas...</SText>
        if (!data) return <SText>Cargando horarios...</SText>
        data = Object.values(data).filter(obj => {
            var date = new SDate(obj.fecha + " " + obj.hora_fin, "yyyy-MM-dd hh:mm");
            return !date.isBefore(new SDate())
        })
        if (data.length <= 0) {
            // return <SText>CARFANGO</SText>
            return null;
        }
        return <SView col={"xs-12"} height={60} center backgroundColor={STheme.color.barColor}>
            <SView col={"xs-12"} center height>
                <SScrollView2 horizontal >
                    <SList
                        data={data}
                        horizontal
                        initSpace={8}
                        order={[
                            { key: "fecha", order: "asc", peso: 5 },
                            { key: "hora_inicio", order: "asc", peso: 1 },
                        ]}
                        render={(obj) => {
                            var zona = zonas[obj.key_zona];
                            return <SView width={150} height={50} card style={{
                                backgroundColor: "#fff"
                            }} center>
                                {/* <SText color={STheme.color.secondary} fontSize={12}>{new SDate(obj.fecha, "yyyy-MM-dd").toString("dd de MONTH")}</SText> */}
                                {/* <SText color={STheme.color.secondary} fontSize={12}>{obj.hora_inicio} - {obj.hora_fin}</SText> */}
                                <SText bold color={STheme.color.primary} fontSize={12}>Zona {zona.nombre}</SText>
                                <SText color={STheme.color.primary} fontSize={12}>{new SDate(obj.fecha, "yyyy-MM-dd").toString("DAY")} {obj.hora_inicio} a {obj.hora_fin}</SText>
                                <SHr height={4} />
                                <BarraCargando />
                            </SView>
                        }}
                    />
                </SScrollView2>
            </SView>
        </SView>
    }

    getSwicth() {
        return <SwitchRastreo callback={(resp) => {
            if (!resp.active) {
                SBLocation.start({
                    nombre: "Title notification",
                    label: "Body notification",
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

    render_mensaje() {
        return <SView col={"xs-8 sm-6 md-4 lg-3 xl-2"} height={120} style={{
            backgroundColor: STheme.color.accent,
            position: "absolute",
            borderRadius: 16,
            bottom: 20,
            padding: 16
        }} center>
            <SIcon name={"cuadritos"} height={30} />
            <SHr />
            <SText center fontSize={12} color={STheme.color.white}>{"Seleccione una zona en el mapa para encontrar una hora de trabajo."}</SText>
        </SView>
    }
    render() {
        if (!this.state.load) return <SLoad />
        if (!Model.usuario.Action.getUsuarioLog()) {
            // SNavigation.replace("/login");
            return <SText>{"No hay usuario"}</SText>;
        }
        return (<SPage title={'index'} hidden disableScroll center
            onRefresh={() => {
                // Model.usuario.Action.CLEAR();
            }}
        >
            {this.getHorariosActivos()}
            <SView col={"xs-12"} flex>
                <SMapView initialRegion={{
                    latitude: -17.77999983,
                    longitude: -63.1805983,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                    <></>
                    {this.getRetaurantes()}
                    {this.getZonas()}
                </SMapView>
            </SView>
            {this.render_mensaje()}
        </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);