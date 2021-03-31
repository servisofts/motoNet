import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Svg from '../../../Svg';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import Styles from '../../../Styles';
import AppParams from '../../../Json';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
const delay = ms => new Promise(res => setTimeout(res, ms));
var mapa = false;

const Mapa = (props) => {

    const [data, setdata] = React.useState({
        region: {
            latitude: -17.7799998333333332,
            longitude: -63.180598333333336,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
        },
        origen: false,
        ubicacionActual: false
    })
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);

    const getposition = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrentPos(position);
                props.dispatch({
                    component: "locationEmergencia",
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


    if (!zoom) {
        const yourFunction = async () => {
            await delay(500);
            getposition();
        };
        setZoom(true);
        yourFunction();
    }

    // var dato = props.state.locationEmergenciaReducer.region;
    // if (!data.ubicacionActual) {
    //     data.region = {
    //         latitude: dato.latitude,
    //         longitude: dato.longitude,
    //         latitudeDelta: 0.002,
    //         longitudeDelta: 0.002,
    //     };
    //     data.ubicacionActual = true;
    //     setdata({ ...data });
    // }

    return (
        <>
            <MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                ref={map => { mapa = map }}
                initialRegion={data.region}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onRegionChangeComplete={(region) => {
                    props.state.locationEmergenciaReducer.region = region;
                    props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                        component: "locationGoogle",
                        type: "geocode",
                        data: region,
                        estado: "cargando"
                    }, true);
                    return <View />
                }}
            >
                {/* {getMarkerOrigen()} */}
            </MapView>

            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 70,
                    right: 0,
                    padding: 8,
                    // backgroundColor: "#ccc"
                }}
                onPress={() => {
                    getposition();
                }}>
                <Svg name="Gps"
                    style={{
                        width: 40,
                        height: 40,
                        fill: "#2C4C7E"
                    }} />
            </TouchableOpacity>
        </>

    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);
