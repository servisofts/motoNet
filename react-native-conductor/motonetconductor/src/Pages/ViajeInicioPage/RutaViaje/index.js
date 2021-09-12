import React, { useEffect } from 'react';
import { Polyline, Marker, Circle } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Svg from '../../../Svg';
import SThread from '../../../SThread';
import * as SSBackgroundLocation from '../../../SSBackgroundLocation';

const delay = ms => new Promise(res => setTimeout(res, ms));
let lastSend = 0;
let lastEstado = "";
const RutaViaje = (props) => {

    // if (props.state.locationGoogleReducer.estado == "cargando") {
    //     return <View />
    // }
    useEffect(() => {
        lastSend = 0;
        lastEstado = "";
        getHilo();
    }, [])

    const functionHilos = () => {
        if (!props.state.ViajeReducer.data) {
            return;
        }
        if (props.state.ViajeReducer.data.estado == 0) {
            return;
        }
        // getHilo();
        var timeActual = new Date().getTime();

        var viaje = props.state.ViajeReducer.data;

        var movimientos = props.state.ViajeReducer.data.movimientos;
        var preventAwait = false
        if (movimientos["inicio_viaje_conductor"]) {
            if (lastEstado != "inicio_viaje_conductor") {
                preventAwait = true;
            }
        }
        if (timeActual - lastSend < 10000 && !preventAwait) {
            return;
        }
        SSBackgroundLocation.getInstance().location;
        let ubicacion = props.state.backgroundLocationReducer.data;
        if (!ubicacion) {
            return;
        }
        lastSend = timeActual;

        console.log(viaje.key);
        console.log(Object.keys(viaje.movimientos));
        if (movimientos["inicio_viaje_conductor"]) {
            lastEstado = "inicio_viaje_conductor";
            if (viaje["direccion_fin"]) {
                props.fitCordinates([viaje.direccion_fin, ubicacion])
            } else {
                // props.zoomin(viaje.direccion_inicio);
            }
            return;
        }
        if (movimientos["inicio_viaje"]) {
            lastEstado = "inicio_viaje";
            if (viaje["direccion_fin"]) {
                props.fitCordinates([viaje.direccion_inicio, ubicacion])
            } else {
                props.zoomin(viaje.direccion_inicio);
            }
            return;
        }
    }

    const getHilo = async () => {
        new SThread(2000, "hiloUbicacion", true).start(() => {
            functionHilos();
        });
    }
    getHilo();
    if (!props.state.ViajeReducer.data) {
        return <View />
    }
    if (props.state.ViajeReducer.data.estado == 0) {
        return <View />
    }

    var dato = props.state.ViajeReducer.data;

    const arco_a_partir_de_2_putos = ({ x1, y1, x2, y2 }) => {
        var xm = (x1 + x2) / 2;
        var ym = (y1 + y2) / 2;
        var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var r = d / 2;
        var x = xm + r * (y2 - y1) / d;
        var y = ym - r * (x2 - x1) / d;
        return {
            x,
            y,
            r
        }
    }
    const getPolilyne = () => {
        var myLocation = SSBackgroundLocation.getInstance().location;
        var inicio = dato.direccion_inicio;
        var fin = dato.direccion_fin;
        var locations = [];
        var movimientos = props.state.ViajeReducer.data.movimientos;
        locations.push(myLocation);
        var locTo = inicio;
        if (movimientos["inicio_viaje_conductor"]) {
            if(fin){
                locTo = fin;
            }
        }
        var circunferencia = arco_a_partir_de_2_putos({ x1: myLocation.latitude, y1: myLocation.longitude, x2: locTo.latitude, y2: locTo.longitude });

        locations.push(locTo);

        return <>
            <Polyline
                key={"asd"}
                coordinates={locations}
                strokeColor="#000"
                strokeWidth={2}
            />
        </>
    }
    var MARKERS = ["direccion_inicio", "direccion_fin"].map((index) => {
        var obj = dato[index];
        if (!obj) {
            return <View />
        }
        var json = { latitude: obj.latitude, longitude: obj.longitude };
        return (
            <Marker
                coordinate={json}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                title={(index) + ""}

            >
            </Marker>
        )
    })
    return <>
        {MARKERS}
        {getPolilyne()}
    </>

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RutaViaje);
