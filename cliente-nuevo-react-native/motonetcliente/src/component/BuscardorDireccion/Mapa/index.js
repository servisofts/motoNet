import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import RutaViaje from './RutaViaje';

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
                mapa.animateToRegion(data.region, 1500);
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

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        positionActual();
    });

    const OnRegionChangeComplete = (region) => {


        console.log("PIDIOP GEOCODE DEL MAPA EN MOVOIMIENTPO SAFKJSAIFJASFJOASJFOASJFOASJFAS")

        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "locationGoogle",
            type: "geocode",
            data: region,
            estado: "cargando"
        }, true);
        return <View />
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            < MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                ref={map => { mapa = map }}
                showsUserLocation={true}
                initialRegion={data.region}
                onRegionChangeComplete={OnRegionChangeComplete}>
                {/* {getMarkerOrigen()}
            {getMarkerFin()} */}
                <RutaViaje ventanaSelect={props.ventanaSelect} setVentanaSelect={props.setVentanaSelect} />

            </MapView >
            <TouchableOpacity
                style={{
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
                <Svg name="Gps"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#f00"
                    }} />
            </TouchableOpacity>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Mapa);
