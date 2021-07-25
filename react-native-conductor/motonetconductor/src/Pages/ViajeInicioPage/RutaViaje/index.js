import React, { useEffect } from 'react';
import { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Svg from '../../../Svg';
import SThread from '../../../SThread';
const delay = ms => new Promise(res => setTimeout(res, ms));
let lastSend = 0;
const RutaViaje = (props) => {

    // if (props.state.locationGoogleReducer.estado == "cargando") {
    //     return <View />
    // }
    useEffect(() => {
        lastSend = 0;
        getHilo();
    }, [])


    const getHilo = async () => {
        new SThread(2000, "hiloUbicacion", false).start(() => {
            getHilo();
            var timeActual = new Date().getTime();
            if (timeActual - lastSend < 15000) {
                return;
            }
            let ubicacion = props.state.backgroundLocationReducer.data;
            if (!ubicacion) {
                return;
            }
            lastSend = timeActual;
            var movimientos = props.state.ViajeReducer.data.movimientos;
            var viaje = props.state.ViajeReducer.data;
            if (movimientos["inicio_viaje_conductor"]) {
                // if (viaje["direccion_fin"]) {
                //     props.fitCordinates([viaje.direccion_fin, ubicacion])
                // } else {
                //     props.zoomin(ubicacion);
                // }
                // return;
            }
            if (movimientos["inicio_viaje"]) {
                // if (viaje["direccion_fin"]) {
                props.fitCordinates([viaje.direccion_inicio, ubicacion])
                // } else {
                // props.zoomin(viaje.direccion_inicio);
                // }
                return;
            }
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
    return ["direccion_inicio", "direccion_fin"].map((index) => {
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

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RutaViaje);
