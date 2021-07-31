import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native';
// import Svg from '../../Svg';
import RutaViaje from './RutaViaje';
import EstadoViaje from './EstadoViaje';
// import ConductorLlego from './ConductorLlego';
// import IniciarViaje from './IniciarViaje';
// import CancelarViaje from './CancelarViaje';
// import TerminarViaje from './TerminarViaje';
// import CobrarViaje from './CobrarViaje';
// import CanceloViajeCliente from './CanceloViajeCliente';
import AppParams from '../../Json/index.json'
import DetalleRuta from './DetalleRuta';
import BarraSuperior from '../../Component/BarraSuperior';

import * as SSBackgroundLocation from '../../SSBackgroundLocation';
import SThread from '../../SThread';
const delay = ms => new Promise(res => setTimeout(res, ms));

var mapa;
var lastSend = new Date().getTime();
const ViajeInicioPage = (props) => {

    const [modal, setModal] = React.useState(false);
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
    var isRun = SSBackgroundLocation.getInstance().isRun();
    if (!isRun) {
        SSBackgroundLocation.getInstance().start();
    }
    // console.log(props.navigation)

    const getViajeHilo = async () => {
        new SThread(30000, "hiloViaje", false).start(() => {
            if (!props.state.ViajeReducer.data) {
                return;
            }
            if (!props.state.ViajeReducer.data["key"]) {
                return;
            }
            SSBackgroundLocation.getInstance().sendServer();
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "viaje",
                type: "getViajeByKeyUsuario",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            getViajeHilo();
        })
    };
    getViajeHilo();

    if (!zoom) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1500);
            //zoomin(currentPos)
        };
        // yourFunction();
    }

    const fitCordinates = (pos) => {
        if (!mapa) return;
        if (!mapa.fitToCoordinates) return;
        mapa.fitToCoordinates(pos, {
            edgePadding: {
                top: 100,
                right: 300,
                left: 300,
                bottom: 600,
            }
        })
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

    if (!props.state.ViajeReducer.data) {
        props.navigation.replace("CargaPage");
        return <View />
    }
    if (props.state.ViajeReducer.data.estado == 0) {
        props.navigation.replace("CargaPage");
        return <View />
    }
    if (props.state.ViajeReducer.data.movimientos["finalizar_viaje"]) {
        props.navigation.replace("CargaPage");
        return <View />
    }
    return (
        <View style={{
            flex: 1,
            width: "100%",
        }}>
            <BarraSuperior title={"Viaje"} />
            <View style={{
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapView
                    showsUserLocation={true}
                    style={styles.map}
                    initialRegion={region}
                    ref={ref => { mapa = ref }}
                    provider={PROVIDER_GOOGLE}
                >
                    <RutaViaje
                        fitCordinates={(arrpos) => { fitCordinates(arrpos) }}
                        zoomin={(pos) => { zoomin(pos) }}
                    />
                </MapView>
                <EstadoViaje />
                <DetalleRuta navigation={props.navigation} />
            </View>
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
