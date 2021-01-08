import React from 'react';
import { Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

const RutaViaje = (props) => {

    if (props.state.locationGoogleReducer.estado == "cargando") {
        return <View />
    }

    // if (!props.state.locationGoogleReducer.route) {
    //     props.state.socketClienteReducer.sessiones["motonet"].send({
    //         component: "locationGoogle",
    //         type: "route",
    //         estado: "cargando",
    //         data: {
    //             inicio: {
    //                 latitude: props.state.ViajeReducer.data.destinos[1].latitude,
    //                 longitude: props.state.ViajeReducer.data.destinos[1].longitude,
    //             },
    //             fin: {
    //                 latitude: props.state.ViajeReducer.data.destinos[0].latitude,
    //                 longitude: props.state.ViajeReducer.data.destinos[0].longitude,
    //             }
    //         }
    //     }, true);
    //     return <View />
    // }
    // const getRouteFormat = () => {
    //     var ruta = [];
    //     props.state.locationGoogleReducer.route.ruta.map((obj, key) => {
    //         ruta.push(obj.inicio);
    //         //ruta.push(obj.fin);
    //     })

    //     return ruta;
    // }
    return (
        // <Polyline
        //     coordinates={getRouteFormat()}
        //     strokeColor={"#fff"}
        //     strokeWidth={3}
        // />
        <View></View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RutaViaje);
