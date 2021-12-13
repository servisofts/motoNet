import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import RutaViaje from './RutaViaje';
import HttpConection from '../../../HttpConection';

const delay = ms => new Promise(res => setTimeout(res, ms));
var mapa;
const Mapa = (props) => {

    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);

    const [data, setdata] = React.useState({
        region: {
            latitude: -17.78629,
            longitude: -63.18117,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })


    const getposition = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrentPos(position);
                props.dispatch({
                    component: "locationGoogle",
                    type: "Miubicacion",
                    data: position,
                })
                mapa.animateToRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }, 1000)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }
        );
        if (!currentPos) {
            return <View />
        }
        mapa.animateToRegion({
            latitude: currentPos.coords.latitude,
            longitude: currentPos.coords.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        }, 1000)
        return <View />
    }

    // useEffect(() => {
    //     // Actualiza el título del documento usando la API del navegador
    //     // positionActual();
    // });

    // const positionGetLista = () => {
    //     let region = {
    //         latitude: -17.78439,
    //         longitude: -63.14317,
    //         latitudeDelta: 0.08,
    //         longitudeDelta: 0.08,
    //     }
    //     mapa.animateToRegion(region, 1500);
    // }

    if (!zoom) {
        const yourFunction = async () => {
            await delay(500);
            getposition();
        };
        setZoom(true);
        yourFunction();
    }

    const OnRegionChangeComplete = (region) => {
        // console.log("PIDIOP GEOCODE DEL MAPA EN MOVOIMIENTO")
        HttpConection.sendJson({
            component: "locationGoogle",
            type: "geocode",
            data: region,
            estado: "cargando"
        });
        return <View />
    }

    return (
        <View style={{
            width: "100%",
            height: "100%",
            // paddingBottom: 100
        }}>
            <MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                ref={map => {
                    mapa = map;
                    props.state.locationGoogleReducer.mapa_instance = map;
                }}
                initialRegion={data.region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                // initialRegion={props.state.locationGoogleReducer.region}
                onRegionChangeComplete={OnRegionChangeComplete}>
                <RutaViaje ventanaSelect={props.ventanaSelect} setVentanaSelect={props.setVentanaSelect} />
            </MapView>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 200,
                    right: 10
                }}
                onPress={() => {
                    // data.region = { isReder: false };
                    // setdata({ ...data })
                    getposition()
                    return <View />
                }}>
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
