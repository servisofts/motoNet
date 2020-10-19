import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

var mapa;
const Mapa = (props) => {
    const [data, setdata] = React.useState({
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })

    const positionActual = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                if (!data.region) {
                    return <View />
                }
                if (data.region.isRender) {
                    return <View />
                }
                data.region = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    isRender: true,
                }
                mapa.animateToRegion(data.region, 3000);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                throw error;
            },
            {
                showLocationDialog: true,
                forceRequestLocation: true,
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000
            }
        );
        return <View />
    }

    const getMarkerOrigen = () => {
        if (!props.state.locationGoogleMapReducer.markerUbicacion) {
            return <View />
        }
        var locoation = {
            latitude: props.state.locationGoogleMapReducer.markerUbicacion.latitude,
            longitude: props.state.locationGoogleMapReducer.markerUbicacion.longitude
        };
        return (
            <Marker
                coordinate={locoation}
            >
                <Svg name="Logo"
                    style={{
                        width: 25,
                        height: 25,
                    }} />
            </Marker>
        )
    }

    const getMarkerFin = () => {
        if (!props.state.locationGoogleMapReducer.markerUbicacionFin) {
            return <View />
        }
        var locoation = {
            latitude: props.state.locationGoogleMapReducer.markerUbicacionFin.latitude,
            longitude: props.state.locationGoogleMapReducer.markerUbicacionFin.longitude
        };
        return (
            <Marker
                coordinate={locoation}
            >
                <Svg name="Logo"
                    style={{
                        width: 25,
                        height: 25,
                    }} />
            </Marker>
        )
    }

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        positionActual();
    });


    return (

        < MapView
            style={{
                flex: 1,
                width: '100%',
                height: "100%",
            }}
            ref={map => { mapa = map }}
            showsUserLocation={true}
            initialRegion={data.region}
            showsUserLocation={true}
            showsCompass={true}
            followsUserLocation={true}
            onRegionChangeComplete={(region) => {
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "locationGoogle",
                    type: "geocode",
                    data: region,
                    estado: "cargando"
                }, true);
                return <View />
            }}
        >
            {/* {getMarkerOrigen()}
            {getMarkerFin()} */}

            <TouchableOpacity
                style={{
                    backgroundColor: "#000",
                    position: "absolute",
                    bottom: 200,
                    right: 10
                }}
                onPress={() => {
                    data.region = { isReder: false };
                    setdata({ ...data })
                    return <View />
                }}
            >
                <Svg name="eliminar"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#000000"
                    }} />
            </TouchableOpacity>

        </MapView >
    )
}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);
