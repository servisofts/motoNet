import React from 'react';
import { Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';

const RutaViaje = (props) => {
    const [Direcciones, setDirecciones] = React.useState({
        direccion1: {},
        direccion2: {}
    })

    if (!props.direccion1 || !props.direccion2) {
        return <View />
    }
    if (
        Direcciones.direccion1.latitude != props.direccion1.latitude
        || Direcciones.direccion1.longitude != props.direccion1.longitude
        || Direcciones.direccion2.latitude != props.direccion2.latitude
        || Direcciones.direccion2.longitude != props.direccion2.longitude
    ) {
        if (props.state.locationGoogleMapReducer.estado == "cargando") {
            return <View />
        }
        props.state.locationGoogleMapReducer.route = false;
        if (!props.state.locationGoogleMapReducer.route) {
            setDirecciones({
                direccion1: props.direccion1,
                direccion2: props.direccion2
            })
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "locationGoogle",
                type: "route",
                estado: "cargando",
                data: {
                    inicio: props.direccion1,
                    fin: props.direccion2
                }
            }, true);

            return <View />
        }
    }



    const getRouteFormat = () => {
        var ruta = [];
        if (!props.state.locationGoogleMapReducer.route.ruta) {
            return ruta;
        }
        
        props.setTiempoDuracion({
            duracion: props.state.locationGoogleMapReducer.route.duracion,
            distancia: props.state.locationGoogleMapReducer.route.distancia

        })
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
