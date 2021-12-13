import React from 'react';
import { Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import HttpConection from '../../../../HttpConection';

const RutaViaje = (props) => {

    if (!props.state.viajesReducer.ubicacion["inicio"].data || !props.state.viajesReducer.ubicacion["fin"].data) {
        return <View />
    }

    console.log(props.state.viajesReducer.ubicacion["inicio"].data)
    console.log(props.state.viajesReducer.ubicacion["fin"].data)
    
    if (!props.state.locationGoogleMapReducer.route) {
        console.log("entro")
        if (props.state.locationGoogleMapReducer.estado != "cargando") {
            HttpConection.sendJson({
                component: "locationGoogle",
                type: "route",
                estado: "cargando",
                data: {
                    inicio: props.state.viajesReducer.ubicacion["inicio"].data,
                    fin: props.state.viajesReducer.ubicacion["fin"].data
                }
            });
        }
        return <View />
    }

    const getRouteFormat = () => {
        var ruta = [];
        if (!props.state.locationGoogleMapReducer.route.ruta) {
            return ruta;
        }
        props.state.locationGoogleMapReducer.route.ruta.map((obj, key) => {
            ruta.push(obj.inicio);
        })
        return ruta;
    }
    return (
        <Polyline
            coordinates={getRouteFormat()}
            strokeColor={"#f00"}
            strokeWidth={3}
        />
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RutaViaje);
