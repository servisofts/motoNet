import React from 'react';
import { Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

const RutaViaje = (props) => {

    if (!props.state.viajesReducer.data.direccion_inicio || !props.state.viajesReducer.data.direccion_fin) {
        return <View />
    }

    if (!props.state.locationGoogleMapReducer.route) {
        if (props.state.locationGoogleMapReducer.estado != "cargando") {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "locationGoogle",
                type: "route",
                estado: "cargando",
                data: {
                    inicio: props.state.viajesReducer.data.direccion_inicio,
                    fin: props.state.viajesReducer.data.direccion_fin
                }
            }, true);
        }
        return <View />
    }


    const getRouteFormat = () => {
        var ruta = [];
        props.state.locationGoogleMapReducer.route.ruta.map((obj, key) => {
            ruta.push(obj.inicio);
            //ruta.push(obj.fin);
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
