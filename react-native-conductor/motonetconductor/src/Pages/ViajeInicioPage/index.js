import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native';
import Svg from '../../Svg';
import RutaViaje from './RutaViaje';
import EstadoViaje from './EstadoViaje';
import ConductorLlego from './ConductorLlego';
import IniciarViaje from './IniciarViaje';
import CancelarViaje from './CancelarViaje';
import TerminarViaje from './TerminarViaje';
import CobrarViaje from './CobrarViaje';
import CanceloViajeCliente from './CanceloViajeCliente';
import AppParams from '../../Json/index.json'

const delay = ms => new Promise(res => setTimeout(res, ms));

var mapa;
var lastSend = new Date().getTime();
const ViajeInicioPage = (props) => {

    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });
    if (props.state.ViajeReducer.data) {
        if (props.state.ViajeReducer.data.movimientos) {
            if (props.state.ViajeReducer.data.movimientos["termino_viaje_conductor"]) {
                props.navigation.replace("CargaPage");
                return <View />
            }
            if (props.state.ViajeReducer.data.movimientos["cancelo_viaje"]) {
                props.navigation.replace("CargaPage");
                return <View />
            }
        }

    }
    // console.log(props.navigation)
    const getViajeHilo = async () => {
        await delay(10000);
        var timeActual = new Date().getTime();
        if (timeActual - lastSend < 10000) {
            getViajeHilo();
            return;
        }
        lastSend = timeActual;
        console.log("HILO DEL VIAJE COMPLETADO");
        if (!props.state.ViajeReducer.data) {
            return;
        }
        if (!props.state.ViajeReducer.data["key"]) {
            return;
        }
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "viaje",
            type: "getViajeByKeyUsuario",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            estado: "cargando"
        }, true);
        getViajeHilo();
    };
    // getViajeHilo();

    if (!zoom) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1500);
            //zoomin(currentPos)
        };
        // yourFunction();
    }

    const fitCordinates = (pos) => {
        mapa.fitToCoordinates(pos, {
            edgePadding: {
                top: 400,
                right: 100,
                bottom: 400,
                left: 100,
            }
        })
    }
    const markerClick = (obj) => {
        console.log(obj);
        if (!zoom)
            zoomin(obj);
        else
            zoomout(obj);
    }


    const zoomin = (obj) => {
        // obj = currentPos;
        var pos = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
        mapa.animateToRegion(pos, 2000);
        setZoom(true);
        return <View />
    }

    const zoomout = (obj) => {
        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 17,
            longitudeDelta: 17
        }
        mapa.animateToRegion(obj, 3000);
        setZoom(false);
    }


    const Cancelar = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "cancelarViajeConductor",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: props.state.ViajeReducer.data.key,
            estado: "cargando"
        }, true);
        // AsyncStorage.removeItem("motonet_viaje");
        // props.state.ViajeReducer.data= false;
        // props.navigation.replace("CargaPage");    
        return <View />
    }

    const cancelarViaje = () => {
        if (!props.state.ViajeReducer.data) {
            return <View />
        }
        if (props.state.ViajeReducer.data.estado == 0) {
            return <View />
        }
        if (props.state.ViajeReducer.data.movimientos["inicio_ruta"]) {
            return <View />
        }
        if (props.state.ViajeReducer.data.movimientos["conductor_cobro_viaje"]) {
            return <View />
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    // this.Cancelar()
                    Alert.alert(
                        "Alerta",
                        "Al aceptar la cancelación, puede que tenga un costo",
                        [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "Aceptar",
                                onPress: () => Cancelar()
                            }
                        ],
                        { cancelable: false }
                    );
                }}
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#f00",
                    bottom: 30,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    CANCELAR VIAJE
                </Text>
            </TouchableOpacity>)
    }
    if (props.state.backgroundLocationReducer.open) {
        if (!props.state.backgroundLocationReducer.isOpen) {
            props.state.backgroundLocationReducer.open()
        }
    }

    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center"
        }}>
            <MapView
                showsUserLocation={true}
                style={styles.map}
                initialRegion={region}
                ref={map => { mapa = map }}
                provider={PROVIDER_GOOGLE}
            >
                <RutaViaje
                    fitCordinates={(arrpos) => { fitCordinates(arrpos) }}
                    zoomin={(pos) => { zoomin(pos) }}
                />
            </MapView>
            {/* <CancelarViaje navigation={props.navigation} /> */}
            <EstadoViaje />
            <IniciarViaje />
            <TerminarViaje navigation={props.navigation} />
            <CanceloViajeCliente navigation={props.navigation} />
            <CancelarViaje navigation={props.navigation} />
            <ConductorLlego />
            <CobrarViaje />
            {/* {cancelarViaje()} */}

        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: "100%",
    },
});

const initStates = (state) => {
    return { state }
};

ViajeInicioPage.navigationOptions = ({ /*navigation*/ }) => {
    return {
        headerShown: false
    }
}
export default connect(initStates)(ViajeInicioPage);
